/*
  One made-up company, its documents and a week of questions. Every name and
  number here is example data for the demo, and the page says so.
*/

export const company = { name: 'Summit Air', kind: 'a heating and cooling company', place: 'Denver', staff: 25, docs: 86, pages: '1,240' }

export type Source = { n: number; doc: string; page: string; before: string; quote: string; after: string }

/* The question the animation follows, its three sources, and the answer built from them. */
export const QUESTION = 'Is the furnace at 14 Elm St still under warranty? Can I swap the control board?'

export const SOURCES: Source[] = [
  { n: 1, doc: 'Service record · 14 Elm St', page: 'job 20871', before: 'Furnace NF-80, serial 4471-K.', quote: 'Installed Mar 3, 2021 and registered with the maker on Mar 9.', after: 'Annual tune-up done Oct 2025.' },
  { n: 2, doc: 'Northfield warranty terms', page: 'p. 4', before: 'Section 2.1, parts.', quote: 'Parts are covered for 10 years when registered within 60 days of install.', after: 'Labour is not covered.' },
  { n: 3, doc: 'Field procedure FP-12', page: 'p. 2', before: 'Warranty part swaps.', quote: "Photograph the old board's serial label before you remove it.", after: 'Upload the photo to the job.' },
]

export const ANSWER: { text: string; cite?: number }[] = [
  { text: 'Yes. It was installed in March 2021 and registered within the 60 days', cite: 1 },
  { text: ', so parts are covered until March 2031', cite: 2 },
  { text: '. You can swap the board, but photograph the old board’s serial label before removing it', cite: 3 },
  { text: '. Labour is not covered.' },
]

export const GAP = {
  question: 'Do we do same-day repairs on Sundays?',
  asked: 6,
  owner: 'Dana in the office',
}

export const CONFLICT = {
  question: "What's our diagnostic fee?",
  old: { doc: 'Price list 2024', amount: '$89' },
  current: { doc: 'Price list 2026', amount: '$99' },
}

/* Binder pages flipped through while searching. */
export const RIFFLE = ['Service records', 'Price list 2026', 'Northfield manual', 'Warranty terms', 'Field procedures', 'Safety handbook', 'Team emails', 'Price list 2024']

export type Outcome = 'answered' | 'gap' | 'conflict'

export type Asked = {
  id: string
  outcome: Outcome
  who: string
  question: string
  answer: string
  sources: Source[]
}

export const WEEK: Asked[] = [
  {
    id: 'refrigerant',
    outcome: 'answered',
    who: 'Asked by a technician, from a job',
    question: 'What refrigerant does the Northfield AC-36 use, and how much?',
    answer: 'R-454B, with a factory charge of 6 lb 4 oz. Add 0.6 oz for every foot of line set over 15 feet.',
    sources: [
      { n: 1, doc: 'Northfield AC-36 install guide', page: 'p. 18', before: 'Table 6.', quote: 'Refrigerant R-454B. Factory charge 6 lb 4 oz.', after: 'Charged for 15 ft line set.' },
      { n: 2, doc: 'Northfield AC-36 install guide', page: 'p. 19', before: 'Longer line sets.', quote: 'Add 0.6 oz per foot beyond 15 ft.', after: 'Weigh in, do not top off.' },
    ],
  },
  {
    id: 'membership',
    outcome: 'answered',
    who: 'Asked by the front desk, on a call',
    question: 'Does the comfort membership include a free filter?',
    answer: 'Yes, one standard filter at each of the two yearly tune-ups. Upgraded filters are 15% off.',
    sources: [
      { n: 1, doc: 'Comfort membership terms', page: 'p. 1', before: 'What is included.', quote: 'Two tune-ups a year, each with one standard filter.', after: 'Priority booking.' },
      { n: 2, doc: 'Comfort membership terms', page: 'p. 2', before: 'Discounts.', quote: 'Members get 15% off upgraded filters and parts.', after: 'Not valid with other offers.' },
    ],
  },
  {
    id: 'sunday',
    outcome: 'gap',
    who: 'Asked 6 times this week',
    question: 'Do we do same-day repairs on Sundays?',
    answer: "Not in your documents, so it didn't guess. Sent to Dana in the office to answer once. Her reply is saved, and the next person gets it straight away.",
    sources: [],
  },
  {
    id: 'fee',
    outcome: 'conflict',
    who: 'Asked by the front desk',
    question: "What's our diagnostic fee?",
    answer: '$99, from the 2026 price list. The 2024 list still says $89 and is in the shared drive, so it was flagged for you to remove.',
    sources: [
      { n: 1, doc: 'Price list 2026', page: 'p. 1', before: 'Service calls.', quote: 'Diagnostic visit: $99, waived if the repair goes ahead.', after: 'After-hours add $60.' },
      { n: 2, doc: 'Price list 2024 (old)', page: 'p. 1', before: 'Service calls.', quote: 'Diagnostic visit: $89.', after: 'After-hours add $50.' },
    ],
  },
]

export const report = {
  week: 'Nov 10 to 16',
  tiles: [
    { label: 'Questions asked', value: '312' },
    { label: 'Answered with a source', value: '281' },
    { label: 'Not in your documents', value: '14' },
    { label: 'Documents in conflict', value: '3' },
  ],
  top: [
    { text: 'Refrigerant type and charge', count: 41 },
    { text: 'Warranty status for an address', count: 37 },
    { text: 'Membership benefits', count: 22 },
  ],
  gaps: [
    { text: 'Same-day repairs on Sundays', count: 6 },
    { text: 'Who approves a refund over $500', count: 4 },
    { text: 'Heat pump rebate paperwork', count: 4 },
  ],
  change: 'Write one paragraph on Sunday call-outs. It was the most-asked question with no answer, and each one became a call to the office.',
}
