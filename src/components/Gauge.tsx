import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface GaugeProps {
  progress: number // 0..1
  size?: number
  label?: string
  center?: ReactNode
  tone?: 'voltage' | 'bone'
}

const TICK_COUNT = 40

export function Gauge({ progress, size = 220, label, center, tone = 'voltage' }: GaugeProps) {
  const reducedMotion = useReducedMotion()
  const clamped = Math.max(0, Math.min(1, progress))
  const radius = size / 2 - 14
  const circumference = 2 * Math.PI * radius
  const strokeColor = tone === 'voltage' ? 'var(--voltage)' : 'var(--bone)'

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
        {Array.from({ length: TICK_COUNT }).map((_, i) => {
          const angle = (i / TICK_COUNT) * 360
          const isMajor = i % 5 === 0
          const r1 = size / 2 - 4
          const r2 = isMajor ? size / 2 - 10 : size / 2 - 7
          const rad = (angle * Math.PI) / 180
          const cx = size / 2
          const cy = size / 2
          return (
            <line
              key={i}
              x1={cx + r1 * Math.cos(rad)}
              y1={cy + r1 * Math.sin(rad)}
              x2={cx + r2 * Math.cos(rad)}
              y2={cy + r2 * Math.sin(rad)}
              stroke="var(--line-strong)"
              strokeWidth={isMajor ? 1.5 : 1}
            />
          )
        })}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth={4}
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clamped) }}
          transition={
            reducedMotion
              ? { duration: 0.01 }
              : { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
          }
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
        {center}
      </div>
    </div>
  )
}
