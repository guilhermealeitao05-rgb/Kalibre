import { motion, type HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ChipProps extends HTMLMotionProps<'button'> {
  selected?: boolean
}

export function Chip({ selected = false, className = '', children, ...rest }: ChipProps) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
        selected
          ? 'border-voltage bg-voltage text-ink'
          : 'border-line-strong bg-transparent text-bone hover:border-bone'
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
