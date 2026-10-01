import { LogOut, Plus, X } from 'lucide-react'
import Logo from '../Logo'

export default function Sidebar({ conversations, activeId, onSelect, onNew, user, onLogout, open, onClose }) {
  const list = (
    <div className="flex h-full w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between px-5 py-4">
        <Logo />
        <button
          onClick={onClose}
          aria-label="Close conversations"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>
      <div className="px-4">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-violet-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`block w-full truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
              c.id === activeId
                ? 'bg-teal-50 font-medium text-teal-700 dark:bg-slate-800 dark:text-teal-400'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {c.title}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2.5 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-violet-500 text-sm font-semibold text-white">
          {(user?.email || '?')[0].toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 truncate text-xs text-slate-500 dark:text-slate-400">
          {user?.email}
        </span>
        <button
          onClick={onLogout}
          aria-label="Log out"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">{list}</div>
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
          <div className="absolute inset-y-0 left-0 shadow-2xl">{list}</div>
        </div>
      )}
    </>
  )
}
