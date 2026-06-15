import type { Task, CompletionRecord } from '../types'
import { catVar } from '../components/TaskCard'
import { parseISO, todayISO } from '../lib/dates'
import { tasksForDay } from '../lib/schedule'

const CAT_LABEL: Record<Task['category'], string> = {
  'SAT-Math': 'SAT Math',
  'SAT-Reading': 'SAT Reading & Writing',
  Calc: 'Calculus BC',
  Essays: 'Essays',
  Apps: 'Applications',
  PPL: 'PPL',
  Mowing: 'Mowing',
  Photography: 'Photography',
  Investing: 'Investing',
  AviationClub: 'Aviation Club',
  Basics: 'Basics'
}

function iso(base: string, delta: number): string {
  const d = parseISO(base)
  d.setDate(d.getDate() + delta)
  return todayISO(d)
}

// Longest current run of days (counting back from today) where every scheduled
// task for that day was completed. Rest days don't break the streak.
function overallStreak(allTasks: Task[], completions: CompletionRecord[], today: string): number {
  const doneSet = new Set(completions.filter((c) => c.done).map((c) => `${c.taskId}|${c.date}`))
  let streak = 0
  for (let i = 0; i < 120; i++) {
    const day = iso(today, -i)
    const due = tasksForDay(allTasks, day).filter((t) => t.type === 'recurring')
    if (due.length === 0) continue // rest day — skip, don't break
    const allDone = due.every((t) => doneSet.has(`${t.id}|${day}`))
    if (allDone) streak++
    else break
  }
  return streak
}

export function Progress({
  allTasks,
  completions,
  today
}: {
  allTasks: Task[]
  completions: CompletionRecord[]
  today: string
}) {
  const streak = overallStreak(allTasks, completions, today)

  // SAT sessions logged (Math + Reading), all time.
  const satSessions = completions.filter(
    (c) => c.done && (c.taskId === 'sat-math' || c.taskId === 'sat-reading')
  ).length

  // Per-category completions in the last 30 days, vs. how many were scheduled.
  const cats = Object.keys(CAT_LABEL) as Task['category'][]
  const last30 = Array.from({ length: 30 }, (_, i) => iso(today, -i))
  const doneSet = new Set(completions.filter((c) => c.done).map((c) => `${c.taskId}|${c.date}`))

  const rows = cats
    .map((cat) => {
      let scheduled = 0
      let done = 0
      for (const day of last30) {
        const due = tasksForDay(allTasks, day).filter((t) => t.type === 'recurring' && t.category === cat)
        scheduled += due.length
        done += due.filter((t) => doneSet.has(`${t.id}|${day}`)).length
      }
      return { cat, scheduled, done }
    })
    .filter((r) => r.scheduled > 0)
    .sort((a, b) => b.scheduled - a.scheduled)

  return (
    <>
      <header className="hdr">
        <h1 className="hdr-title">Progress</h1>
        <div className="hdr-date">Consistency is the whole game.</div>
      </header>

      <div className="streak-row">
        <div className="streak-card glass">
          <div className="streak-num">{streak}</div>
          <div className="streak-label">day streak — all tasks cleared</div>
        </div>
        <div className="streak-card glass">
          <div className="streak-num">{satSessions}</div>
          <div className="streak-label">SAT sessions logged</div>
        </div>
      </div>

      <div className="section-h">Last 30 days by area</div>
      <div className="glass-soft" style={{ padding: '16px' }}>
        {rows.length === 0 && <p className="data-note">No completions yet. Check off today's work to start the chart.</p>}
        {rows.map((r) => {
          const pct = r.scheduled ? Math.round((r.done / r.scheduled) * 100) : 0
          return (
            <div key={r.cat} className="cat-bar-row">
              <div className="cat-bar-head">
                <span className="name">{CAT_LABEL[r.cat]}</span>
                <span className="val">
                  {r.done}/{r.scheduled}
                </span>
              </div>
              <div className="cat-bar-track">
                <div className="cat-bar-fill" style={{ width: `${pct}%`, background: catVar(r.cat) }} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
