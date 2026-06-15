import type { Task } from '../types'
import { TaskCard } from '../components/TaskCard'
import { IconPlane } from '../components/icons'
import { SAT_DATE, EA_DATE, daysUntil, currentPhase, prettyDate } from '../lib/dates'
import { tasksForDay, sortForToday } from '../lib/schedule'

const PHASE_NAME: Record<string, string> = {
  P1: 'Foundation',
  P2: 'Summer Build',
  P3: 'August Sprint',
  P4: 'Application Season',
  P5: 'Close-out'
}

export function Today({
  allTasks,
  today,
  isDone,
  toggle
}: {
  allTasks: Task[]
  today: string
  isDone: (id: string) => boolean
  toggle: (id: string) => void
}) {
  const { phase, focus } = currentPhase(today)
  const list = sortForToday(tasksForDay(allTasks, today), today)
  const milestones = list.filter((t) => t.type === 'milestone')
  const recurring = list.filter((t) => t.type === 'recurring')

  const doneCount = list.filter((t) => isDone(t.id)).length
  const pct = list.length ? Math.round((doneCount / list.length) * 100) : 0

  const satDays = daysUntil(SAT_DATE, today)
  const eaDays = daysUntil(EA_DATE, today)

  const R = 34
  const C = 2 * Math.PI * R
  const offset = C - (pct / 100) * C

  return (
    <>
      <header className="hdr">
        <div className="hdr-date">{prettyDate(today)}</div>
        <h1 className="hdr-title">
          Flight <span className="accent">Plan</span>
        </h1>
      </header>

      <div className="phase glass">
        <span className="phase-badge">{phase}</span>
        <div className="phase-text">
          <strong>{PHASE_NAME[phase]}.</strong> {focus}
        </div>
      </div>

      <div className="countdowns">
        <div className="cd glass">
          <div className={`cd-num sat`}>{satDays}</div>
          <div className="cd-label">days to the SAT</div>
          <div className="cd-sub">Sat, Aug 22</div>
        </div>
        <div className="cd glass">
          <div className={`cd-num ea`}>{eaDays}</div>
          <div className="cd-label">days to EA deadline</div>
          <div className="cd-sub">Nov 1 · Purdue + most</div>
        </div>
      </div>

      <div className="ring-wrap glass">
        <svg className="ring" width="84" height="84" viewBox="0 0 84 84">
          <circle className="ring-track" cx="42" cy="42" r={R} fill="none" strokeWidth="8" />
          <circle
            className="ring-fill"
            cx="42"
            cy="42"
            r={R}
            fill="none"
            strokeWidth="8"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 42 42)"
          />
          <text className="ring-pct" x="42" y="48" textAnchor="middle">
            {pct}%
          </text>
        </svg>
        <div className="ring-info">
          <h3>
            {doneCount} of {list.length} done today
          </h3>
          <p>{pct === 100 && list.length > 0 ? 'Cleared the deck. Go rest.' : 'Work the list top to bottom.'}</p>
        </div>
      </div>

      {milestones.length > 0 && (
        <>
          <div className="section-h">Deadlines this week</div>
          {milestones.map((t) => (
            <TaskCard key={t.id} task={t} done={isDone(t.id)} onToggle={() => toggle(t.id)} todayISO={today} />
          ))}
        </>
      )}

      {recurring.length > 0 ? (
        <>
          <div className="section-h">Today's work</div>
          {recurring.map((t) => (
            <TaskCard key={t.id} task={t} done={isDone(t.id)} onToggle={() => toggle(t.id)} todayISO={today} />
          ))}
        </>
      ) : (
        milestones.length === 0 && (
          <div className="empty glass">
            <IconPlane />
            <h3>Nothing scheduled today</h3>
            <p>A rest day. Protect your sleep and come back tomorrow.</p>
          </div>
        )
      )}
    </>
  )
}
