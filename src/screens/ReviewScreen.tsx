import { useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { Gauge } from '../components/Gauge'
import { CountUp } from '../components/CountUp'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { useKalibreStore } from '../store/useKalibreStore'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getAdjustmentById } from '../data'

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]

export function ReviewScreen() {
  const { cycleId } = useParams<{ cycleId: string }>()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  const cycle = useKalibreStore((s) => s.cycles.find((c) => c.id === cycleId))
  const existingReview = useKalibreStore((s) => s.reviews.find((r) => r.cycleId === cycleId))
  const completeCycle = useKalibreStore((s) => s.completeCycle)
  const startCycle = useKalibreStore((s) => s.startCycle)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    if (cycle && !existingReview && cycleId) {
      ran.current = true
      completeCycle(cycleId)
    }
  }, [cycle, existingReview, cycleId, completeCycle])

  const review = useKalibreStore((s) => s.reviews.find((r) => r.cycleId === cycleId))
  const adjustment = cycle ? getAdjustmentById(cycle.adjustmentId) : undefined
  const proximo = review?.proximoSugeridoId ? getAdjustmentById(review.proximoSugeridoId) : undefined

  const sentences = useMemo(() => {
    if (!review) return []
    return review.aprendizado.split(/(?<=[.!?])\s+/).filter(Boolean)
  }, [review])

  if (!cycle) {
    navigate('/home', { replace: true })
    return null
  }

  function handleNextCycle() {
    if (!proximo || !cycle) return
    startCycle(proximo.id, cycle.duracaoDias)
    navigate('/home')
  }

  return (
    <ScreenShell eyebrow="Ciclo fechado" title="Sua reavaliação" showDisclaimer>
      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <Gauge
            progress={review ? review.aderenciaMedia / 100 : 0}
            size={190}
            label="Aderência do ciclo"
            center={
              review && (
                <>
                  <CountUp value={review.aderenciaMedia} suffix="%" className="text-4xl font-bold text-voltage" duration={1100} />
                  <span className="text-[10px] uppercase tracking-wide text-steel">aderência</span>
                </>
              )
            }
          />
          {!reducedMotion &&
            review &&
            PARTICLE_ANGLES.map((angle, i) => {
              const rad = (angle * Math.PI) / 180
              return (
                <motion.span
                  key={angle}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-voltage"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos(rad) * 100,
                    y: Math.sin(rad) * 100,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5],
                  }}
                  transition={{ duration: 0.9, delay: 1.1 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                />
              )
            })}
        </div>
      </div>

      {adjustment && (
        <p className="mb-2 text-center font-mono-nums text-[11px] uppercase tracking-[0.2em] text-steel">
          Ajuste testado: {adjustment.titulo}
        </p>
      )}

      <Card className="mb-8 p-5" tick={false}>
        <p className="mb-3 font-mono-nums text-[11px] uppercase tracking-[0.2em] text-voltage">O que você aprendeu</p>
        <div className="flex flex-col gap-2">
          {sentences.map((s, i) => (
            <motion.p
              key={i}
              className="text-sm leading-relaxed text-bone"
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: reducedMotion ? 0 : 1.3 + i * 0.28 }}
            >
              {s}
            </motion.p>
          ))}
        </div>
      </Card>

      {proximo && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.3 + sentences.length * 0.28 + 0.2 }}
        >
          <p className="mb-3 text-sm text-steel">Próximo ajuste sugerido</p>
          <Card className="mb-5 p-5" selected>
            <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-tight">{proximo.titulo}</h3>
            <p className="text-sm text-steel">{proximo.porque}</p>
          </Card>
          <div className="flex flex-col gap-2">
            <Button fullWidth onClick={handleNextCycle}>
              Começar próximo ciclo
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate('/historico')}>
              Ver histórico completo
            </Button>
          </div>
        </motion.div>
      )}
    </ScreenShell>
  )
}
