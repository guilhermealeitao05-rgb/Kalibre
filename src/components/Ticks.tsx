interface TicksProps {
  count?: number
  className?: string
}

/** Decorative ruler — a recurring calibration motif used under headers and dividers. */
export function Ticks({ count = 24, className = '' }: TicksProps) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-px bg-line-strong"
          style={{ height: i % 4 === 0 ? '8px' : '4px' }}
        />
      ))}
    </div>
  )
}
