import { HeartPulse } from 'lucide-react'

export default function Logo({ size = 'md' }) {
  const box = size === 'lg' ? 'h-11 w-11 rounded-2xl' : 'h-9 w-9 rounded-xl'
  const icon = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
  const text = size === 'lg' ? 'text-2xl' : 'text-lg'
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`${box} flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/25`}
      >
        <HeartPulse className={`${icon} text-white`} />
      </span>
      <span className={`${text} font-display font-bold text-slate-900 dark:text-white`}>
        Hosplix<span className="text-teal-500">AI</span>
      </span>
    </span>
  )
}
