import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { SelectableCard } from '../components/Card'
import { Button } from '../components/Button'
import { IconCheck } from '../components/icons'
import { useKalibreStore } from '../store/useKalibreStore'
import { suggestAdjustments } from '../engine/suggestAdjustments'

export function AdjustmentPick() {
  const navigate = useNavigate()
  const raioX = useKalibreStore((s) => s.latestRaioX())
  const assessment = useKalibreStore((s) => s.assessments[s.assessments.length - 1])
  const startCycle = useKalibreStore((s) => s.startCycle)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [duracao, setDuracao] = useState<14 | 21>(14)

  const candidates = useMemo(() => {
    if (!raioX || !assessment) return []
    return suggestAdjustments(raioX.leituras, assessment)
  }, [raioX, assessment])

  if (!raioX || !assessment) {
    navigate('/autoavaliacao', { replace: true })
    return null
  }

  function handleConfirm() {
    if (!selectedId) return
    startCycle(selectedId, duracao)
    navigate('/home')
  }

  return (
    <ScreenShell eyebrow="Escolha um" title="Ajuste da vez" showDisclaimer>
      <p className="mb-6 text-sm leading-relaxed text-steel">
        Escolha UM ajuste. Um de cada vez é o que faz resultado acontecer.
      </p>

      <div className="flex flex-col gap-3">
        {candidates.map((adj) => {
          const selected = selectedId === adj.id
          const dimmed = selectedId !== null && !selected
          return (
            <motion.div key={adj.id} animate={{ opacity: dimmed ? 0.45 : 1, scale: dimmed ? 0.98 : 1 }} transition={{ duration: 0.25 }}>
              <SelectableCard
                selected={selected}
                onClick={() => setSelectedId(adj.id)}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedId(adj.id)
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-bold uppercase tracking-tight">{adj.titulo}</h2>
                  {selected && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-voltage text-ink">
                      <IconCheck width={14} height={14} strokeWidth={2.5} />
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-steel">{adj.porque}</p>
              </SelectableCard>
            </motion.div>
          )
        })}
      </div>

      {selectedId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 border border-line-strong bg-ink-raised p-4"
        >
          <p className="mb-3 text-sm font-medium text-bone">Duração do ciclo</p>
          <div className="flex gap-2">
            {([14, 21] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuracao(d)}
                className={`flex-1 border py-3 text-center font-mono-nums text-sm transition-colors ${
                  duracao === d ? 'border-voltage bg-voltage text-ink' : 'border-line-strong text-bone'
                }`}
              >
                {d} dias
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mt-8">
        <Button fullWidth disabled={!selectedId} onClick={handleConfirm}>
          Travar este ajuste
        </Button>
      </div>
    </ScreenShell>
  )
}
