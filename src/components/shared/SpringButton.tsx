import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { springs } from './springs'

/* The main call-to-action link: lifts a pixel on hover and presses in on tap, on a snappy spring. */
export function SpringButton({
  href,
  children,
  onClick,
  size = 'md',
  tone = 'dark',
  className = '',
}: {
  href: string
  children: ReactNode
  onClick?: () => void
  size?: 'md' | 'sm'
  tone?: 'dark' | 'light'
  className?: string
}) {
  const sizing = size === 'sm' ? 'px-4 py-2 text-[14px]' : 'px-5 py-3 text-[15px]'
  const colours = tone === 'light' ? 'bg-ground text-ink hover:bg-white' : 'bg-ink text-ground hover:bg-black'
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.96 }}
      transition={springs.snappy}
      className={`inline-block rounded-full ${colours} ${sizing} font-medium shadow-[0_1px_0_rgb(0_0_0/0.1),0_8px_20px_-10px_rgb(0_0_0/0.5)] ${className}`}
    >
      {children}
    </motion.a>
  )
}
