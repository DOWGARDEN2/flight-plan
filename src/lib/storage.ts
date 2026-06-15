import type { AppState } from '../types'
import { todayISO } from './dates'

const KEY = 'flight-plan-state-v1'

const EMPTY: AppState = {
  completions: [],
  customTasks: [],
  todos: [],
  settings: { startDate: todayISO() }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      completions: parsed.completions ?? [],
      customTasks: parsed.customTasks ?? [],
      todos: parsed.todos ?? [],
      settings: parsed.settings ?? { startDate: todayISO() }
    }
  } catch {
    return EMPTY
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2)
}

export function importState(json: string): AppState {
  const parsed = JSON.parse(json) as AppState
  if (!Array.isArray(parsed.completions)) throw new Error('Invalid backup file')
  return parsed
}
