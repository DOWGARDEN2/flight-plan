import type { Task, Phase } from '../types'
import { parseISO, daysUntil, currentPhase } from './dates'

// Does a recurring task land on this date?
function recurringHitsToday(task: Task, iso: string): boolean {
  const c = task.cadence
  if (c.kind === 'daily') return true
  if (c.kind === 'weekly') return c.days.includes(parseISO(iso).getDay())
  if (c.kind === 'monthly') return parseISO(iso).getDate() === c.day
  return false
}

// A milestone surfaces in the list when it's due within the next 7 days (or overdue).
function milestoneIsNear(task: Task, iso: string): boolean {
  if (task.cadence.kind !== 'once') return false
  const d = daysUntil(task.cadence.dueDate, iso)
  return d <= 7
}

function phaseActive(task: Task, phase: Phase): boolean {
  return task.activePhases.includes(phase)
}

// The full "what should James see today" computation.
export function tasksForDay(allTasks: Task[], iso: string): Task[] {
  const { phase } = currentPhase(iso)
  return allTasks.filter((t) => {
    if (!phaseActive(t, phase)) return false
    if (t.type === 'recurring') return recurringHitsToday(t, iso)
    return milestoneIsNear(t, iso)
  })
}

// Sort: milestones with a due date first (most urgent), then by priority, then category.
export function sortForToday(tasks: Task[], iso: string): Task[] {
  return [...tasks].sort((a, b) => {
    const am = a.type === 'milestone'
    const bm = b.type === 'milestone'
    if (am !== bm) return am ? -1 : 1
    if (am && bm && a.cadence.kind === 'once' && b.cadence.kind === 'once') {
      const d = daysUntil(a.cadence.dueDate, iso) - daysUntil(b.cadence.dueDate, iso)
      if (d !== 0) return d
    }
    if (a.priority !== b.priority) return a.priority - b.priority
    return a.category.localeCompare(b.category)
  })
}
