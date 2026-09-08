import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { Button } from '../components/Button'
import { IconCheck } from '../components/icons'
import { useKalibreStore } from '../store/useKalibreStore'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { CheckIn as CheckInType } from '../lib/types'

const aderenciaOpcoes: { id: CheckInType['aderencia']; label: string }[] = [
  { id: 'sim', label: 'Sim' },
  { id: 'parcial', label: 'Parcial' },
  { id: 'nao', label: 'Não' },
]

export function CheckIn() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const cycle = useKalibreStore((s) => s.activeCycle())
  const addCheckIn = useKalibreStore((s) => s.addCheckIn)

  const [aderencia, setAderencia] = useState<CheckInType['aderencia'] | null>(null)
  const [energia, setEnergia] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [notas, setNotas] = useState('')
  const [done, setDone] = useState(false)

  if (!cycle) {
    navigate('/home', { replace: true })
    return null
  }

  function handleSubmit() {
    if (!aderencia || !energia || !cycle) return
    addCheckIn({ cycleId: cycle.id, aderencia, energia, notas: notas.trim() || undefined })
    setDone(true)
    window.setTimeout(() => navigate('/home'), reducedMotion ? 400 : 1100)
  }

  if (done) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-ink">
        <motion.div
          initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.6, 1.15, 1], opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-voltage text-ink"
        >
          <IconCheck width={28} height={28} strokeWidth={2.5} />
        </motion.div>
        <p className="font-display text-lg font-bold uppercase tracking-tight">Registrado</p>
      </div>
    )
  }

  return (
    <ScreenShell eyebrow="Leva 20 segundos" title="Como foi hoje?">
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-bone">Você aderiu ao ajuste hoje?</p>
        <div className="flex gap-2">
          {aderenciaOpcoes.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setAderencia(o.id)}
              className={`flex-1 border py-3 text-sm font-medium transition-colors ${
                aderencia === o.id ? 'border-voltage bg-voltage text-ink' : 'border-line-strong text-bone'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-bone">Como estava sua energia no treino?</p>
        <div className="flex justify-between gap-2">
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`Energia ${n} de 5`}
              onClick={() => setEnergia(n)}
              className={`flex h-11 w-11 items-center justify-center border font-mono-nums text-sm transition-colors ${
                energia === n ? 'border-voltage bg-voltage text-ink' : 'border-line-strong text-bone'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="notas" className="mb-3 block text-sm font-medium text-bone">
          Quer registrar algo? (opcional)
        </label>
        <textarea
          id="notas"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          rows={3}
          placeholder="Como você se sentiu hoje..."
          className="w-full resize-none border border-line-strong bg-ink-raised p-3 text-sm text-bone placeholder:text-steel focus-visible:border-voltage"
        />
      </div>

      <Button fullWidth disabled={!aderencia || !energia} onClick={handleSubmit}>
        Registrar
      </Button>
    </ScreenShell>
  )
}
