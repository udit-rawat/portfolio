/*
  Two made-up businesses and their last 30 days on Meta ads: a kitchen renovation
  company that books calls, and a clothing store that sells on Shopify.
  Every number here is example data for the demo, and the page says so.
*/

export type Mode = 'service' | 'store'

export type Ad = {
  id: string
  name: string
  headline: string
  spend: number
  /** Funnel stages, widest first. The last stage is the result (clients or orders). */
  stages: { label: string; value: number }[]
  /** Sales revenue matched back from Shopify, for stores. */
  revenue?: number
}

export type Outcome = 'won' | 'answered' | 'person' | 'stopped'

export type Convo = {
  id: string
  outcome: Outcome
  title: string
  summary: string
  messages: { from: 'ai' | 'them'; text: string; note?: string }[]
  result: string
}

export type Report = {
  week: string
  tiles: { label: string; value: string }[]
  questions: { ad: string; text: string; count: number }[]
  spamHidden: number
  change: string
}

export type Dataset = {
  mode: Mode
  label: string
  business: { name: string; initials: string; kind: string; place: string }
  result: { one: string; many: string }
  ads: Ad[]
  report: Report
  convos: Convo[]
}

const service: Dataset = {
  mode: 'service',
  label: 'Service business',
  business: { name: 'Oakline Kitchens', initials: 'OK', kind: 'a kitchen renovation company', place: 'Mississauga' },
  result: { one: 'client', many: 'clients' },
  ads: [
    {
      id: 'a',
      name: 'Ad A',
      headline: '30% off kitchen cabinets this month',
      spend: 600,
      stages: [
        { label: 'Messages', value: 124 },
        { label: 'Qualified', value: 19 },
        { label: 'Booked', value: 6 },
        { label: 'Clients', value: 1 },
      ],
    },
    {
      id: 'b',
      name: 'Ad B',
      headline: 'Free 3D design for your new kitchen',
      spend: 400,
      stages: [
        { label: 'Messages', value: 36 },
        { label: 'Qualified', value: 17 },
        { label: 'Booked', value: 10 },
        { label: 'Clients', value: 4 },
      ],
    },
  ],
  report: {
    week: 'Nov 10 to 16',
    tiles: [
      { label: 'Ad spend', value: '$240' },
      { label: 'Messages', value: '38' },
      { label: 'Calls booked', value: '4' },
      { label: 'New clients', value: '1' },
    ],
    questions: [
      { ad: 'Ad A', text: 'How much does it cost?', count: 21 },
      { ad: 'Ad A', text: 'Do you offer financing?', count: 6 },
      { ad: 'Ad B', text: 'How long does a kitchen take?', count: 8 },
    ],
    spamHidden: 11,
    change: 'Add a starting price to Ad A. 21 of its 38 messages ask for one, and most never book once they hear it.',
  },
  convos: [
    {
      id: 'booked',
      outcome: 'won',
      title: 'Priya booked a design call',
      summary: 'Commented "price?" on Ad B at 10:42 pm',
      messages: [
        { from: 'ai', text: 'Hi Priya! Happy to help with the 3D design. Which room is it, and when are you hoping to start?' },
        { from: 'them', text: 'kitchen, this spring' },
        { from: 'ai', text: "Lovely. What's your postal code, so I can check we cover your area?" },
        { from: 'them', text: 'L5B' },
        { from: 'ai', text: 'We do! Here are a few times for a free design call this week. Which suits you?' },
        { from: 'them', text: 'thursday 6:30' },
      ],
      result: 'Booked Thursday 6:30 pm on the calendar. Counted as a booking from Ad B.',
    },
    {
      id: 'person',
      outcome: 'person',
      title: 'Mike asked about pricing',
      summary: 'Messaged after seeing Ad A',
      messages: [
        { from: 'them', text: 'can you beat my other quote by 20%?' },
        { from: 'ai', text: "Good question for our team, so I've passed it to them with your details. Someone will reply here today." },
      ],
      result: 'Handed to the owner with the full chat. The AI never quotes or negotiates prices.',
    },
    {
      id: 'stopped',
      outcome: 'stopped',
      title: 'Sana went quiet',
      summary: 'Commented "details pls" on Ad A',
      messages: [
        { from: 'ai', text: 'Hi Sana! Which room are you thinking of redoing, and roughly when?' },
        { from: 'ai', text: "Just checking in, in case you'd still like ideas for the space. No pressure either way!", note: '20 hours later' },
      ],
      result: 'One follow-up, sent inside the 24-hour window Meta allows, then it stopped.',
    },
  ],
}

const store: Dataset = {
  mode: 'store',
  label: 'Online store (Shopify)',
  business: { name: 'Fernwood Apparel', initials: 'FA', kind: 'a clothing store selling on Shopify', place: 'Toronto' },
  result: { one: 'order', many: 'orders' },
  ads: [
    {
      id: 'c',
      name: 'Ad C',
      headline: 'New fall jackets, free shipping over $100',
      spend: 800,
      revenue: 1170,
      stages: [
        { label: 'Messages', value: 210 },
        { label: 'Links sent', value: 140 },
        { label: 'Checkouts', value: 22 },
        { label: 'Orders', value: 9 },
      ],
    },
    {
      id: 'd',
      name: 'Ad D',
      headline: 'Our best-selling hoodie is back in stock',
      spend: 500,
      revenue: 2280,
      stages: [
        { label: 'Messages', value: 64 },
        { label: 'Links sent', value: 51 },
        { label: 'Checkouts', value: 31 },
        { label: 'Orders', value: 19 },
      ],
    },
  ],
  report: {
    week: 'Nov 10 to 16',
    tiles: [
      { label: 'Ad spend', value: '$310' },
      { label: 'Messages', value: '68' },
      { label: 'Orders from chats', value: '7' },
      { label: 'Sales from chats', value: '$840' },
    ],
    questions: [
      { ad: 'Ad C', text: 'Does the jacket run small?', count: 14 },
      { ad: 'Ad C', text: 'Do you ship to Calgary?', count: 9 },
      { ad: 'Ad D', text: 'Is the grey back in medium?', count: 11 },
    ],
    spamHidden: 23,
    change: 'Add a fit note and a size chart link to Ad C. Most of its messages ask about sizing, and those are the people who drop off at checkout.',
  },
  convos: [
    {
      id: 'order',
      outcome: 'won',
      title: 'Lena bought a hoodie from a chat',
      summary: 'Commented "is the grey back in M?" on Ad D',
      messages: [
        { from: 'ai', text: 'Hi Lena! Yes, the grey hoodie is back in medium. Here is the link if you want to grab one before it sells out again.' },
        { from: 'ai', text: 'fernwood.shop/hoodie-grey', note: 'link tagged with this chat and Ad D' },
        { from: 'them', text: 'ordered, thank you!!' },
      ],
      result: 'Shopify order #1043 for $120, matched to Ad D through the tagged link, and reported back to Meta as a purchase.',
    },
    {
      id: 'status',
      outcome: 'answered',
      title: 'Omar asked where his order was',
      summary: 'Messaged the store directly',
      messages: [
        { from: 'them', text: 'hey where is my order? #1038' },
        { from: 'ai', text: "Hi Omar! Order #1038 shipped on Tuesday with Canada Post and should arrive Thursday. Here's the tracking link." },
      ],
      result: 'Answered from Shopify order data in seconds. No staff time.',
    },
    {
      id: 'refund',
      outcome: 'person',
      title: 'Jess wants a refund',
      summary: 'Messaged after an order from Ad C',
      messages: [
        { from: 'them', text: 'the jacket arrived with a tear, I want my money back' },
        { from: 'ai', text: "I'm really sorry about that, Jess. I've passed this to our team with your order details, and someone will reply here today." },
      ],
      result: 'Handed to the owner with the order attached. Refunds and complaints always go to a person.',
    },
  ],
}

export const datasets: Record<Mode, Dataset> = { service, store }

/* The animation tells the service story. */
export const business = service.business
export const ads = service.ads

export const resultCount = (ad: Ad) => ad.stages[ad.stages.length - 1].value
export const costPerResult = (ad: Ad) => Math.round(ad.spend / resultCount(ad))
/** Revenue back per dollar of ad spend, for stores. */
export const returnPerDollar = (ad: Ad) => (ad.revenue ? ad.revenue / ad.spend : 0)
