import { useRef, useState } from 'react'
import type { AppState, Task, Category } from '../types'
import { exportState, importState } from '../lib/storage'
import { todayISO } from '../lib/dates'

const CATS: Category[] = [
  'SAT-Math',
  'SAT-Reading',
  'Calc',
  'Essays',
  'Apps',
  'PPL',
  'Mowing',
  'Photography',
  'Investing',
  'AviationClub',
  'Basics'
]

export function Add({
  state,
  addCustom,
  replaceState,
  flash
}: {
  state: AppState
  addCustom: (t: Task) => void
  replaceState: (s: AppState) => void
  flash: (msg: string) => void
}) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(todayISO())
  const [cat, setCat] = useState<Category>('SAT-Math')
  const [steps, setSteps] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function submit() {
    if (!title.trim()) {
      flash('Give it a title first')
      return
    }
    const t: Task = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category: cat,
      type: 'milestone',
      cadence: { kind: 'once', dueDate: date },
      activePhases: ['P1', 'P2', 'P3', 'P4', 'P5'],
      priority: 2,
      steps: steps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    }
    addCustom(t)
    setTitle('')
    setSteps('')
    flash('Added to your plan')
  }

  function doExport() {
    const blob = new Blob([exportState(state)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flight-plan-backup-${todayISO()}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Backup downloaded')
  }

  function doImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        replaceState(importState(String(reader.result)))
        flash('Backup restored')
      } catch {
        flash('That file could not be read')
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      <header className="hdr">
        <h1 className="hdr-title">Add a task</h1>
        <div className="hdr-date">One-off things that aren't already in the plan.</div>
      </header>

      <div className="glass-soft" style={{ padding: '16px', marginBottom: '20px' }}>
        <div className="field">
          <label htmlFor="t-title">Title</label>
          <input id="t-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Email Mr. Lentz about a rec letter" />
        </div>
        <div className="field">
          <label htmlFor="t-date">Due date</label>
          <input id="t-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="t-cat">Area</label>
          <select id="t-cat" value={cat} onChange={(e) => setCat(e.target.value as Category)}>
            {CATS.map((c) => (
              <option key={c} value={c}>
                {c.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="t-steps">Steps (one per line, optional)</label>
          <textarea id="t-steps" rows={3} value={steps} onChange={(e) => setSteps(e.target.value)} placeholder={'Pull the brag sheet\nAttach it to the email'} />
        </div>
        <button className="btn" onClick={submit}>
          Add to plan
        </button>
      </div>

      <div className="section-h">Your data</div>
      <div className="glass-soft" style={{ padding: '16px' }}>
        <div className="btn-row">
          <button className="btn ghost" onClick={doExport}>
            Export backup
          </button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>
            Import backup
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={doImport} />
        </div>
        <p className="data-note">
          Everything lives on this phone only — nothing is sent anywhere. Export a backup before clearing your browser
          or switching phones so you never lose your streak.
        </p>
      </div>
    </>
  )
}
