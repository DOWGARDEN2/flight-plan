import { useState } from 'react'
import type { Task } from '../types'
import { BIG4 } from '../data/tasks'
import { IconCheck, IconChevron, IconStar } from './icons'
import { daysUntil } from '../lib/dates'

const CAT_LABEL: Record<Task['category'], string> = {
  'SAT-Math': 'SAT Math',
  'SAT-Reading': 'SAT R&W',
  Calc: 'Calc BC',
  Essays: 'Essays',
  Apps: 'Apps',
  PPL: 'PPL',
  Mowing: 'Mowing',
  Photography: 'Photo',
  Investing: 'Investing',
  AviationClub: 'Av Club',
  Basics: 'Basics'
}

export function catVar(cat: Task['category']): string {
  return `var(--c-${cat.toLowerCase().replace('-', '-')})`
}

export function TaskCard({
  task,
  done,
  onToggle,
  todayISO
}: {
  task: Task
  done: boolean
  onToggle: () => void
  todayISO: string
}) {
  const [open, setOpen] = useState(false)
  const isBig4 = BIG4.includes(task.category)
  const hue = catVar(task.category)

  let duePill = null
  if (task.type === 'milestone' && task.cadence.kind === 'once') {
    const d = daysUntil(task.cadence.dueDate, todayISO)
    const label = d <= 0 ? 'Due today' : d === 1 ? 'Tomorrow' : `${d} days`
    duePill = <span className={`due-pill ${d <= 1 ? 'urgent' : 'soon'}`}>{label}</span>
  }

  return (
    <div className={`task glass-soft ${done ? 'done' : ''}`} style={{ borderColor: done ? undefined : `${hue}40` }}>
      <div className="task-row" onClick={() => setOpen((o) => !o)}>
        <span className="task-cat-bar" style={{ background: hue }} />
        <button
          className={`task-check ${done ? 'on' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          aria-label={done ? `Mark ${task.title} not done` : `Mark ${task.title} done`}
        >
          <IconCheck />
        </button>
        <div className="task-main">
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            <span className="task-tag" style={{ color: hue, background: `${hue}1f` }}>
              {CAT_LABEL[task.category]}
            </span>
            {task.durationMin && <span className="task-dur">{task.durationMin} min</span>}
            {isBig4 && task.type === 'recurring' && (
              <span className="big4">
                <IconStar /> Big 4
              </span>
            )}
            {duePill}
          </div>
        </div>
        <span className={`chev ${open ? 'open' : ''}`} aria-hidden>
          <IconChevron />
        </span>
      </div>
      <div className={`task-steps ${open ? '' : 'collapsed'}`}>
        {task.resource && <div className="task-resource">{task.resource}</div>}
        <ol>
          {task.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
