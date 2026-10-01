import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  Pill,
  Activity,
  Timer,
  Moon,
  Sun,
  Send,
} from 'lucide-react'
import Logo from '../components/Logo'
import ChatMockup from '../components/ChatMockup'
import { useTheme } from '../lib/theme'

const FEATURES = [
  {
    icon: Stethoscope,
    gradient: 'from-teal-400 to-teal-600 shadow-teal-500/25',
    title: 'Symptom Guidance',
    text: 'Describe what you feel and get clear, reassuring next steps in seconds.',
  },
  {
    icon: Pill,
    gradient: 'from-violet-400 to-purple-600 shadow-purple-500/25',
    title: 'Medication Info',
    text: 'Understand uses, dosages and interactions for everyday medicines.',
  },
  {
    icon: Activity,
    gradient: 'from-rose-400 to-pink-600 shadow-pink-500/25',
    title: 'Lifestyle Advice',
    text: 'Personal, practical tips for nutrition, sleep and movement.',
  },
  {
    icon: Timer,
    gradient: 'from-amber-400 to-orange-500 shadow-orange-500/25',
    title: 'Available 24/7',
    text: 'Your AI healthcare companion never takes a day off.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Sign in with Google',
    text: 'One tap and you are in — no passwords to remember.',
  },
  {
    n: '02',
    title: 'Quick onboarding',
    text: 'Tell us a little about yourself to personalize care.',
  },
  {
    n: '03',
    title: 'Chat with HosplixAI',
    text: 'Ask anything, anytime. Get instant, thoughtful answers.',
  },
]

export default function Landing() {
  const { dark, toggle } = useTheme()
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-teal-500/25 transition hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-28 pt-16 lg:grid-cols-2 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Sparkles className="h-4 w-4 text-teal-500" />
              AI-powered healthcare, simplified
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Your personal <span className="text-teal-500">AI</span>
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
                healthcare
              </span>
              <br />
              companion
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              HosplixAI answers your health questions, explains medications and guides healthy
              living — available instantly, around the clock.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-400 px-7 py-3.5 font-display text-base font-semibold text-white shadow-xl shadow-teal-500/30 transition hover:opacity-90"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="rounded-2xl border border-slate-200 bg-white px-7 py-3.5 font-display text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                I already have an account
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-teal-500" />
                Private &amp; secure
              </span>
              <span className="inline-flex items-center gap-2">
                <HeartPulse className="h-4.5 w-4.5 text-violet-500" />
                Backed by medical knowledge
              </span>
            </div>
          </div>
          <div className="pb-8 lg:pb-0">
            <ChatMockup />
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight">Meet your AI Doctor</h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
              Thoughtful, instant guidance across every part of your wellbeing.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg`}
                >
                  <f.icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-4xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
              Three simple steps to better health guidance.
            </p>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <p className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text font-display text-5xl font-bold text-transparent">
                  {s.n}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/register"
            className="mt-16 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-violet-500 px-8 py-4 font-display text-base font-semibold text-white shadow-xl shadow-teal-500/25 transition hover:opacity-90"
          >
            Start now — it's free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </main>
    </div>
  )
}
