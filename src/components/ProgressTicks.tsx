import { motion } from 'framer-motion'

interface ProgressTicksProps {
  total: number
  current: number
  className?: string
}

/** Step progress bar rendered as ticks that fill in — used in the guided assessment. */
export function ProgressTicks({ total, current, className = '' }: ProgressTicksProps) {
  return (
    <div
      className={`flex gap-1.5 ${className}`}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Etapa ${current} de ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current
        return (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full bg-voltage"
              initial={false}
              animate={{ scaleX: done ? 1 : 0 }}
              style={{ transformOrigin: 'left', originX: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        )
      })}
    </div>
  )
}
