import type { Phase } from '../types'

// All phase windows are 2026 (Part 1 §2 of the master plan).
const PHASE_WINDOWS: { phase: Phase; start: string; end: string; focus: string }[] = [
  { phase: 'P1', start: '2026-01-01', end: '2026-06-30', focus: 'Set up your systems, register for the Aug SAT, open the Roth, start light Math + Calc.' },
  { phase: 'P2', start: '2026-07-01', end: '2026-08-14', focus: 'The SAT engine runs hard, essays get drafted at camp, log PPL hours.' },
  { phase: 'P3', start: '2026-08-15', end: '2026-08-31', focus: 'Final prep, then take the SAT on the 22nd.' },
  { phase: 'P4', start: '2026-09-01', end: '2026-11-03', focus: 'Lock the Calc A, finish supplements, submit your EA apps.' },
  { phase: 'P5', start: '2026-11-04', end: '2026-12-31', focus: 'Decisions, scholarships, hold the line on grades.' }
]

export const SAT_DATE = '2026-08-22'
export const EA_DATE = '2026-11-01'

export function todayISO(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function currentPhase(iso: string): { phase: Phase; focus: string } {
  for (const w of PHASE_WINDOWS) {
    if (iso >= w.start && iso <= w.end) return { phase: w.phase, focus: w.focus }
  }
  // Before P1 or after P5 — clamp to the nearest.
  if (iso < PHASE_WINDOWS[0].start) return { phase: 'P1', focus: PHASE_WINDOWS[0].focus }
  return { phase: 'P5', focus: PHASE_WINDOWS[4].focus }
}

export function daysUntil(targetISO: string, fromISO: string): number {
  const ms = parseISO(targetISO).getTime() - parseISO(fromISO).getTime()
  return Math.round(ms / 86_400_000)
}

export function weekdayShort(iso: string): string {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][parseISO(iso).getDay()]
}

export function prettyDate(iso: string): string {
  return parseISO(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
