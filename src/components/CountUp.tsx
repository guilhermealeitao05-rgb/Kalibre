import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CountUpProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  className?: string
  delay?: number
}

export function CountUp({ value, duration = 900, decimals = 0, suffix = '', className, delay = 0 }: CountUpProps) {
  const [display, setDisplay] = useState(0)
  const reducedMotion = useReducedMotion()
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value)
      return
    }

    let start: number | null = null
    let timeoutId: number | undefined

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) {
        frame.current = requestAnimationFrame(step)
      }
    }

    timeoutId = window.setTimeout(() => {
      frame.current = requestAnimationFrame(step)
    }, delay)

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [value, duration, delay, reducedMotion])

  return (
    <span className={`font-mono-nums ${className ?? ''}`}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
