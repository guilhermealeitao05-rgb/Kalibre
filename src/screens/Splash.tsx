import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const TICKS = 14

export function Splash({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const delay = reducedMotion ? 150 : 1150
    const timer = window.setTimeout(onDone, delay)
    return () => window.clearTimeout(timer)
  }, [onDone, reducedMotion])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-ink">
      <motion.h1
        className="font-display text-4xl font-black uppercase tracking-tight text-bone"
        initial={reducedMotion ? false : { opacity: 0, letterSpacing: '0.3em' }}
        animate={{ opacity: 1, letterSpacing: '0.02em' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        Kalibre
      </motion.h1>
      <div className="flex items-end gap-1" aria-hidden>
        {Array.from({ length: TICKS }).map((_, i) => (
          <motion.span
            key={i}
            className="w-[3px] bg-voltage"
            style={{ height: i % 3 === 0 ? 16 : 9 }}
            initial={reducedMotion ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.28,
              ease: [0.34, 1.56, 0.64, 1],
              delay: reducedMotion ? 0 : 0.4 + i * 0.035,
            }}
          />
        ))}
      </div>
    </div>
  )
}
