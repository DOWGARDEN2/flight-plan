import type { Task } from '../types'

// The Big 4 — protected, highest-ROI work. Surfaced at the top of Today.
export const BIG4: Task['category'][] = ['SAT-Math', 'SAT-Reading', 'Calc', 'Essays']

// Weekday key: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
//
// Weekly rhythm (summer):
//   Mon  Math · Essays · PPL ground
//   Tue  Reading · Calc · Aviation club
//   Wed  Math · Essays · Photography
//   Thu  Reading · Calc · PPL ground
//   Fri  Math · Essays
//   Sat  Reading · Mowing · PPL ground
//   Sun  Calc · Finance · rest
export const TASKS: Task[] = [
  // ───────────────────────── SAT MATH (Big 4) ─────────────────────────
  {
    id: 'sat-math',
    title: 'SAT Math session',
    category: 'SAT-Math',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [1, 3, 5] },
    activePhases: ['P1', 'P2', 'P3'],
    durationMin: 75,
    priority: 1,
    resource: 'Bluebook · Question Bank · Khan Academy',
    steps: [
      'Warm up Desmos (5 min): graph a line, click an intersection to solve a system, find the zeros of a quadratic, find a vertex. These four moves turn hard algebra into graph-reading.',
      'Timed set (30 min): ~18–20 official questions on this week\'s focus domain. Strict timer — flag anything past 90 seconds and move on.',
      'Error log (20 min) — the most valuable part: for every miss, write the skill and tag it C (careless), K (didn\'t know), or F (too slow). Re-solve it correctly.',
      'Targeted reps (15 min): pull 8–12 Question Bank items of exactly the skill you just missed. If it was a K, watch the Khan lesson first.',
      'Desmos drill (5 min): one technique to automaticity — regression on a table, sliders for an unknown coefficient, solving by intersection.',
      'Module 1 matters most: it routes you to the hard Module 2 that unlocks 700+. Treat Module-1-style accuracy as the priority.'
    ]
  },
  // ───────────────────────── SAT READING & WRITING (Big 4) ─────────────────────────
  {
    id: 'sat-reading',
    title: 'SAT Reading & Writing session',
    category: 'SAT-Reading',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [2, 4, 6] },
    activePhases: ['P1', 'P2', 'P3'],
    durationMin: 45,
    priority: 1,
    resource: 'Question Bank (filter by skill) · Bluebook · Khan',
    steps: [
      'Review (5 min): re-read your last error-log entries and say the grammar rule out loud.',
      'Timed set (25 min): ~12–18 Question Bank items on the day\'s skill at ~70 sec each. Grammar and transitions should go fast.',
      'Predict before you peek: for transitions, decide the relationship (contrast / cause / addition) before reading options. For Words in Context, cover the choices and supply your own word first.',
      'Rhetorical Synthesis: read the GOAL first, then the bullets. Every choice is true — pick the one that hits the stated goal; kill the off-goal ones.',
      'Punctuation rule: decide what sits on each side of the mark. Two complete sentences need a period, semicolon, or comma+FANBOYS — a lone comma is a splice. Often "no punctuation" is correct.',
      'Review (15 min): for every miss, write the rule + why the trap answer was tempting. The log is where the points come from.'
    ]
  },
  // ───────────────────────── CALCULUS BC (Big 4) ─────────────────────────
  {
    id: 'calc-prelearn',
    title: 'Calc BC pre-learn',
    category: 'Calc',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [0, 2, 4] },
    activePhases: ['P1', 'P2', 'P3'],
    durationMin: 30,
    priority: 1,
    resource: 'Khan Academy → AP Calculus BC',
    steps: [
      'Work in order: limits → derivatives → derivative rules → applications → start integrals.',
      'Take short notes in your own words — your style.',
      'Goal: walk into semester 1 treating class as review so the A is locked before October.'
    ]
  },
  {
    id: 'calc-homework',
    title: 'Calc BC homework + office hours prep',
    category: 'Calc',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [1, 3, 5] },
    activePhases: ['P4'],
    durationMin: 40,
    priority: 1,
    resource: 'Class notes + textbook',
    steps: [
      'Do the homework the day it\'s assigned, while the lecture is fresh.',
      'Keep a running list of questions for the teacher.',
      'Go to office hours weekly — the A is built on not letting one confusion compound.'
    ]
  },
  // ───────────────────────── ESSAYS (Big 4) ─────────────────────────
  {
    id: 'essays',
    title: 'College essays',
    category: 'Essays',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [1, 3, 5] },
    activePhases: ['P2'],
    durationMin: 45,
    priority: 1,
    resource: 'Common App',
    steps: [
      'Spine: "I learn obsessively, master things, then lead — and I learn from whoever\'s better." Run aviation through it: pilot parents → PPL → aviation club → airshow photography.',
      'Real proof, not adjectives: sub-30s Rubik\'s, chess, the PC build, percussion leadership, swim captaincy.',
      'Process: outline → ugly first draft → revise → read aloud → cut 15%.',
      'Keep your voice. One adult reader at the very end, not before.'
    ]
  },
  {
    id: 'supplements',
    title: 'Supplement essays (per school)',
    category: 'Essays',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [1, 3, 5] },
    activePhases: ['P4'],
    durationMin: 45,
    priority: 1,
    resource: 'Each school\'s portal',
    steps: [
      'One school per sitting. Match that school\'s exact prompts.',
      'For "why us," name specific programs (Purdue co-op, WMU cadet pipeline, a named lab or professor).',
      'Reuse your spine, but make every answer school-specific — readers can smell a template.'
    ]
  },
  // ───────────────────────── PPL ─────────────────────────
  {
    id: 'ppl-ground',
    title: 'PPL ground school',
    category: 'PPL',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [1, 4, 6] },
    activePhases: ['P1', 'P2', 'P3'],
    durationMin: 30,
    priority: 2,
    resource: 'FAA written prep · IACRA',
    steps: [
      'Study toward the FAA knowledge (written) test.',
      'Log every flight\'s hours the same day.',
      'Milestones: solo → cross-country → checkride-ready. Consider a 5-day intensive if it fits around camp.'
    ]
  },
  // ───────────────────────── MOWING ─────────────────────────
  {
    id: 'mowing-route',
    title: 'Mowing route + log revenue',
    category: 'Mowing',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [6] },
    activePhases: ['P1', 'P2', 'P3', 'P4'],
    durationMin: 120,
    priority: 2,
    resource: 'Client list',
    steps: [
      'Mow all clients, batched by location to cut drive time.',
      'New clients $40–50/cut — no anchor to your old $35. Offer mulch / cleanup add-ons.',
      'Log each job\'s revenue the same day; route a fixed % straight to investing.'
    ]
  },
  // ───────────────────────── PHOTOGRAPHY ─────────────────────────
  {
    id: 'photo-outreach',
    title: 'Photography: 1 outreach + deliver galleries',
    category: 'Photography',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [3] },
    activePhases: ['P2', 'P3', 'P4'],
    durationMin: 30,
    priority: 2,
    resource: 'Pixieset',
    steps: [
      'Summer money-maker: senior portraits (rising seniors need them July–Sept).',
      'One concrete outreach action: post a package, DM a team parent group, or email a coach.',
      'Deliver any open Pixieset galleries so you get paid and get referrals.'
    ]
  },
  // ───────────────────────── INVESTING ─────────────────────────
  {
    id: 'invest-learn',
    title: 'Finance learning (10 min)',
    category: 'Investing',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [0] },
    activePhases: ['P1', 'P2', 'P3', 'P4', 'P5'],
    durationMin: 10,
    priority: 3,
    resource: 'Your pick',
    steps: [
      'Learn one concept: index funds, compounding, Roth vs brokerage, expense ratios.',
      'Ties straight into DECA finance events.'
    ]
  },
  {
    id: 'invest-monthly',
    title: 'Monthly auto-invest',
    category: 'Investing',
    type: 'recurring',
    cadence: { kind: 'monthly', day: 1 },
    activePhases: ['P1', 'P2', 'P3', 'P4', 'P5'],
    priority: 2,
    resource: 'Roth IRA / brokerage',
    steps: [
      'Move a fixed % of business income in.',
      'Buy a low-cost broad index fund (total-market or S&P 500). Boring on purpose.',
      'Do this with your parents — it\'s a framework, not financial advice.'
    ]
  },
  // ───────────────────────── AVIATION CLUB ─────────────────────────
  {
    id: 'avclub-plan',
    title: 'Aviation club planning task',
    category: 'AviationClub',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [2] },
    activePhases: ['P2'],
    durationMin: 20,
    priority: 3,
    resource: 'EAA / Young Eagles',
    steps: [
      'Charter / approval, find an advisor.',
      'Line up your EAA / Young Eagles connection for a first event.',
      'Draft a semester calendar. This is your leadership headline in the fall.'
    ]
  },
  {
    id: 'avclub-run',
    title: 'Run the aviation club',
    category: 'AviationClub',
    type: 'recurring',
    cadence: { kind: 'weekly', days: [2] },
    activePhases: ['P4'],
    durationMin: 30,
    priority: 3,
    resource: 'EAA / Young Eagles',
    steps: [
      'Hold the monthly meeting; keep momentum between them.',
      'Lock at least one flying / Young Eagles event this term.',
      'It ties your whole story — pilot family, PPL, photography — into one leadership line.'
    ]
  },
  // ───────────────────────── BASICS ─────────────────────────
  {
    id: 'sleep',
    title: 'Sleep 8 hours',
    category: 'Basics',
    type: 'recurring',
    cadence: { kind: 'daily' },
    activePhases: ['P1', 'P2', 'P3', 'P4', 'P5'],
    priority: 1,
    steps: [
      'Set a bedtime and hold it.',
      'Non-negotiable before any test or flight — sleep loss already cost you one SAT.'
    ]
  },

  // ════════════════════════ MILESTONES ════════════════════════
  {
    id: 'm-register-sat',
    title: 'Register for the August SAT',
    category: 'SAT-Math',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-06-21' },
    activePhases: ['P1'],
    priority: 1,
    resource: 'collegeboard.org',
    steps: [
      'Confirm the exact August date (~Aug 22, 2026) and the registration deadline.',
      'Register and pick a nearby test center before it fills.'
    ]
  },
  {
    id: 'm-diagnostic',
    title: 'Take Bluebook diagnostic test 1',
    category: 'SAT-Math',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-06-28' },
    activePhases: ['P1'],
    priority: 1,
    resource: 'Bluebook app (on a laptop)',
    steps: [
      'Take a full adaptive test in the real Bluebook app — it mirrors test day exactly.',
      'Build your error log from it: tag every miss C / K / F (math) and by rule (reading).',
      'Pick your 3 weakest skills in each section. That sets the week-by-week focus.'
    ]
  },
  {
    id: 'm-roth',
    title: 'Open custodial Roth IRA + brokerage',
    category: 'Investing',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-06-30' },
    activePhases: ['P1'],
    priority: 1,
    steps: [
      'With your parents as custodian.',
      'Earned income from mowing / photography qualifies.',
      'Set up automatic monthly investing into a broad index fund.'
    ]
  },
  {
    id: 'm-photo-packages',
    title: 'Build 3 senior-portrait packages',
    category: 'Photography',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-06-30' },
    activePhases: ['P1'],
    priority: 2,
    steps: [
      'Mini / Standard / Premium with set pricing on Pixieset.',
      'Post them and tell your whole school network.'
    ]
  },
  {
    id: 'm-commonapp-main',
    title: 'Finish Common App main essay (at camp)',
    category: 'Essays',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-07-31' },
    activePhases: ['P2'],
    priority: 1,
    steps: [
      'Complete the common section + main personal essay at the college workshop.',
      'Use the learning + aviation spine.'
    ]
  },
  {
    id: 'm-commonapp-open',
    title: 'Common App opens — start school list',
    category: 'Apps',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-08-01' },
    activePhases: ['P2'],
    priority: 2,
    steps: [
      'Create / confirm the account.',
      'Start the school list and pick a major per school (aerospace eng vs professional flight).'
    ]
  },
  {
    id: 'm-supplements',
    title: 'All supplemental essays drafted',
    category: 'Essays',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-08-14' },
    activePhases: ['P2'],
    priority: 1,
    steps: [
      'One sub-task per school.',
      'Match each school\'s prompts and its "why us."'
    ]
  },
  {
    id: 'm-take-sat',
    title: 'TAKE THE SAT',
    category: 'SAT-Math',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-08-22' },
    activePhases: ['P3'],
    priority: 1,
    steps: [
      'Sleep 8 hours the night before. Desmos reflexes warm.',
      'Two-pass each module: answer fast, flag the hard ones, return. Never leave a blank — no guessing penalty.',
      'Spend any leftover Module 1 time double-checking — it sets your ceiling. Goal: Math 700+.'
    ]
  },
  {
    id: 'm-recs',
    title: 'Request 2 recommendation letters',
    category: 'Apps',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-08-31' },
    activePhases: ['P3', 'P4'],
    priority: 2,
    steps: [
      'Ask 2 teachers who know you well — ideally one STEM.',
      'Give them a brag sheet of your achievements so the letter writes itself.'
    ]
  },
  {
    id: 'm-ea-submit',
    title: 'Submit Early Action apps (early!)',
    category: 'Apps',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-10-20' },
    activePhases: ['P4'],
    priority: 1,
    steps: [
      'Submit before the Nov 1 rush, not on the deadline.',
      'Send SAT scores to each school.',
      '8 schools, Purdue-centered.'
    ]
  },
  {
    id: 'm-ea-deadline',
    title: 'EA DEADLINE — Purdue + most',
    category: 'Apps',
    type: 'milestone',
    cadence: { kind: 'once', dueDate: '2026-11-01' },
    activePhases: ['P4'],
    priority: 1,
    steps: [
      'Everything must be in.',
      'Georgia Tech EA is Nov 3 for non-Georgia applicants.'
    ]
  }
]
