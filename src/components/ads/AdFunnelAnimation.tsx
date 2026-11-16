import { AnimatePresence, motion } from 'motion/react'
import { DemoControls } from '../shared/DemoPlayer'
import { useDemoPlayer } from '../shared/useDemoPlayer'
import { AdCard } from './AdCard'
import { FunnelCompare } from './FunnelCompare'
import { ads } from './data'
import { springs } from '../shared/springs'

/*
  A 30-second story of one ad turning into booked calls, in six scenes:
  the ad, the comments, instant replies, a booking, a hand-off, then the funnel.
  Plays only while on screen; holds still for reduced-motion users.
*/

const SCENES = [
  { title: 'Your ad goes live', text: 'People start commenting within minutes, often at night.', ms: 4200 },
  { title: 'The comments pile up', text: '"Price?" "Do you serve my area?" "Details please."', ms: 4600 },
  { title: 'Every one gets a reply in seconds', text: "A short public reply, then a private message that asks the questions you'd ask.", ms: 6200 },
  { title: 'Good leads book themselves', text: 'Qualified people pick a time for a call on your calendar.', ms: 4800 },
  { title: 'Tricky ones come to you', text: 'Pricing, complaints and anything unusual go straight to a person.', ms: 4800 },
  { title: 'You see which ad makes money', text: 'Not just messages: booked calls, Shopify orders and paying clients, matched to every ad.', ms: 6500 },
]

const COMMENTS = [
  { who: 'priya.k', text: 'price?' },
  { who: 'mike_renos', text: 'do you serve Oakville?' },
  { who: 'sana.home', text: 'details pls' },
  { who: 'jt.cooper', text: 'how long does it take' },
]

const DM = [
  { from: 'ai', text: 'Hi Priya! Happy to help with the 3D design. Which room is it, and when are you hoping to start?' },
  { from: 'them', text: 'kitchen, this spring' },
  { from: 'ai', text: "Lovely. What's your postal code, so I can check we cover your area?" },
  { from: 'them', text: 'L5B' },
]

export function AdFunnelAnimation() {
  const { ref, scene, setScene, playing, still, toggle } = useDemoPlayer(SCENES)
  const reduced = still

  const commentCount = scene === 0 ? 3 : scene === 1 ? 41 : 58
  const current = SCENES[scene]

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
      <div
        className="relative order-2 min-w-0 overflow-hidden rounded-[10px] border border-rule bg-[#f6f5f1] p-4 sm:p-6 lg:order-none"
        aria-hidden="true"
      >
        <div className="grid gap-4 sm:min-h-[380px] sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:gap-6">
          {/* Left: the ad itself */}
          <div className={`mx-auto w-full max-w-[250px] sm:max-w-none ${scene === 5 ? 'hidden sm:block' : ''}`}>
            <AdCard headline={ads[1].headline} comments={commentCount} />
          </div>

          {/* Right: what happens behind it */}
          <div className="relative min-w-0">
            <AnimatePresence mode="popLayout" initial={false}>
              {(scene === 1 || scene === 2) && (
                <motion.div key="comments" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <p className="mono mb-2 text-[11px] text-ink-faint">Comments</p>
                  <ul className="space-y-2">
                  {COMMENTS.map((c, i) => (
                    <motion.li
                      key={c.who}
                      className="rounded-[10px] bg-white px-3 py-2 text-[13px] shadow-[0_1px_0_rgb(0_0_0/0.05)]"
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...springs.smooth, delay: reduced || scene !== 1 ? 0 : 0.2 + i * 0.45 }}
                    >
                      <span className="font-semibold">{c.who}</span> {c.text}
                      {scene === 2 && (
                        <motion.span
                          className="mt-1 block text-[11.5px] text-[#1f7a46]"
                          initial={reduced ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: reduced ? 0 : 0.15 + i * 0.3 }}
                        >
                          ↳ Replied: "Sent you a message 👋"
                        </motion.span>
                      )}
                    </motion.li>
                  ))}
                  </ul>
                </motion.div>
              )}

              {scene === 3 && (
                <motion.div key="dm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <p className="mono mb-2 text-[11px] text-ink-faint">Private message with priya.k</p>
                  <div className="space-y-2">
                    {DM.map((m, i) => (
                      <motion.p
                        key={m.text}
                        className={`max-w-[85%] rounded-[14px] px-3 py-2 text-[13px] leading-snug ${
                          m.from === 'ai' ? 'rounded-bl-[4px] bg-white' : 'ml-auto w-fit rounded-br-[4px] bg-ink text-ground'
                        }`}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.smooth, delay: reduced ? 0 : 0.15 + i * 0.6 }}
                      >
                        {m.text}
                      </motion.p>
                    ))}
                  </div>
                  <motion.div
                    className="mt-3 rounded-[10px] border border-[#9fd0ae] bg-[#e9f4ec] p-3"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springs.gentle, delay: reduced ? 0 : 2.7 }}
                  >
                    <p className="text-[13.5px] font-semibold text-[#17633a]">Booked: Thursday 6:30 pm, free design call</p>
                    <p className="mono mt-0.5 text-[11px] text-ink-soft">kitchen · this spring · Mississauga · from Ad B</p>
                  </motion.div>
                </motion.div>
              )}

              {scene === 4 && (
                <motion.div key="handoff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <p className="mono mb-2 text-[11px] text-ink-faint">Private message with mike_renos</p>
                  <motion.p
                    className="ml-auto w-fit max-w-[85%] rounded-[14px] rounded-br-[4px] bg-ink px-3 py-2 text-[13px] leading-snug text-ground"
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={springs.smooth}
                  >
                    can you beat my other quote by 20%?
                  </motion.p>
                  <motion.div
                    className="mt-3 rounded-[10px] border border-[#f0d39e] bg-[#fbf1df] p-3"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springs.gentle, delay: reduced ? 0 : 0.9 }}
                  >
                    <p className="text-[13.5px] font-semibold text-[#8a5a12]">Handed to you: a pricing question</p>
                    <p className="mt-0.5 text-[12.5px] text-ink-soft">You get a notification with the full chat. The AI never quotes prices.</p>
                  </motion.div>
                </motion.div>
              )}

              {scene === 5 && (
                <motion.div key="funnel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={springs.gentle}>
                  <p className="mono mb-2 text-[11px] text-ink-faint">Last 30 days, by ad</p>
                  <FunnelCompare compact />
                </motion.div>
              )}
            </AnimatePresence>

            {scene === 0 && (
              <p className="mono pt-1 text-[11px] text-ink-faint">Waiting for the first comments…</p>
            )}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="order-1 flex min-w-0 flex-col justify-between gap-5 lg:order-none lg:gap-6">
        <div aria-live="polite">
          <p className="mono text-[11px] text-ink-faint">
            Step {scene + 1} of {SCENES.length}
          </p>
          <motion.div
            key={scene}
            initial={reduced ? false : { opacity: 0.001, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <p className="mt-2 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.1] font-semibold tracking-[-0.02em]">{current.title}</p>
            <p className="mt-3 text-[16px] leading-[1.55] text-ink-soft">{current.text}</p>
          </motion.div>
        </div>
        <DemoControls scenes={SCENES} scene={scene} setScene={setScene} playing={playing} onToggle={toggle} />
      </div>
    </div>
  )
}
