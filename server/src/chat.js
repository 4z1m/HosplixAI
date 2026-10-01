import { Router } from 'express'
import { pool } from './db.js'
import { requireAuth } from './auth.js'
import { chatReply } from './llm.js'

const router = Router()
router.use(requireAuth)

function ownConversation(req, id) {
  return pool.query('SELECT * FROM conversations WHERE id = $1 AND user_id = $2', [
    id,
    req.user.id,
  ])
}

router.get('/conversations', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, title, created_at FROM conversations WHERE user_id = $1 ORDER BY id DESC',
    [req.user.id],
  )
  res.json({ conversations: rows })
})

router.post('/conversations', async (req, res) => {
  const { rows } = await pool.query(
    "INSERT INTO conversations (user_id) VALUES ($1) RETURNING id, title, created_at",
    [req.user.id],
  )
  res.json({ conversation: rows[0] })
})

router.get('/conversations/:id/messages', async (req, res) => {
  const convo = await ownConversation(req, req.params.id)
  if (!convo.rows[0]) return res.status(404).json({ error: 'Conversation not found' })
  const { rows } = await pool.query(
    'SELECT id, role, content, created_at FROM messages WHERE conversation_id = $1 ORDER BY id ASC',
    [req.params.id],
  )
  res.json({ messages: rows })
})

router.post('/conversations/:id/messages', async (req, res) => {
  const convo = await ownConversation(req, req.params.id)
  if (!convo.rows[0]) return res.status(404).json({ error: 'Conversation not found' })
  const content = (req.body?.content || '').trim()
  if (!content) return res.status(400).json({ error: 'Message is empty' })

  // Auto-title the conversation from its first user message.
  let title = convo.rows[0].title
  if (title === 'New conversation') {
    title = content.length > 60 ? content.slice(0, 57) + '…' : content
    await pool.query('UPDATE conversations SET title = $1 WHERE id = $2', [title, convo.rows[0].id])
  }

  const userMsg = (
    await pool.query(
      "INSERT INTO messages (conversation_id, role, content) VALUES ($1, 'user', $2) RETURNING id, role, content, created_at",
      [convo.rows[0].id, content],
    )
  ).rows[0]

  const history = (
    await pool.query(
      'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY id DESC LIMIT 20',
      [convo.rows[0].id],
    )
  ).rows.reverse()

  let reply
  try {
    reply = await chatReply(history)
  } catch (e) {
    res.status(e.status || 500).json({ error: e.message || 'AI reply failed' })
    return
  }

  const assistantMsg = (
    await pool.query(
      "INSERT INTO messages (conversation_id, role, content) VALUES ($1, 'assistant', $2) RETURNING id, role, content, created_at",
      [convo.rows[0].id, reply],
    )
  ).rows[0]

  res.json({ userMessage: userMsg, assistantMessage: assistantMsg, title })
})

export default router
