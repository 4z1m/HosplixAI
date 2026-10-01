import { LogIn, UserPlus, Mail, Lock, Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/25">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        {children}
      </div>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{footer}</p>
    </div>
  )
}

export function Divider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs font-medium text-slate-400 dark:text-slate-500">
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      <span>OR</span>
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}

export function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="#EA4335"
          d="M12 5.04c1.62 0 3.06.56 4.2 1.66l3.12-3.12C17.46 1.8 14.96.75 12 .75 7.62.75 3.84 3.26 1.98 6.94l3.66 2.84C6.54 7.1 9.03 5.04 12 5.04z"
        />
        <path
          fill="#4285F4"
          d="M23.25 12.27c0-.93-.08-1.6-.26-2.31H12v4.58h6.44c-.13 1.08-.83 2.7-2.39 3.79l3.57 2.77c2.14-1.97 3.63-4.88 3.63-8.83z"
        />
        <path
          fill="#FBBC05"
          d="M5.66 14.22a6.94 6.94 0 0 1 0-4.44L1.98 6.94a11.26 11.26 0 0 0 0 10.12l3.68-2.84z"
        />
        <path
          fill="#34A853"
          d="M12 23.25c3.04 0 5.6-1 7.46-2.72l-3.57-2.77c-.95.66-2.23 1.13-3.89 1.13-2.98 0-5.49-1.99-6.38-4.68l-3.66 2.84c1.85 3.68 5.64 6.2 10.04 6.2z"
        />
      </svg>
      Continue with Google
    </button>
  )
}

export function Field({ label, icon: Icon, type = 'text', value, onChange, placeholder, autoComplete, right }) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
        {right}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  )
}

export function Alert({ tone = 'error', children }) {
  const tones = {
    error: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
    info: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400',
  }
  return <p className="mb-4 rounded-lg px-3 py-2.5 text-sm leading-snug">{children ? <span className={tones[tone]}>{children}</span> : null}</p>
}

export { LogIn, UserPlus, Mail, Lock, Link2 }
