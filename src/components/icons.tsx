// Lucide-style stroke icons. No emoji anywhere in the UI.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const IconToday = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="M3 9h18M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M8 3v4M16 3v4" /><circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" /></svg>
)
export const IconWeek = () => (
  <svg viewBox="0 0 24 24" {...S}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2" /></svg>
)
export const IconPlan = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" /><path d="m9 12 2 2 4-4" /></svg>
)
export const IconProgress = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-4 4" /></svg>
)
export const IconAdd = () => (
  <svg viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
)
export const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#04201d" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 6" /></svg>
)
export const IconChevron = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="m9 6 6 6-6 6" /></svg>
)
export const IconPlane = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.9 4.3-2.4 2.4-1.7-.4a.5.5 0 0 0-.5.8L6 18l2.1 2.4a.5.5 0 0 0 .8-.5l-.4-1.7 2.4-2.4 4.3 3.9a.5.5 0 0 0 .8-.5Z" /></svg>
)
export const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="11" height="11"><path d="m12 2 2.9 6.3 6.8.8-5 4.6 1.3 6.7L12 17.8 5.7 21l1.3-6.7-5-4.6 6.8-.8L12 2Z" /></svg>
)
