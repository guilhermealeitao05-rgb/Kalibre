import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { Gauge } from '../components/Gauge'
import { CountUp } from '../components/CountUp'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { IconCart, IconClose, IconTrain, IconRest, IconCheck } from '../components/icons'
import { useKalibreStore } from '../store/useKalibreStore'
import { getAdjustmentById } from '../data'
import { buildWeekPlan, buildShoppingList, diaLabel } from '../engine/week'
import type { ShoppingListItem, DiaSemana } from '../lib/types'

const hoje: DiaSemana[] = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

export function Home() {
  const navigate = useNavigate()
  const user = useKalibreStore((s) => s.user)
  const cycle = useKalibreStore((s) => s.activeCycle())
  const assessment = useKalibreStore((s) => s.assessments[s.assessments.length - 1])
  const [showList, setShowList] = useState(false)
  const [items, setItems] = useState<ShoppingListItem[]>([])

  const adjustment = cycle ? getAdjustmentById(cycle.adjustmentId) : undefined
  const todayKey = hoje[new Date().getDay()]

  const progress = useMemo(() => {
    if (!cycle) return { fraction: 0, diasRestantes: 0, diasPassados: 0 }
    const inicio = new Date(cycle.inicio).getTime()
    const fim = new Date(cycle.fim).getTime()
    const now = Date.now()
    const fraction = Math.max(0, Math.min(1, (now - inicio) / (fim - inicio)))
    const diasRestantes = Math.max(0, Math.ceil((fim - now) / 86_400_000))
    const diasPassados = cycle.duracaoDias - diasRestantes
    return { fraction, diasRestantes, diasPassados }
  }, [cycle])

  const weekPlan = useMemo(() => {
    const dias = user?.treinos.map((t) => t.dia) ?? []
    return buildWeekPlan(dias, adjustment)
  }, [user, adjustment])

  function openShoppingList() {
    setItems(buildShoppingList(assessment?.alimentosHabituais ?? []))
    setShowList(true)
  }

  if (!cycle || !adjustment) {
    return (
      <ScreenShell withTabBar title="Kalibre">
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong">
            <IconTrain className="text-steel" />
          </div>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">Nenhum ciclo ativo</h2>
          <p className="max-w-xs text-sm text-steel">
            Faça seu raio-X e escolha um ajuste pra começar a calibrar sua semana.
          </p>
          <Button onClick={() => navigate('/autoavaliacao')} className="mt-2">
            Iniciar um ciclo
          </Button>
        </div>
      </ScreenShell>
    )
  }

  const cycleEnded = progress.diasRestantes <= 0

  return (
    <ScreenShell withTabBar showDisclaimer eyebrow="Semana calibrada" title="Kalibre">
      <div className="mb-8 flex items-center gap-6 border border-line bg-ink-raised p-5">
        <Gauge
          progress={progress.fraction}
          size={110}
          label="Progresso do ciclo"
          center={
            <>
              <CountUp value={progress.diasRestantes} className="text-2xl font-bold text-voltage" />
              <span className="text-[10px] uppercase tracking-wide text-steel">dias restantes</span>
            </>
          }
        />
        <div className="min-w-0">
          <p className="mb-1 font-mono-nums text-[11px] uppercase tracking-[0.2em] text-steel">Ajuste ativo</p>
          <h2 className="font-display text-lg font-bold uppercase leading-tight tracking-tight">{adjustment.titulo}</h2>
          <p className="mt-1 text-xs text-steel">Ciclo de {cycle.duracaoDias} dias</p>
        </div>
      </div>

      {cycleEnded && (
        <div className="mb-6 border border-voltage bg-ink-raised p-4">
          <p className="mb-3 text-sm text-bone">Seu ciclo chegou ao fim. Hora de ver o que você aprendeu.</p>
          <Button fullWidth onClick={() => navigate(`/reavaliacao/${cycle.id}`)}>
            Fechar ciclo
          </Button>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-3 font-mono-nums text-[11px] uppercase tracking-[0.2em] text-steel">Sua semana</p>
        <div className="grid grid-cols-7 gap-1.5">
          {weekPlan.map((d) => (
            <div
              key={d.dia}
              className={`flex flex-col items-center gap-1.5 border p-2 text-center ${
                d.dia === todayKey ? 'border-voltage' : 'border-line'
              }`}
            >
              <span className="font-mono-nums text-[10px] uppercase text-steel">{diaLabel[d.dia].slice(0, 3)}</span>
              {d.temTreino ? <IconTrain width={16} height={16} className="text-voltage" /> : <IconRest width={16} height={16} className="text-steel" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={openShoppingList}
          className="flex flex-col items-start gap-3 border border-line-strong p-4 text-left transition-colors hover:border-voltage"
        >
          <IconCart className="text-voltage" />
          <span className="font-display text-sm font-bold uppercase tracking-tight">Lista de compras</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/checkin')}
          className="flex flex-col items-start gap-3 border border-line-strong p-4 text-left transition-colors hover:border-voltage"
        >
          <IconCheck className="text-voltage" />
          <span className="font-display text-sm font-bold uppercase tracking-tight">Check-in de hoje</span>
        </button>
      </div>

      <Card className="p-5" tick={false}>
        <p className="mb-2 font-mono-nums text-[11px] uppercase tracking-[0.2em] text-steel">Por quê</p>
        <p className="text-sm leading-relaxed text-bone">{adjustment.porque}</p>
      </Card>

      <AnimatePresence>
        {showList && (
          <ShoppingListSheet items={items} setItems={setItems} onClose={() => setShowList(false)} />
        )}
      </AnimatePresence>
    </ScreenShell>
  )
}

function ShoppingListSheet({
  items,
  setItems,
  onClose,
}: {
  items: ShoppingListItem[]
  setItems: (items: ShoppingListItem[]) => void
  onClose: () => void
}) {
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-end justify-center" role="dialog" aria-modal="true" aria-label="Lista de compras">
      <motion.div
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 max-h-[80svh] w-full max-w-md overflow-y-auto rounded-t-lg border-t border-line-strong bg-ink p-6 pb-10"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 420, damping: 38 }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-tight">Lista de compras</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="text-steel">
            <IconClose />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() =>
                  setItems(items.map((i) => (i.id === item.id ? { ...i, marcado: !i.marcado } : i)))
                }
                className={`flex w-full items-center justify-between border p-3 text-left transition-colors ${
                  item.marcado ? 'border-line bg-ink-raised text-steel line-through' : 'border-line-strong text-bone'
                }`}
              >
                <span>
                  <span className="block text-sm font-medium">{item.nome}</span>
                  <span className="block text-xs text-steel">{item.quantidadeSugerida}</span>
                </span>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                    item.marcado ? 'border-voltage bg-voltage text-ink' : 'border-steel'
                  }`}
                >
                  {item.marcado && <IconCheck width={12} height={12} strokeWidth={3} />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
