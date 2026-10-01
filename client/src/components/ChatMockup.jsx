import { Send } from 'lucide-react'

export default function ChatMockup() {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
        <div className="flex items-center gap-1.5 pb-4">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            HosplixAI
          </span>
        </div>
        <div className="flex justify-end pb-3">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2.5 text-sm text-white">
            I've had a headache for 2 days, what should I do?
          </div>
        </div>
        <div className="pb-4">
          <div className="max-w-[92%] rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            I'm sorry you're uncomfortable. For a tension headache, rest, hydration and
            over-the-counter pain relief usually help. If it's severe, sudden, or with vision
            changes, please see a doctor promptly. Would you like tips to prevent them?
          </div>
        </div>
        <div className="flex items-center rounded-xl border border-slate-200 px-4 py-2.5 dark:border-slate-700">
          <span className="flex-1 text-sm text-slate-400">Ask HosplixAI anything…</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-violet-500">
            <Send className="h-4 w-4 text-white" />
          </span>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-300/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 sm:-right-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
          <Send className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Avg. response</p>
          <p className="text-sm font-bold">&lt; 2 seconds</p>
        </div>
      </div>
    </div>
  )
}
