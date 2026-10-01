import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound, Mail } from 'lucide-react'
import AuthLayout, { Field, Alert } from '../components/AuthLayout'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    // Reset emails aren't wired to a mail provider yet — show a generic confirmation.
    setTimeout(() => {
      setSent(true)
      setBusy(false)
    }, 400)
  }

  return (
    <AuthLayout
      icon={KeyRound}
      title="Reset your password"
      subtitle="We'll email you a reset link"
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-teal-600 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {sent ? (
        <>
          <Alert tone="info">
            If an account exists for {email}, a password reset link has been sent.
          </Alert>
          <Link
            to="/login"
            className="flex h-12 w-full items-center justify-center rounded-xl bg-teal-600 font-semibold text-white transition hover:bg-teal-700"
          >
            Back to login
          </Link>
        </>
      ) : (
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
          <button
            type="submit"
            disabled={busy}
            className="h-12 w-full rounded-xl bg-teal-600 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {busy ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
