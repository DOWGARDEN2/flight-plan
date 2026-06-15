export type Category =
  | 'SAT-Math'
  | 'SAT-Reading'
  | 'Calc'
  | 'Essays'
  | 'Apps'
  | 'PPL'
  | 'Mowing'
  | 'Photography'
  | 'Investing'
  | 'AviationClub'
  | 'Basics'

export type Phase = 'P1' | 'P2' | 'P3' | 'P4' | 'P5'

export type Cadence =
  | { kind: 'weekly'; days: number[] } // 0=Sun .. 6=Sat
  | { kind: 'daily' }
  | { kind: 'monthly'; day: number }
  | { kind: 'once'; dueDate: string } // ISO yyyy-mm-dd

export interface Task {
  id: string
  title: string
  category: Category
  type: 'recurring' | 'milestone'
  cadence: Cadence
  activePhases: Phase[]
  durationMin?: number
  priority: 1 | 2 | 3
  steps: string[]
  resource?: string
}

export interface CompletionRecord {
  taskId: string
  date: string // yyyy-mm-dd
  done: boolean
}

export interface AppState {
  completions: CompletionRecord[]
  customTasks: Task[]
  settings: { startDate: string }
}
