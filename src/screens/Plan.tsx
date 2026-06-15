import { currentPhase } from '../lib/dates'

const PHASES = [
  { id: 'P1', name: 'Foundation', dates: 'now → Jun 30', text: 'Set up systems, register for the Aug SAT, open the Roth, start light SAT + Calc.' },
  { id: 'P2', name: 'Summer Build', dates: 'Jul 1 → Aug 14', text: 'The SAT engine runs hard, essays get drafted at camp, PPL hours, photography income.' },
  { id: 'P3', name: 'August Sprint', dates: 'Aug 15 → Aug 31', text: 'Final prep, take the SAT Aug 22, finalize the school list and supplements.' },
  { id: 'P4', name: 'Application Season', dates: 'Sep 1 → Nov 3', text: 'Win the Calc BC A, finish supplements, submit EA early, launch the aviation club.' },
  { id: 'P5', name: 'Close-out', dates: 'Nov 4 → Dec', text: 'Decisions, scholarships, hold your grades, reply to coaches.' }
]

const MILESTONES = [
  { date: 'Jun 21', title: 'Register for the August SAT' },
  { date: 'Jun 28', title: 'Take Bluebook diagnostic test 1' },
  { date: 'Jun 30', title: 'Open custodial Roth IRA + brokerage' },
  { date: 'Jun 30', title: 'Build 3 senior-portrait packages' },
  { date: 'Jul 31', title: 'Finish Common App main essay (at camp)' },
  { date: 'Aug 1', title: 'Common App opens — start school list' },
  { date: 'Aug 14', title: 'All supplemental essays drafted' },
  { date: 'Aug 22', title: 'TAKE THE SAT' },
  { date: 'Aug 31', title: 'Request 2 recommendation letters' },
  { date: 'Oct 20', title: 'Submit Early Action apps (early)' },
  { date: 'Nov 1', title: 'EA deadline — Purdue + most' },
  { date: 'Nov 3', title: 'Georgia Tech EA (non-Georgia)' }
]

const SCHOOLS = [
  { tier: 'Lead — aviation + opportunity', list: ['Purdue', 'Western Michigan', 'Embry-Riddle'] },
  { tier: 'Engineering — reach', list: ['Georgia Tech', 'Michigan', 'UIUC'] },
  { tier: 'Engineering — target', list: ['Michigan Tech', 'Texas A&M', 'UT Austin', 'CU Boulder', 'Virginia Tech'] },
  { tier: 'Safety', list: ['Central Michigan'] }
]

const STACK = [
  'SAT Math → 700+ by Aug 22',
  'SAT Reading & Writing → 720+',
  'A in Calculus BC, semester 1',
  'Common App + essays done this summer',
  'PPL hours this summer',
  'Submit 8 EA apps by Nov 1 (Purdue-centered)',
  'Open Roth IRA + automate investing',
  'Scale mowing + launch senior-portrait packages',
  'Launch the aviation club in the fall'
]

export function Plan({ today }: { today: string }) {
  const { phase } = currentPhase(today)
  return (
    <>
      <header className="hdr">
        <h1 className="hdr-title">The Plan</h1>
        <div className="hdr-date">The whole map. Today's work comes straight from this.</div>
      </header>

      <div className="section-h">Phases</div>
      {PHASES.map((p) => (
        <div key={p.id} className={`plan-phase glass-soft ${p.id === phase ? 'active' : ''}`}>
          <div className="plan-phase-head">
            <span className="phase-badge">{p.id}</span>
            <strong>{p.name}</strong>
            <span className="plan-dates">{p.dates}</span>
          </div>
          <p>{p.text}</p>
        </div>
      ))}

      <div className="section-h">Hard deadlines</div>
      {MILESTONES.map((m, i) => (
        <div key={i} className="mstone glass-soft">
          <span className="mstone-date">{m.date}</span>
          <span className="mstone-title">{m.title}</span>
        </div>
      ))}

      <div className="section-h">School list</div>
      <div className="glass-soft" style={{ padding: '16px' }}>
        {SCHOOLS.map((s) => (
          <div key={s.tier} className="school-tier">
            <h4>{s.tier}</h4>
            <div className="school-list">
              {s.list.map((sc) => (
                <span key={sc} className="school">
                  {sc}
                </span>
              ))}
            </div>
          </div>
        ))}
        <p className="data-note">
          Apply Early Action (non-binding) everywhere — better odds, merit aid, honors. D3 swim is a walk-on
          tiebreaker, not a scholarship strategy. Purdue lets you defer the pilot-vs-engineer fork.
        </p>
      </div>

      <div className="section-h">Where the marginal hour goes</div>
      {STACK.map((s, i) => (
        <div key={i} className="stack-item glass-soft">
          <span className="stack-num">{i + 1}</span>
          <span>{s}</span>
        </div>
      ))}
      <p className="data-note">
        Investing here is a framework, not financial advice — set up accounts with your parents. Confirm the exact
        August SAT date and all deadlines on the official sites.
      </p>
    </>
  )
}
