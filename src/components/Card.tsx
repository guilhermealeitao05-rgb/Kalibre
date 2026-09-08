import type { HTMLAttributes, ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tick?: boolean
  selected?: boolean
}

/** Static card: surface elevated from --ink, 1px --line border, calibration tick in the corner. */
export function Card({ children, tick = true, selected = false, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`relative rounded-sm border bg-ink-raised ${
        selected ? 'border-voltage' : 'border-line'
      } ${className}`}
      {...rest}
    >
      {tick && (
        <span
          aria-hidden
          className={`absolute right-2 top-2 h-2 w-2 border-r border-t ${
            selected ? 'border-voltage' : 'border-line-strong'
          }`}
        />
      )}
      {children}
    </div>
  )
}

interface MotionCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  selected?: boolean
}

/** Interactive variant with snap-lock overshoot on select — used by adjustment cards. */
export function SelectableCard({ children, selected = false, className = '', ...rest }: MotionCardProps) {
  return (
    <motion.div
      className={`relative cursor-pointer rounded-sm border bg-ink-raised p-5 ${
        selected ? 'border-voltage' : 'border-line'
      } ${className}`}
      animate={selected ? { scale: [1, 1.03, 1] } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
      {...rest}
    >
      <span
        aria-hidden
        className={`absolute right-2 top-2 h-2 w-2 border-r border-t ${
          selected ? 'border-voltage' : 'border-line-strong'
        }`}
      />
      {children}
    </motion.div>
  )
}
