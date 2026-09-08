import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconArrowRight } from './icons'
import { Disclaimer } from './Disclaimer'

interface ScreenShellProps {
  children: ReactNode
  title?: string
  eyebrow?: string
  onBack?: () => void
  withTabBar?: boolean
  showDisclaimer?: boolean
  className?: string
  headerRight?: ReactNode
}

export function ScreenShell({
  children,
  title,
  eyebrow,
  onBack,
  withTabBar = false,
  showDisclaimer = false,
  className = '',
  headerRight,
}: ScreenShellProps) {
  const navigate = useNavigate()

  return (
    <div
      className={`mx-auto flex min-h-svh w-full max-w-md flex-col px-5 pt-[calc(env(safe-area-inset-top)+20px)] ${
        withTabBar ? 'pb-28' : 'pb-10'
      } ${className}`}
    >
      {(title || onBack) && (
        <header className="mb-6 flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={() => (onBack ? onBack() : navigate(-1))}
              aria-label="Voltar"
              className="flex h-9 w-9 items-center justify-center border border-line-strong text-bone"
            >
              <IconArrowRight className="rotate-180" width={16} height={16} />
            </button>
          )}
          <div className="flex-1">
            {eyebrow && (
              <p className="font-mono-nums text-xs uppercase tracking-[0.2em] text-steel">{eyebrow}</p>
            )}
            {title && <h1 className="font-display text-xl font-extrabold uppercase tracking-tight">{title}</h1>}
          </div>
          {headerRight}
        </header>
      )}
      <div className="flex-1">{children}</div>
      {showDisclaimer && <Disclaimer className="mt-8" />}
    </div>
  )
}
