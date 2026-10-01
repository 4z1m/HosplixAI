import { useEffect, useRef, useState } from 'react'
import { Menu, Send, Plus, LogOut } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { api } from '../lib/api'
import Logo from '../components/Logo'
import Sidebar from '../components/chat/Sidebar.jsx'

const SUGGESTIONS = [
  "I've had a headache for 2 days, what should I do?",
  'What helps with better sleep?',
  'Explain how ibuprofen works',
]

export default function Chat() {
  const { user, logout } = useAuth()
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    api
      .get('/api/conversations')
      .then((d) => setConversations(d.conversations))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!activeId) {
      setMessages([])
      return
    }
    api
      .get(`/api/conversations/${activeId}/messages`)
      .then((d) => setMessages(d.messages))
      .catch(() => {})
  }, [activeId])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  async function send(text) {
    const content = text.trim()
    if (!content || sending) return
    setError('')
    setSending(true)
    setInput('')
    let convoId = activeId
    try {
      if (!convoId) {
        const c = await api.post('/api/conversations', {})
        convoId = c.conversation.id
        setConversations((prev) => [c.conversation, ...prev])
        setActiveId(convoId)
      }
      setMessages((prev) => [
        ...prev,
        { id: 'tmp-user', role: 'user', content },
        { id: 'tmp-loading', role: 'assistant', pending: true },
      ])
      const d = await api.post(`/api/conversations/${convoId}/messages`, { content })
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== 'tmp-user' && !m.pending),
        d.userMessage,
        d.assistantMessage,
      ])
      setConversations((prev) =>
        prev.map((c) => (c.id === convoId ? { ...c, title: d.title || c.title } : c)),
      )
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== 'tmp-user' && !m.pending))
      setError(e.message)
      setInput(content)
    } finally {
      setSending(false)
    }
  }

  function newChat() {
    setActiveId(null)
    setMessages([])
    setError('')
    setSidebarOpen(false)
  }

  const activeTitle = conversations.find((c) => c.id === activeId)?.title || 'New chat'

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id)
          setSidebarOpen(false)
        }}
        onNew={newChat}
        user={user}
        onLogout={logout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open conversations"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="truncate font-display text-base font-semibold sm:text-lg">{activeTitle}</h1>
          <button
            onClick={newChat}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New chat</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            {messages.length === 0 && !sending ? (
              <div className="flex h-full flex-col items-center justify-center py-24 text-center">
                <Logo size="lg" />
                <h2 className="mt-6 font-display text-2xl font-bold sm:text-3xl">
                  How can I help your health today?
                </h2>
                <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                  Ask anything about symptoms, medications or healthy living.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-teal-700 dark:hover:text-teal-400"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((m) =>
                  m.pending ? (
                    <div key={m.id} className="flex">
                      <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <span className="flex gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                      <div
                        className={
                          m.role === 'user'
                            ? 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-3 text-sm leading-relaxed text-white shadow-md'
                            : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
                        }
                      >
                        {m.content}
                      </div>
                    </div>
                  ),
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          {error && (
            <p className="mx-auto mb-2 max-w-3xl rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
              {error}
            </p>
          )}
          <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 pl-5 focus-within:border-teal-400 dark:border-slate-700 dark:bg-slate-800">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Ask HosplixAI anything…"
              className="max-h-40 flex-1 resize-none bg-transparent py-2.5 text-sm outline-none dark:text-white"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || sending}
              aria-label="Send message"
              className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-violet-500 text-white shadow-lg shadow-teal-500/25 transition hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
            HosplixAI offers general guidance, not medical diagnosis. In an emergency, call your
            local emergency number.
          </p>
        </div>
      </div>
    </div>
  )
}
