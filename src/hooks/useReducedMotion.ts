import { useEffect, useState } from 'react'
import { useKalibreStore } from '../store/useKalibreStore'

function systemPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Combines the OS-level preference with the in-app override in Perfil. */
export function useReducedMotion(): boolean {
  const userPref = useKalibreStore((s) => s.user?.reducedMotion ?? false)
  const [systemPref, setSystemPref] = useState(systemPrefersReducedMotion)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setSystemPref(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return systemPref || userPref
}
