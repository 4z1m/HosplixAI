import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import { pool } from './db.js'

const router = Router()
const COOKIE = 'hosp_session'
const SESSION_DAYS = 30

async function createSession(res, userId) {
  const token = crypto.randomBytes(32).toString('hex')
  await pool.query(
    `INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, now() + interval '${SESSION_DAYS} days')`,
    [token, userId],
  )
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  })
}

function publicUser(row) {
  return { id: row.id, email: row.email }
}

export async function requireAuth(req, res, next) {
  const token = req.cookies[COOKIE]
  if (!token) return res.status(401).json({ error: 'Not signed in' })
  const { rows } = await pool.query(
    `SELECT u.id, u.email FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token = $1 AND s.expires_at > now()`,
    [token],
  )
  if (!rows[0]) return res.status(401).json({ error: 'Session expired' })
  req.user = rows[0]
  next()
}

router.post('/register', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Please enter a valid email address' })
  if (!password || password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters' })

  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
  if (existing.rows[0])
    return res.status(409).json({ error: 'An account with this email already exists' })

  const hash = await bcrypt.hash(password, 10)
  const { rows } = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email.toLowerCase(), hash],
  )
  await createSession(res, rows[0].id)
  res.json({ user: publicUser(rows[0]) })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    (email || '').toLowerCase(),
  ])
  const user = rows[0]
  if (!user || !(await bcrypt.compare(password || '', user.password_hash)))
    return res.status(401).json({ error: 'Incorrect email or password' })

  await createSession(res, user.id)
  res.json({ user: publicUser(user) })
})

router.post('/logout', async (req, res) => {
  const token = req.cookies[COOKIE]
  if (token) await pool.query('DELETE FROM sessions WHERE token = $1', [token])
  res.clearCookie(COOKIE)
  res.json({ ok: true })
})

router.get('/me', async (req, res) => {
  const token = req.cookies[COOKIE]
  if (!token) return res.json({ user: null })
  const { rows } = await pool.query(
    `SELECT u.id, u.email FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token = $1 AND s.expires_at > now()`,
    [token],
  )
  res.json({ user: rows[0] ? publicUser(rows[0]) : null })
})

export default router
