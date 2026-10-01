import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock } from 'lucide-react'
import { useAuth } from '../lib/auth'
import AuthLayout, { Divider, GoogleButton, Field, Alert } from '../components/AuthLayout'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/chat" replace />

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate('/chat')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-teal-600 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <GoogleButton onClick={() => setNotice("Google sign-in isn't configured yet — use your email for now.")} />
      <Divider />
      <form onSubmit={onSubmit}>
        <Field
          label="Email"
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          icon={Lock}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
          right={
            <Link to="/forgot-password" className="text-xs font-medium text-teal-600 hover:underline">
              Forgot password?
            </Link>
          }
        />
        {error && <Alert tone="error">{error}</Alert>}
        {notice && <Alert tone="info">{notice}</Alert>}
        <button
          type="submit"
          disabled={busy}
          className="h-12 w-full rounded-xl bg-teal-600 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  )
}
