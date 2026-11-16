/*
  Every piece of content on the site lives here.

  Claims: write [[shown text::how it was measured]] inside any paragraph.
  The shown text becomes a clickable number; the receipt opens as a note.
  Links inside a receipt use [label](url).
*/

export type Category = 'demo' | 'agents' | 'scratch' | 'tools' | 'client'

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'demo', label: 'Demos' },
  { id: 'agents', label: 'Agents and evals' },
  { id: 'scratch', label: 'Built from scratch' },
  { id: 'tools', label: 'Tools' },
  { id: 'client', label: 'Websites and products' },
]

export type Project = {
  /** Engineering experiments: shown on /lab, not on the client-facing homepage. */
  lab?: boolean
  slug: string
  /** Where the folder opens, when the project has its own page instead of /work/<slug>. */
  href?: string
  title: string
  category: Category
  year: string
  role: string
  oneLiner: string
  points: [string, string, string]
  chip: string[]
  paper: string // folder colour, matches scripts/make_covers.py
  ink: string
  dark?: boolean
  links: { label: string; href: string }[]
  stack: string
  body: string[]
  fallsShort?: string
  figure?: { src: string; alt: string; caption: string }
}

/* The address a project's folder and links open. */
export const projectHref = (p: Project) => p.href ?? `/work/${p.slug}`

export const projects: Project[] = [
  {
    slug: 'tribunal',
    title: 'Tribunal',
    category: 'agents',
    year: '2026',
    role: 'Solo, open source',
    oneLiner: 'A multi-agent workflow: two AI agents argue a claim, and plain code checks every quote before a verdict.',
    points: ['Two agents argue opposite sides', 'Code strikes any quote not in the source', 'Runs as a command, a server and a web app'],
    chip: ['multi-agent', '96% of quotes grounded'],
    paper: '#D8D5CE',
    ink: '#C8161D',
    links: [{ label: 'GitHub', href: 'https://github.com/udit-rawat/tribunal' }],
    stack: 'Python, LangGraph, MCP, LanceDB, RAGAS',
    body: [
      'A Prosecutor agent and a Defender agent argue opposite sides of a claim over evidence retrieved just in time. Before the Judge rules, a deterministic verifier strikes any quote that does not appear word for word in the source. No model grades its own output.',
      'On a hand-labelled set it reaches [[96% quote grounding::Grounding is a string match against the source text, not a model\'s opinion.]] and [[83% polarity accuracy::32-claim balanced golden set; 29 scored, 3 excluded as API errors. Eval harness in [the repo](https://github.com/udit-rawat/tribunal).]]. A typical verdict costs [[$0.0022 and 25.5 s::Read off a real verdict card from the web UI, a paid-model run (the free-tier setup costs $0 and takes about 15 s). The Great Wall claim, false at 90% confidence, one fabricated quote struck.]].',
    ],
    fallsShort: 'Strict accuracy is 66%. The usual miss is calling a misleading claim flatly false, which traces to a specific gap in the Judge prompt.',
  },
  {
    slug: 'planrail',
    lab: true,
    title: 'planrail',
    category: 'agents',
    year: '2026',
    role: 'Solo, for aitrainingplan.app',
    oneLiner: 'The model proposes a training plan. Code decides whether it ships.',
    points: ['Rules checked in code, never by the model', 'Repair before regenerate', 'Checks hard days across week boundaries'],
    chip: ['0 extra LLM calls', '2 fixtures'],
    paper: '#EFECE3',
    ink: '#D32B1F',
    links: [{ label: 'GitHub', href: 'https://github.com/udit-rawat/planrail' }],
    stack: 'Python',
    body: [
      'A multi-step agentic pipeline for an AI training-plan app: generate, validate, repair, regenerate only what repair cannot fix, fall back to a template that is valid by construction, then publish.',
      'Handing a whole plan back to the model to fix week 3 throws away five good weeks and usually breaks another one. Here the validator emits structured hints, code does the surgery, and the model only sees what code cannot describe. It resolves every violation with [[zero extra LLM calls::On both committed fixtures in [the repo](https://github.com/udit-rawat/planrail). Includes a --no-repair ablation to compare against.]].',
      'The ramp rule is 10% or a +3 km floor, whichever is more permissive, because the textbook 10% rule never lets a 12 km/week runner build. ACWR is used as a governor, not a predictor, and only above a 20 km/week chronic floor.',
    ],
    fallsShort: 'Two fixtures is a small test bed. It shows the design works, not how it behaves across thousands of athletes.',
  },
  {
    slug: 'muscle-memory',
    title: 'muscle-memory',
    category: 'agents',
    year: '2026',
    role: 'Solo, open source',
    oneLiner: 'Automates old software that cannot connect to anything: AI learns the task once, then it repeats with no AI needed.',
    points: ['Works inside software with no API', 'Learns once, repeats the same way every time', 'Hands over to a person when unsure'],
    chip: ['20 of 20 repeats', 'no AI per run'],
    paper: '#BCCDE0',
    ink: '#21498A',
    links: [{ label: 'GitHub', href: 'https://github.com/udit-rawat/muscle-memory' }],
    stack: 'Python, Playwright',
    body: [
      'An LLM works out how to finish a task inside a legacy UI that has no API. The successful run compiles into a capability that replays with no model in the loop, and hands control to a person mid-task when it cannot continue safely.',
      'The final stability check: [[20 of 20 replays, zero drift::Last of 17 scenarios committed as evidence, each with screenshots, run against a deliberately legacy mock core-banking app. See [evidence/](https://github.com/udit-rawat/muscle-memory).]].',
    ],
  },
  {
    slug: 'context-lab',
    lab: true,
    title: 'Context Lab',
    category: 'agents',
    year: '2026',
    role: 'Solo, open source',
    oneLiner: 'I built four retrieval strategies to test a coding tool\'s 60 to 80% savings claim against full-context stuffing.',
    points: ['Four retrieval strategies, one baseline', 'Top-8 retrieval matched full context', 'Reported the tie, not a nicer story'],
    chip: ['97.9% fewer tokens', 'same quality'],
    paper: '#F3DC86',
    ink: '#7F5E00',
    links: [{ label: 'GitHub', href: 'https://github.com/udit-rawat/ContextLab' }],
    stack: 'Python, RAG evaluation',
    body: [
      'A RAG-compression product advertised 60 to 80% token savings. I built four strategies and measured them against stuffing the whole context. Plain top-8 retrieval cut tokens by [[97.9%::126,053 tokens for full stuffing against 2,655 for top-8. Quality differences between strategies were not statistically significant. Code and data in [the repo](https://github.com/udit-rawat/ContextLab).]] at the same answer quality.',
    ],
    fallsShort: 'The cleverer strategies did not beat plain top-8. I reported the tie instead of the more flattering result.',
  },
  {
    slug: 'clean-file',
    href: '/immigration',
    title: 'Clean File',
    category: 'demo',
    year: '2026',
    role: 'Product, for immigration consultants',
    oneLiner: 'Checks every name, date and number across an immigration file before it goes in.',
    points: ['Cross-checks forms against documents', 'Flags the mismatches officers look for', 'Drafts client follow-ups in their own language'],
    chip: ['live demo', '14 documents', '4 flags'],
    paper: '#F1E7D2',
    ink: '#1F2F4A',
    links: [{ label: 'Try the demo', href: '/immigration' }],
    stack: 'React, Motion. Review pipeline in development.',
    body: [
      'A second review for spousal, visitor and work-permit files: names, dates, income and relationship history checked across every form and document, with a record showing nothing was changed. The licensed consultant decides everything.',
      'The demo walks through a made-up file, from a sponsor in Brampton and an applicant in Ludhiana, and shows the four kinds of mismatch it catches.',
    ],
    fallsShort: 'The demo is scripted. The review pipeline behind it is being built with our first pilot firms.',
  },
  {
    slug: 'payback',
    href: '/payback',
    title: 'Payback',
    category: 'demo',
    year: '2026',
    role: 'Product, for businesses that run on Meta ads',
    oneLiner: 'Connects Meta ads, messages and Shopify sales, and shows every week which ads actually make money.',
    points: ['Every comment and message answered', 'Sales and bookings matched to each ad', 'A weekly one-page report with one change'],
    chip: ['live demo', 'Meta + Shopify', 'weekly report'],
    paper: '#DCE6EF',
    ink: '#14233A',
    links: [{ label: 'Try the demo', href: '/payback' }],
    stack: 'React, Motion. Meta messaging integration in development.',
    body: [
      'An ad-to-client pipeline for local businesses that run on Facebook and Instagram ads: every comment and message answered in seconds through Meta\'s official tools, the same qualifying questions every time, good leads booked onto the calendar, and anything sensitive handed to a person.',
      'Each conversation is tied to the ad it came from and matched to Shopify orders or calendar bookings, so the owner sees sales per ad, and gets a one-page report every week with one thing to change.',
    ],
    fallsShort: 'The demo is scripted with a made-up business. The live integration is being built with our first pilot clients.',
  },
  {
    slug: 'signed-off',
    href: '/signed-off',
    title: 'Signed Off',
    category: 'demo',
    year: '2026',
    role: 'Product, for businesses that bill from signed paperwork',
    oneLiner: 'Reads photos of signed delivery paperwork, catches problems at the dock, and gets the invoice out the same day.',
    points: ['Reads the photo the driver sends', 'Checks it against the load before billing', 'Invoice out the same day, weekly cash report'],
    chip: ['live demo', 'photo in', 'invoice out'],
    paper: '#DDE6D3',
    ink: '#1C3324',
    links: [{ label: 'Try the demo', href: '/signed-off' }],
    stack: 'React, Motion. Document reading pipeline in development.',
    body: [
      'A paperwork-to-payment pipeline for small fleets: drivers send a photo of the signed proof of delivery over WhatsApp, every field is read and checked against the rate confirmation and bill of lading, and problems like a missing signature are caught while the driver is still at the dock.',
      'Clean loads become invoices the same day, sent to the customer or the factoring company after the owner\'s OK. Anything that could become a claim is held for a person, and a weekly report shows where cash is stuck.',
    ],
    fallsShort: 'The demo is scripted with a made-up carrier. The live pipeline is being built with our first pilot clients.',
  },
  {
    slug: 'know-how',
    href: '/know-how',
    title: 'Know How',
    category: 'demo',
    year: '2026',
    role: 'Product, for teams that run on their own documents',
    oneLiner: 'Answers staff questions from the company\'s own documents, with the page each answer came from.',
    points: ['Plain-language questions, from anywhere', 'Every answer cites its page', 'Flags missing and out-of-date documents'],
    chip: ['live demo', 'cited answers', 'gap report'],
    paper: '#E4DFF0',
    ink: '#231A3A',
    links: [{ label: 'Try the demo', href: '/know-how' }],
    stack: 'React, Motion. Retrieval pipeline in development.',
    body: [
      'An internal assistant that answers from a company\'s own manuals, policies, price lists and emails. Every part of an answer points to the exact page it came from, and when nothing in the documents answers a question, it says so instead of guessing.',
      'Unanswered questions go to the right person once and their reply is kept, documents that contradict each other get flagged, and a weekly report shows what the team asked, what is missing and what to write down next.',
    ],
    fallsShort: 'The demo is scripted with a made-up company. The live pipeline is being built with our first pilot clients.',
  },
  {
    slug: 'hrm',
    lab: true,
    title: 'Hierarchical Reasoner',
    category: 'scratch',
    year: '2026',
    role: 'Solo reproduction',
    oneLiner: 'A from-scratch reproduction of Sapient\'s Hierarchical Reasoning Model.',
    points: ['Slow planner, fast executor, one pass', 'Solves every 5×5 maze', 'Sudoku failure written up, not hidden'],
    chip: ['100% mazes', '15.9% sudoku'],
    paper: '#ECE4D2',
    ink: '#1F4FA0',
    links: [{ label: 'GitHub', href: 'https://github.com/udit-rawat/hierarchical-reasoner' }],
    stack: 'Python, PyTorch',
    body: [
      'A reproduction of arXiv:2506.21734: a slow planner and a fast executor inside one forward pass. It solves [[100% of 5×5 mazes::Path accuracy on 5×5 maze pathfinding, with 66.7% fewer compute steps from ACT halting. Training curves in [the repo](https://github.com/udit-rawat/hierarchical-reasoner).]].',
    ],
    fallsShort: 'On 9×9 Sudoku it reaches 15.9% cell accuracy against an 11.1% random baseline, barely above chance. The root cause is written up in the repo.',
    figure: { src: '/previews/hrm-curves.png', alt: 'Training curves on 5×5 mazes: loss falling, cell and path accuracy rising to 100% over 50 epochs', caption: 'Loss, cell accuracy and path accuracy over 50 epochs.' },
  },
  {
    slug: 'reposignal',
    lab: true,
    title: 'RepoSignal',
    category: 'tools',
    year: '2026',
    role: 'Solo, Chrome extension',
    oneLiner: 'Scores a GitHub repo before you depend on it. No AI, no servers.',
    points: ['Six signals into one 0 to 100 verdict', 'Computes locally, same score twice', 'Weights tunable and test-locked'],
    chip: ['0 servers', '6 signals'],
    paper: '#CFD6F2',
    ink: '#3D4FAE',
    links: [{ label: 'GitHub', href: 'https://github.com/udit-rawat/RepoSignal' }],
    stack: 'JavaScript, Chrome extension',
    body: [
      'Maintenance, security, contributor risk, community, release hygiene and docs, weighted into one verdict. Every score computes in your browser, so it is reproducible and nothing leaves your machine. The weights are tunable, exportable and locked by a test suite.',
    ],
  },
  {
    slug: 'animatic',
    lab: true,
    title: 'Animatic',
    category: 'tools',
    year: '2026',
    role: 'Solo, powers AdaMax',
    oneLiner: 'One JSON spec becomes a narrated, word-synced motion graphic and an MP4.',
    points: ['Narration, timing and animation from one spec', 'A hook blocks render until motion checks pass', 'No manual keyframing'],
    chip: ['spec to MP4'],
    paper: '#EFA98F',
    ink: '#962E14',
    links: [
      { label: 'GitHub', href: 'https://github.com/udit-rawat/animatic' },
      { label: 'Reels', href: 'https://www.instagram.com/ada.max24' },
    ],
    stack: 'Python, Gemini TTS, GSAP',
    body: [
      'A spec-driven engine for AI-narrated explainer reels: the spec becomes Gemini narration, word-level timings, HTML and GSAP animation, then a rendered MP4. A Claude Code hook blocks the render until the animation passes a motion gate, so nothing ships with stock zoom-ins or bounce.',
    ],
  },
  {
    slug: 'adamax',
    title: 'AdaMax',
    category: 'client',
    year: '2026',
    role: 'My product',
    oneLiner: 'An automated pipeline that turns a written script into narrated, animated infographic reels.',
    points: ['Script in, narrated reel out', 'Voice and visuals synced word by word', 'Runs the adamax.dev explainer channel'],
    chip: ['automated reels', 'adamax.dev'],
    paper: '#161616',
    ink: '#E8513A',
    dark: true,
    links: [
      { label: 'adamax.dev', href: 'https://adamax.dev' },
      { label: 'Instagram', href: 'https://www.instagram.com/ada.max24' },
    ],
    stack: 'Animatic, GSAP, Canvas',
    body: [
      'An explainer channel and site for ML ideas that are easier to see than to read: why code models invent package names, why attention piles onto one token, how much memory fine-tuning really needs. The site opens on Adam running across a loss surface that you can steer yourself.',
      'Every reel comes out of an automated pipeline: one written spec for the script and the visuals becomes a narrated, word-synced animation and an MP4. The same pipeline can turn a business\'s reports or product data into short explainer videos.',
    ],
  },
  {
    slug: 'misaanjh',
    title: 'Misaanjh',
    category: 'client',
    year: '2026',
    role: 'Client, built the entire website',
    oneLiner: 'A full Shopify storefront for an Indian luxury sleepwear brand.',
    points: ['Built the whole store end to end', 'Email automation in Shopify Email and Flow', 'Live and taking orders'],
    chip: ['Shopify', 'live store'],
    paper: '#EFC9D2',
    ink: '#3B4724',
    links: [{ label: 'misaanjh.com', href: 'https://misaanjh.com' }],
    stack: 'Shopify, Liquid, Shopify Email, Shopify Flow',
    body: [
      'I built the entire website: storefront, collections and product pages, the Sleep Ritual range, checkout offers, and the welcome-email automation. The client wanted everything in-house on Shopify, so the automation runs on Shopify Email and Flow with no third-party tools.',
      'Before launch I audited the store for leaks, such as a welcome discount reaching buyers who had already paid because consent is pre-ticked at checkout in India, and fixed each one.',
      'Timeline: store created 29 May 2026, first product added 17 June 2026, and the build completed by mid-September 2026.',
      '“Udit created our whole Shopify store from scratch: the main page, the product and collection page designs, our checkout deals and the welcome email automation. Everything was completed by mid-September 2026, and we paid him in full. The site has been live and running well since launch. Udit suggested cash on delivery and set up promo-code tracking as part of the checkout deals.” Isha, Founder, Misaanjh',
    ],
  },
]

export type Job = {
  org: string
  role: string
  when: string
  year: string
  logos?: string[]
  summary: string
  items?: { title: string; text: string }[]
}

export const jobs: Job[] = [
  {
    org: 'Node Solutions',
    role: 'Independent AI engineer',
    when: 'Sep 2026 to now',
    year: '2026',
    logos: ['/logos/node-solutions-logo.png'],
    summary: 'Remote contract work delivered directly to clients: LLM cost analysis, agent systems and production automation.',
  },
  {
    org: 'Mercor and Outlier',
    role: 'AI generalist',
    when: 'Ongoing',
    year: '2026',
    logos: ['/logos/mercor-logo.png', '/logos/outlier-logo.svg'],
    summary: 'Writing and grading training and evaluation data for frontier language models.',
  },
  {
    org: 'TapHealth',
    role: 'AI engineer, previously AI intern',
    when: 'Feb 2025 to Jul 2026',
    year: '2025',
    logos: ['/logos/taphealth-logo.png'],
    summary: 'Promoted from intern to engineer in under two months. Shipped models and agents to a diabetes app used daily.',
    items: [
      { title: 'Offline diabetes model', text: 'With Eli Lilly. Runs fully on a Snapdragon 680 phone: [[380 MB, under 890 ms::Qwen 0.6B/1.5B fine-tuned with LoRA, quantized to GGUF Q4_K_M, 3× smaller than the start. Measured on the target phone with no network. Private codebase.]], with [[98% out-of-scope refusal::A separate ONNX INT8 classifier decides scope, so the language model never judges itself.]].' },
      { title: 'LLM gateway', text: 'One LiteLLM gateway routes LLM calls across heavy, fast and vision classes, with ordered fallbacks and retries. One nudge pipeline\'s LLM cost fell by [[85%::After the April P0 fixes, which also cut latency 20% and storage 60%. Private codebase.]].' },
      { title: 'Coaching agents', text: 'Five stateful LangGraph agents with long-term memory across 25 tools. Lab-report OCR went from [[40 s to 15 s::End-to-end report processing before and after the async OCR/PDF pipeline, streamed over SSE.]].' },
      { title: 'Nudge engine', text: 'Replaced a rules engine with a DSPy pipeline serving [[5,000+ users::Production users at TapHealth. Habit classification and message generation run as separate steps.]].' },
    ],
  },
  {
    org: 'IIT Kanpur',
    role: 'Project intern, Perception and Intelligence Lab',
    when: 'Jul to Oct 2024',
    year: '2024',
    logos: ['/logos/iitk-logo.png'],
    summary: 'Curated a 200K+ image dataset and tuned a diffusion inpainting model to [[11.72 dB PSNR, 0.41 SSIM::Measured on held-out masks the model never trained on.]].',
  },
  {
    org: 'VIPS-TC, GGSIPU',
    role: 'B.Tech in AI and ML',
    when: '2021 to 2025',
    year: '2021',
    summary: 'GPA 9.1/10. Published two papers along the way.',
  },
]

export const papers = [
  { title: 'Efficient Adaptation of Lightweight LLMs with T-Free Tokenization', where: 'ICAAI 2025, Springer' },
  { title: 'Boosting Algorithms for Class Imbalance', where: 'SSWC 2025' },
]

export const services = [
  {
    title: 'Document processing workflows',
    lede: 'Pull the data out of invoices, forms, contracts, or applications and send it to your sheet, CRM, or database. Anything unclear goes to a person for review, so nothing is silently wrong.',
    proof: 'Method: the measured quality check behind Tribunal, which reaches 96% quote grounding on a 32 claim test set.',
    proofHref: '/work/tribunal',
    includes: ['Extraction rules agreed with you before the build', 'People review low confidence items', 'Output sent straight to your systems', 'A quality report from a test set you can keep'],
  },
  {
    title: 'Support triage and resolution',
    lede: 'Read every incoming request, sort it by type and urgency, draft the reply, and route anything sensitive to the right person.',
    proof: 'Proof: the coaching agents I built at TapHealth, with 25 tools and bounded tool calling.',
    proofHref: '/#work',
    includes: ['Categories and urgency rules set with you', 'Drafted replies a person approves before sending', 'Refunds, complaints, and edge cases escalated', 'A weekly summary of volume and outcomes'],
  },
  {
    title: 'Reliability and evals for AI features',
    lede: 'Find out whether your AI feature really works. I build a test set, measure quality, and set up checks so a change that breaks something is caught before customers see it.',
    proof: 'Proof: Tribunal, with measured results on a 32 claim set and a documented failure mode.',
    proofHref: '/work/tribunal',
    includes: ['A test set built from real examples', 'Quality scores before and after each change', 'Regression checks you can run yourself', 'A written report on where the feature fails'],
  },
  {
    title: 'Shopify store with automation',
    lede: 'A storefront built end to end, with email and Flow automation that runs on Shopify alone. Handed over ready for you to run.',
    proof: 'Proof: Misaanjh, a live Shopify store with in-house email and Flow automation.',
    proofHref: '/work/misaanjh',
    includes: ['Storefront design and build', 'Welcome and order automation in Shopify Email and Flow', 'Mobile, speed, and tracking checks', 'A handover call so you can edit it yourself'],
  },
  {
    title: 'Bespoke build',
    lede: 'A custom AI workflow designed around how your team already works. Scope and acceptance criteria are agreed up front, through the same six stages as every project.',
    proof: 'Method: the same staged process and revision terms used on every project.',
    proofHref: '/#journey',
    includes: ['Start from the process you want to change', 'Scope and acceptance criteria agreed before the build', 'Built, tested, and handed over with documentation', 'Two rounds of revisions after handover'],
  },
]

export const alsoAvailable = [
  'Lead follow-up automation',
  'LLM cost and routing review',
  'Internal document Q and A',
  'UI automation for tools without an API',
  'AI coding setup for engineering teams',
  'Monthly support on systems I have built',
]

export const steps = [
  { title: 'Talk', text: 'A short call to understand the problem and what it costs you. I reply within a day.', doing: 'Tell me the problem, your goal, and any constraints.', gets: 'A written summary of the problem to confirm before we go further.' },
  { title: 'Scope', text: 'We agree on the first piece of work, with a clear definition of done for each part.', doing: 'Review the scope and tell me what to change.', gets: 'A written scope you can sign off on, with acceptance criteria.' },
  { title: 'Build', text: 'I build in short cycles with a weekly update.', doing: 'Check each update and send your feedback in one message.', gets: 'A working version you can see and test, not only a plan.' },
  { title: 'Review', text: 'You test the work against the agreed criteria, and we fix anything that does not match.', doing: 'Test it and send your feedback together.', gets: 'Two rounds of revisions after handover, for defects and small adjustments to the agreed work. New steps are scoped separately.' },
  { title: 'Handover', text: 'Everything is delivered with a walkthrough, so you can run it without me.', doing: 'Confirm the handover is complete.', gets: 'The code, documentation, access, and a walkthrough call.' },
  { title: 'Keep going', text: 'If it works, we decide together on ongoing support or the next piece of work.', doing: 'Decide whether to continue.', gets: 'A monthly arrangement for ongoing work, with one named contact.' },
]

export const contact = {
  email: 'hello@uditrawat.dev',
  booking: 'https://calendar.app.google/DcnGVWRMq77gXdJi7',
  github: 'https://github.com/udit-rawat',
  linkedin: 'https://linkedin.com/in/udit-r',
  projectMail:
    'mailto:hello@uditrawat.dev?subject=' +
    encodeURIComponent('Project enquiry') +
    '&body=' +
    encodeURIComponent('Hi Udit,\n\nWhat I want to build:\n\nRough timeline:\n\nBudget range:\n'),
}

/* What a client sees on the homepage, and the engineering work kept on /lab. */
export const showcase = projects.filter((p) => !p.lab)
export const labProjects = projects.filter((p) => p.lab)
