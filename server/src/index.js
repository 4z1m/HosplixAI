import express from 'express'
import cookieParser from 'cookie-parser'
import { initDb } from './db.js'
import authRoutes from './auth.js'
import chatRoutes from './chat.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api', chatRoutes)

const port = process.env.PORT || 8000
initDb()
  .then(() => {
    app.listen(port, '0.0.0.0', () => console.log(`API listening on :${port}`))
  })
  .catch((err) => {
    console.error('Failed to initialize database', err)
    process.exit(1)
  })
