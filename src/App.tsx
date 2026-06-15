import { useEffect, useMemo, useState } from 'react'
import type { AppState, Task, Todo } from './types'
import { TASKS } from './data/tasks'
import { loadState, saveState } from './lib/storage'
import { todayISO } from './lib/dates'
import { Today } from './screens/Today'
import { Week } from './screens/Week'
import { Plan } from './screens/Plan'
import { Progress } from './screens/Progress'
import { Tasks } from './screens/Tasks'
import { IconToday, IconWeek, IconPlan, IconProgress, IconList } from './components/icons'

type Tab = 'today' | 'week' | 'plan' | 'progress' | 'tasks'

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState())
  const [tab, setTab] = useState<Tab>('today')
  const [toast, setToast] = useState<string | null>(null)
  const today = todayISO()

  useEffect(() => {
    saveState(state)
  }, [state])

  const allTasks: Task[] = useMemo(() => [...TASKS, ...state.customTasks], [state.customTasks])

  const doneSet = useMemo(
    () => new Set(state.completions.filter((c) => c.done).map((c) => `${c.taskId}|${c.date}`)),
    [state.completions]
  )

  const isDoneOn = (id: string, date: string) => doneSet.has(`${id}|${date}`)
  const isDone = (id: string) => isDoneOn(id, today)

  function toggleOn(id: string, date: string) {
    setState((s) => {
      const existing = s.completions.find((c) => c.taskId === id && c.date === date)
      let completions
      if (existing) {
        completions = s.completions.map((c) =>
          c.taskId === id && c.date === date ? { ...c, done: !c.done } : c
        )
      } else {
        completions = [...s.completions, { taskId: id, date, done: true }]
      }
      return { ...s, completions }
    })
  }

  const toggle = (id: string) => toggleOn(id, today)

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }

  function addTodo(title: string, dueDate?: string) {
    const todo: Todo = {
      id: `todo-${Date.now()}`,
      title,
      createdDate: today,
      dueDate,
      done: false
    }
    setState((s) => ({ ...s, todos: [...s.todos, todo] }))
  }

  function toggleTodo(id: string) {
    setState((s) => ({
      ...s,
      todos: s.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done, doneDate: !t.done ? today : undefined } : t
      )
    }))
  }

  function deleteTodo(id: string) {
    setState((s) => ({ ...s, todos: s.todos.filter((t) => t.id !== id) }))
  }

  // To-dos that belong on Today: undated, due today, or overdue — and still open.
  const todayTodos = state.todos.filter(
    (t) => !t.done && (!t.dueDate || t.dueDate <= today)
  )

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <IconToday /> },
    { id: 'week', label: 'Week', icon: <IconWeek /> },
    { id: 'plan', label: 'Plan', icon: <IconPlan /> },
    { id: 'progress', label: 'Progress', icon: <IconProgress /> },
    { id: 'tasks', label: 'To-Do', icon: <IconList /> }
  ]

  return (
    <>
      <div className="app-scroll">
        {tab === 'today' && (
          <Today
            allTasks={allTasks}
            today={today}
            isDone={isDone}
            toggle={toggle}
            todos={todayTodos}
            toggleTodo={toggleTodo}
            goToTodo={() => setTab('tasks')}
          />
        )}
        {tab === 'week' && <Week allTasks={allTasks} today={today} isDoneOn={isDoneOn} toggleOn={toggleOn} />}
        {tab === 'plan' && <Plan today={today} />}
        {tab === 'progress' && <Progress allTasks={allTasks} completions={state.completions} today={today} />}
        {tab === 'tasks' && (
          <Tasks
            state={state}
            today={today}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            replaceState={setState}
            flash={flash}
          />
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>
    </>
  )
}
