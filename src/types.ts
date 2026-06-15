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

// A free-form to-do item, separate from the planned daily tasks.
export interface Todo {
  id: string
  title: string
  createdDate: string // yyyy-mm-dd
  dueDate?: string // yyyy-mm-dd, optional
  done: boolean
  doneDate?: string
}

export interface AppState {
  completions: CompletionRecord[]
  customTasks: Task[]
  todos: Todo[]
  settings: { startDate: string }
}
