import { useRef, useState } from 'react'
import type { AppState, Todo } from '../types'
import { exportState, importState } from '../lib/storage'
import { todayISO, daysUntil, parseISO } from '../lib/dates'
import { IconCheck } from '../components/icons'

function TodoRow({
  todo,
  today,
  onToggle,
  onDelete
}: {
  todo: Todo
  today: string
  onToggle: () => void
  onDelete: () => void
}) {
  let duePill = null
  if (todo.dueDate && !todo.done) {
    const d = daysUntil(todo.dueDate, today)
    const label = d < 0 ? `${-d}d overdue` : d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : `${d} days`
    duePill = <span className={`due-pill ${d <= 1 ? 'urgent' : 'soon'}`}>{label}</span>
  }
  return (
    <div className={`task glass-soft ${todo.done ? 'done' : ''}`}>
      <div className="task-row" style={{ cursor: 'default' }}>
        <span className="task-cat-bar" style={{ background: todo.done ? 'var(--text-faint)' : 'var(--teal)' }} />
        <button
          className={`task-check ${todo.done ? 'on' : ''}`}
          onClick={onToggle}
          aria-label={todo.done ? `Mark ${todo.title} not done` : `Mark ${todo.title} done`}
        >
          <IconCheck />
        </button>
        <div className="task-main">
          <div className="task-title">{todo.title}</div>
          {(duePill || todo.done) && (
            <div className="task-meta">
              {duePill}
              {todo.done && todo.doneDate && <span className="task-dur">Done {todo.doneDate.slice(5)}</span>}
            </div>
          )}
        </div>
        <button className="todo-del" onClick={onDelete} aria-label={`Delete ${todo.title}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function Tasks({
  state,
  today,
  addTodo,
  toggleTodo,
  deleteTodo,
  replaceState,
  flash
}: {
  state: AppState
  today: string
  addTodo: (title: string, dueDate?: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  replaceState: (s: AppState) => void
  flash: (msg: string) => void
}) {
  const [title, setTitle] = useState('')
  const [due, setDue] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function submit() {
    if (!title.trim()) {
      flash('Type a task first')
      return
    }
    addTodo(title.trim(), due || undefined)
    setTitle('')
    setDue('')
    flash('Added to your list')
  }

  const open = state.todos
    .filter((t) => !t.done)
    .sort((a, b) => {
      if (!!a.dueDate !== !!b.dueDate) return a.dueDate ? -1 : 1 // dated first
      if (a.dueDate && b.dueDate) return parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime()
      return parseISO(b.createdDate).getTime() - parseISO(a.createdDate).getTime()
    })
  const done = state.todos.filter((t) => t.done).sort((a, b) => (b.doneDate || '').localeCompare(a.doneDate || ''))

  function doExport() {
    const blob = new Blob([exportState(state)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flight-plan-backup-${todayISO()}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Backup downloaded')
  }

  function doImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        replaceState(importState(String(reader.result)))
        flash('Backup restored')
      } catch {
        flash('That file could not be read')
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      <header className="hdr">
        <h1 className="hdr-title">To-Do</h1>
        <div className="hdr-date">Your own list — anything outside the daily plan.</div>
      </header>

      <div className="glass-soft" style={{ padding: '14px', marginBottom: '18px' }}>
        <div className="field" style={{ marginBottom: '10px' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="e.g. Email Mr. Lentz for a rec letter"
            aria-label="New task"
          />
        </div>
        <div className="todo-add-row">
          <input type="date" value={due} onChange={(e) => setDue(e.target.value)} aria-label="Due date (optional)" />
          <button className="btn" style={{ width: 'auto', padding: '0 22px' }} onClick={submit}>
            Add
          </button>
        </div>
        <p className="data-note" style={{ marginTop: '10px' }}>
          Undated tasks stay on this list. Dated ones surface on Today once they're due or overdue.
        </p>
      </div>

      <div className="section-h">
        Open {open.length > 0 && <span style={{ color: 'var(--teal)' }}>· {open.length}</span>}
      </div>
      {open.length === 0 ? (
        <div className="empty glass" style={{ padding: '28px 20px' }}>
          <h3>All clear</h3>
          <p>Nothing on your list. Add something above.</p>
        </div>
      ) : (
        open.map((t) => (
          <TodoRow key={t.id} todo={t} today={today} onToggle={() => toggleTodo(t.id)} onDelete={() => deleteTodo(t.id)} />
        ))
      )}

      {done.length > 0 && (
        <>
          <div className="section-h">Done · {done.length}</div>
          {done.map((t) => (
            <TodoRow key={t.id} todo={t} today={today} onToggle={() => toggleTodo(t.id)} onDelete={() => deleteTodo(t.id)} />
          ))}
        </>
      )}

      <div className="section-h">Your data</div>
      <div className="glass-soft" style={{ padding: '16px' }}>
        <div className="btn-row">
          <button className="btn ghost" onClick={doExport}>
            Export backup
          </button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>
            Import backup
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={doImport} />
        </div>
        <p className="data-note">
          Everything lives on this phone only — nothing is sent anywhere. Export a backup before clearing your browser
          or switching phones so you never lose your streak.
        </p>
      </div>
    </>
  )
}
