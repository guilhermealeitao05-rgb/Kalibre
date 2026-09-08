import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { CountUp } from '../components/CountUp'
import { useKalibreStore } from '../store/useKalibreStore'
import { getAdjustmentById } from '../data'
import { useReducedMotion } from '../hooks/useReducedMotion'

const statusLabel: Record<string, string> = {
  ativo: 'Em andamento',
  concluido: 'Concluído',
  abandonado: 'Abandonado',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function History() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const cycles = useKalibreStore((s) => s.cycles)
  const reviews = useKalibreStore((s) => s.reviews)

  const sorted = useMemo(() => [...cycles].sort((a, b) => new Date(b.inicio).getTime() - new Date(a.inicio).getTime()), [cycles])

  if (sorted.length === 0) {
    return (
      <ScreenShell withTabBar eyebrow="Seu ativo de retenção" title="Histórico">
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="max-w-xs text-sm text-steel">
            Cada ciclo que você fechar entra aqui — o registro do que funcionou pra você.
          </p>
        </div>
      </ScreenShell>
    )
  }

  return (
    <ScreenShell withTabBar eyebrow={`${sorted.length} ciclo${sorted.length > 1 ? 's' : ''} registrado${sorted.length > 1 ? 's' : ''}`} title="Histórico">
      <div className="relative pl-6">
        <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line-strong" aria-hidden />
        <div className="flex flex-col gap-8">
          {sorted.map((cycle, i) => {
            const adjustment = getAdjustmentById(cycle.adjustmentId)
            const review = reviews.find((r) => r.cycleId === cycle.id)
            return (
              <motion.div
                key={cycle.id}
                className="relative"
                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <span
                  className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                    cycle.status === 'concluido' ? 'border-voltage bg-voltage' : 'border-steel bg-ink'
                  }`}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => cycle.status === 'ativo' ? navigate('/home') : navigate(`/reavaliacao/${cycle.id}`)}
                  className="w-full border border-line bg-ink-raised p-4 text-left transition-colors hover:border-line-strong"
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="font-mono-nums text-[11px] uppercase tracking-wide text-steel">
                      {formatDate(cycle.inicio)} — {formatDate(cycle.fim)}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide ${
                        cycle.status === 'concluido' ? 'text-voltage' : 'text-steel'
                      }`}
                    >
                      {statusLabel[cycle.status]}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-base font-bold uppercase tracking-tight">
                    {adjustment?.titulo ?? 'Ajuste'}
                  </h3>
                  {review ? (
                    <>
                      <div className="mb-2 flex items-baseline gap-1.5">
                        <CountUp value={review.aderenciaMedia} suffix="%" className="text-lg font-bold text-voltage" />
                        <span className="text-xs text-steel">de aderência</span>
                      </div>
                      <p className="text-sm leading-relaxed text-steel">{review.aprendizado}</p>
                    </>
                  ) : (
                    <p className="text-sm text-steel">Ciclo ainda em andamento.</p>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </ScreenShell>
  )
}
