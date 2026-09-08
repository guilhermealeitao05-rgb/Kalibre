import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CountUp } from '../components/CountUp'
import { Disclaimer } from '../components/Disclaimer'
import { PageTransition } from '../motion/PageTransition'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useKalibreStore } from '../store/useKalibreStore'

export function RaioXScreen() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const raioX = useKalibreStore((s) => s.latestRaioX())
  const [scanDone, setScanDone] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    const t = window.setTimeout(() => setScanDone(true), 1200)
    return () => window.clearTimeout(t)
  }, [reducedMotion])

  if (!raioX) {
    navigate('/autoavaliacao', { replace: true })
    return null
  }

  return (
    <PageTransition>
      <div className="flex min-h-svh flex-col px-6 pt-[calc(env(safe-area-inset-top)+28px)] pb-10">
        <p className="mb-2 font-mono-nums text-xs uppercase tracking-[0.25em] text-voltage">Resultado</p>
        <h1 className="mb-8 font-display text-3xl font-extrabold uppercase tracking-tight">Seu raio-X</h1>

        <div className="relative flex-1">
          {!reducedMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 z-10 h-px bg-voltage shadow-[0_0_16px_2px_var(--voltage)]"
              initial={{ top: '0%', opacity: 1 }}
              animate={{ top: '100%', opacity: [1, 1, 0] }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], times: [0, 0.85, 1] }}
            />
          )}

          <div className="flex flex-col gap-4">
            {raioX.leituras.map((leitura, i) => {
              const delay = reducedMotion ? 0 : 0.25 + i * 0.32
              return (
                <motion.div
                  key={leitura.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay }}
                >
                  <Card className="p-5" selected>
                    <p className="mb-2 font-mono-nums text-[11px] uppercase tracking-[0.2em] text-steel">
                      Leitura {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mb-2 font-display text-lg font-bold uppercase tracking-tight">
                      {leitura.titulo}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-steel">{leitura.descricao}</p>
                    <div className="flex items-baseline gap-2 border-t border-line pt-3">
                      <CountUp value={leitura.valorExibido} delay={delay * 1000 + 250} className="text-3xl font-bold text-voltage" />
                      <span className="text-xs uppercase tracking-wide text-steel">{leitura.unidade}</span>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          className="mt-8"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: scanDone ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button fullWidth disabled={!scanDone} onClick={() => navigate('/ajuste')}>
            Ver meus ajustes
          </Button>
          <Disclaimer className="mt-4 text-center" />
        </motion.div>
      </div>
    </PageTransition>
  )
}
