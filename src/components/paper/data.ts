/*
  One made-up carrier and its week. Every name and number here is example
  data for the demo, and the page says so.
*/

export const carrier = { name: 'Ridgeline Freight', trucks: 6, place: 'Columbus, Ohio' }

export type Mark = 'none' | 'bad' | 'good'
export type DocKind = 'ratecon' | 'bol' | 'pod' | 'invoice'
export type Field = { label: string; value: string; mark?: Mark }

/* The load the animation follows. */
export const load = {
  number: '4471',
  lane: 'Columbus, OH → Indianapolis, IN',
  shipper: 'Hollis Packaging',
  consignee: 'Northbay Distributors',
  pallets: '22 pallets',
  weight: '18,000 lb',
  delivered: 'Nov 12, 1:05 PM',
  rate: 2350,
  fuel: 188,
  driver: 'Marco',
}

export type LoadStatus = 'invoiced' | 'fixed' | 'waiting' | 'held'

export type LoadItem = {
  id: string
  status: LoadStatus
  title: string
  summary: string
  docs: { kind: DocKind; caption: string; fields: Field[]; signed?: boolean | 'missing'; dark?: boolean }[]
  result: string
}

export const LOADS: LoadItem[] = [
  {
    id: '4471',
    status: 'fixed',
    title: 'Load 4471 · Northbay Distributors',
    summary: 'Proof of delivery came back without a receiver signature',
    docs: [
      { kind: 'bol', caption: 'Bill of lading', fields: [{ label: 'Load', value: '4471' }, { label: 'Pallets', value: '22' }], signed: true },
      { kind: 'pod', caption: 'Proof of delivery, first photo', fields: [{ label: 'Load', value: '4471' }, { label: 'Received by', value: 'not signed', mark: 'bad' }], signed: 'missing' },
    ],
    result: 'Marco was asked at 1:09 pm to get it signed at the dock. The signed copy arrived at 1:31 pm and the invoice went out at 4:12 pm, the same day.',
  },
  {
    id: '4468',
    status: 'invoiced',
    title: 'Load 4468 · Lakeshore Foods',
    summary: 'Everything matched on the first photo',
    docs: [
      { kind: 'ratecon', caption: 'Rate confirmation', fields: [{ label: 'Load', value: '4468' }, { label: 'Rate', value: '$1,980', mark: 'good' }] },
      { kind: 'pod', caption: 'Proof of delivery', fields: [{ label: 'Load', value: '4468' }, { label: 'Received by', value: 'D. Chen', mark: 'good' }], signed: true },
    ],
    result: 'Load number, consignee, pallets and signature all matched the rate confirmation. Invoice drafted in under two minutes and sent after your OK.',
  },
  {
    id: '4475',
    status: 'waiting',
    title: 'Load 4475 · Greenline Hardware',
    summary: 'The photo was too dark to read',
    docs: [
      { kind: 'pod', caption: 'Proof of delivery, photo', fields: [{ label: 'Load', value: '????', mark: 'bad' }, { label: 'Received by', value: 'unreadable', mark: 'bad' }], dark: true },
    ],
    result: 'The driver was asked to retake the photo in better light. The load shows as "waiting on paperwork" until it comes in, so nothing slips through.',
  },
  {
    id: '4462',
    status: 'held',
    title: 'Load 4462 · Westway Builders',
    summary: 'Receiver noted 2 damaged pallets',
    docs: [
      { kind: 'pod', caption: 'Proof of delivery', fields: [{ label: 'Load', value: '4462' }, { label: 'Notes', value: '2 pallets damaged', mark: 'bad' }], signed: true },
    ],
    result: 'Invoice held and handed to you, with the photo attached. Anything that could become a claim waits for a person.',
  },
]

export const report = {
  week: 'Nov 10 to 16',
  tiles: [
    { label: 'Loads delivered', value: '14' },
    { label: 'Invoiced same day', value: '11' },
    { label: 'Waiting on paperwork', value: '$4,180' },
    { label: 'Held for a claim', value: '$2,050' },
  ],
  slowPayers: [
    { name: 'Northbay Distributors', days: 38, invoices: 5 },
    { name: 'Lakeshore Foods', days: 21, invoices: 4 },
  ],
  problems: [
    { text: 'Missing receiver signature', count: 3 },
    { text: 'Photo too dark or blurry', count: 2 },
    { text: 'Damage noted by receiver', count: 1 },
  ],
  change: 'Remind drivers to check for a signature before leaving the dock. Half of this week\'s paperwork problems were missing signatures.',
}
