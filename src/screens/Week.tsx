import type { Task } from '../types'
import { catVar } from '../components/TaskCard'
import { todayISO, parseISO, weekdayShort } from '../lib/dates'
import { tasksForDay, sortForToday } from '../lib/schedule'

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function isoOffset(base: string, deltaDays: number): string {
  const d = parseISO(base)
  d.setDate(d.getDate() + deltaDays)
  return todayISO(d)
}

export function Week({
  allTasks,
  today,
  isDoneOn,
  toggleOn
}: {
  allTasks: Task[]
  today: string
  isDoneOn: (id: string, date: string) => boolean
  toggleOn: (id: string, date: string) => void
}) {
  // Start the grid on the Sunday of the current week.
  const startOffset = -parseISO(today).getDay()
  const days = Array.from({ length: 7 }, (_, i) => isoOffset(today, startOffset + i))

  return (
    <>
      <header className="hdr">
        <h1 className="hdr-title">The Week</h1>
        <div className="hdr-date">Your rhythm — tap a chip to check off any day.</div>
      </header>
      <div className="week-grid">
        {days.map((iso) => {
          const list = sortForToday(tasksForDay(allTasks, iso), iso).filter((t) => t.type === 'recurring')
          const doneN = list.filter((t) => isDoneOn(t.id, iso)).length
          const isToday = iso === today
          return (
            <div key={iso} className={`week-day glass-soft ${isToday ? 'today' : ''}`}>
              <div className="week-day-head">
                <div className="week-day-name">
                  {DOW[parseISO(iso).getDay()]}
                  <span className="dow">{weekdayShort(iso)} {parseISO(iso).getDate()}</span>
                </div>
                <div className="week-count">
                  {doneN}/{list.length}
                </div>
              </div>
              <div className="week-chips">
                {list.length === 0 && <span className="week-chip" style={{ opacity: 0.5 }}>Rest day</span>}
                {list.map((t) => {
                  const d = isDoneOn(t.id, iso)
                  return (
                    <button
                      key={t.id}
                      className={`week-chip ${d ? 'done-chip' : ''}`}
                      onClick={() => toggleOn(t.id, iso)}
                    >
                      <span className="dot" style={{ background: catVar(t.category) }} />
                      {t.title.replace(' session', '').replace(' (per school)', '')}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
