/*
  Every piece of content on the site lives here.

  Claims: write [[shown text::how it was measured]] inside any paragraph.
  The shown text becomes a clickable number; the receipt opens as a note.
  Links inside a receipt use [label](url).
*/

export type Category = 'agents' | 'scratch' | 'tools' | 'client'

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'agents', label: 'Agents and evals' },
  { id: 'scratch', label: 'Built from scratch' },
  { id: 'tools', label: 'Tools' },
  { id: 'client', label: 'Websites and products' },
]

export type Project = {
  slug: string
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

export const projects: Project[] = [
  {
    slug: 'tribunal',
    title: 'Tribunal',
    category: 'agents',
    year: '2026',
    role: 'Solo, open source',
    oneLiner: 'A fact-checker where two agents argue and plain code checks every quote.',
    points: ['Prosecutor and Defender argue opposite sides', 'A string-match verifier strikes fake quotes', 'Ships as CLI, MCP server and web UI'],
    chip: ['96% grounding', '83% polarity', '32 claims'],
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
    oneLiner: 'An LLM learns a task inside an app with no API, then replays it with no model.',
    points: ['Learns once, replays deterministically', 'Hands control to a human when unsafe', '17 scenarios with screenshot evidence'],
    chip: ['20/20 replays', '0 drift', '17 scenarios'],
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
    slug: 'glassbox',
    title: 'glassbox',
    category: 'scratch',
    year: '2026',
    role: 'Solo, open source',
    oneLiner: 'A GPT written in pure PyTorch, with a live attention visualizer.',
    points: ['No HuggingFace, every block tested', 'RoPE, SwiGLU, GQA, BPE from scratch', 'Diagram generated from the real config'],
    chip: ['12% fewer params', 'ppl 4.8', '11M'],
    paper: '#8DCDCB',
    ink: '#0B3D3E',
    links: [
      { label: 'GitHub', href: 'https://github.com/udit-rawat/glassbox' },
      { label: 'Live visualizer', href: 'https://udit-rawat.github.io/glassbox/' },
    ],
    stack: 'Python, PyTorch',
    body: [
      'Attention, RMSNorm, RoPE, SwiGLU, grouped-query attention and a BPE tokenizer, each shipped and tested before the next was added. A same-seed ablation got a better validation loss with [[12% fewer parameters::Same seed, same data, two architectures: validation loss 1.48 against 1.50.]]. Scaled up, it reaches [[perplexity 4.8::11M-parameter model, 133M TinyStories tokens, 49 minutes on a free Colab T4.]].',
      'The architecture diagram in the visualizer is generated from the model config and test-locked to the real parameter counts, not drawn by hand.',
    ],
  },
  {
    slug: 'hrm',
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
    oneLiner: 'Short animated reels that show how ML systems actually work.',
    points: ['Optimizers, attention, model merging', 'Steer Adam on a live loss surface', 'Every reel made with Animatic'],
    chip: ['adamax.dev', '@ada.max24'],
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
  github: 'https://github.com/udit-rawat',
  linkedin: 'https://linkedin.com/in/udit-r',
  projectMail:
    'mailto:hello@uditrawat.dev?subject=' +
    encodeURIComponent('Project enquiry') +
    '&body=' +
    encodeURIComponent('Hi Udit,\n\nWhat I want to build:\n\nRough timeline:\n\nBudget range:\n'),
}
