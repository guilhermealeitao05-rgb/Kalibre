import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className = '', children, ...rest }, ref) => {
    const reducedMotion = useReducedMotion()

    const base =
      'inline-flex items-center justify-center gap-2 rounded font-display font-extrabold uppercase tracking-wide text-sm px-6 py-4 transition-colors disabled:opacity-40 disabled:pointer-events-none'

    const variants: Record<string, string> = {
      primary: 'bg-voltage text-ink hover:bg-[color-mix(in_srgb,var(--voltage)_85%,white)]',
      secondary: 'bg-transparent text-bone border border-line-strong hover:border-voltage',
      ghost: 'bg-transparent text-steel hover:text-bone',
    }

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        whileTap={reducedMotion ? undefined : { scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        {...rest}
      >
        {children}
      </motion.button>
    )
  },
)
Button.displayName = 'Button'
