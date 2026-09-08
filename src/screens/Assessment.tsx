import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressTicks } from '../components/ProgressTicks'
import { Chip } from '../components/Chip'
import { Button } from '../components/Button'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useKalibreStore } from '../store/useKalibreStore'
import { alimentosHabituaisOpcoes, ondeTravaOpcoes } from '../data'
import type { Objetivo, DiaSemana, OndeTrava } from '../lib/types'

const objetivos: { id: Objetivo; label: string; desc: string }[] = [
  { id: 'ganho', label: 'Ganho', desc: 'Construir massa e força' },
  { id: 'manutencao', label: 'Manutenção', desc: 'Manter o que já conquistou' },
  { id: 'definicao', label: 'Definição', desc: 'Reduzir gordura, manter massa' },
]

const dias: { id: DiaSemana; label: string }[] = [
  { id: 'seg', label: 'Seg' },
  { id: 'ter', label: 'Ter' },
  { id: 'qua', label: 'Qua' },
  { id: 'qui', label: 'Qui' },
  { id: 'sex', label: 'Sex' },
  { id: 'sab', label: 'Sáb' },
  { id: 'dom', label: 'Dom' },
]

const TOTAL_STEPS = 5

export function Assessment() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const submitAssessment = useKalibreStore((s) => s.submitAssessment)

  const [step, setStep] = useState(0)
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null)
  const [diasTreino, setDiasTreino] = useState<DiaSemana[]>([])
  const [refeicoesPorDia, setRefeicoesPorDia] = useState<number>(4)
  const [alimentos, setAlimentos] = useState<string[]>([])
  const [ondeTrava, setOndeTrava] = useState<OndeTrava[]>([])

  const canAdvance =
    (step === 0 && objetivo !== null) ||
    (step === 1 && diasTreino.length > 0) ||
    step === 2 ||
    (step === 3 && alimentos.length > 0) ||
    (step === 4 && ondeTrava.length > 0)

  function toggle<T>(list: T[], value: T, setter: (v: T[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
      return
    }
    if (!objetivo) return
    submitAssessment({ objetivo, diasTreino, refeicoesPorDia, alimentosHabituais: alimentos, ondeTrava })
    navigate('/raio-x')
  }

  return (
    <ScreenShell
      eyebrow={`Etapa ${step + 1} de ${TOTAL_STEPS}`}
      onBack={() => (step === 0 ? navigate('/onboarding') : setStep((s) => s - 1))}
    >
      <ProgressTicks total={TOTAL_STEPS} current={step + 1} className="mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <div>
              <h2 className="mb-6 font-display text-2xl font-extrabold uppercase tracking-tight">
                Qual seu objetivo agora?
              </h2>
              <div className="flex flex-col gap-3">
                {objetivos.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setObjetivo(o.id)}
                    className={`flex items-center justify-between border p-5 text-left transition-colors ${
                      objetivo === o.id ? 'border-voltage bg-ink-raised' : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <span>
                      <span className="block font-display text-lg font-bold uppercase">{o.label}</span>
                      <span className="block text-sm text-steel">{o.desc}</span>
                    </span>
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        objetivo === o.id ? 'border-voltage bg-voltage' : 'border-steel'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="mb-2 font-display text-2xl font-extrabold uppercase tracking-tight">
                Em que dias você treina?
              </h2>
              <p className="mb-6 text-sm text-steel">Escolha todos que se aplicam.</p>
              <div className="flex flex-wrap gap-2">
                {dias.map((d) => (
                  <Chip key={d.id} selected={diasTreino.includes(d.id)} onClick={() => toggle(diasTreino, d.id, setDiasTreino)}>
                    {d.label}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-2 font-display text-2xl font-extrabold uppercase tracking-tight">
                Quantas refeições por dia?
              </h2>
              <p className="mb-8 text-sm text-steel">Sua média num dia comum.</p>
              <div className="flex items-center justify-center gap-8">
                <button
                  type="button"
                  aria-label="Diminuir"
                  onClick={() => setRefeicoesPorDia((n) => Math.max(2, n - 1))}
                  className="flex h-12 w-12 items-center justify-center border border-line-strong text-2xl"
                >
                  −
                </button>
                <span className="font-mono-nums text-5xl font-bold text-voltage">{refeicoesPorDia}</span>
                <button
                  type="button"
                  aria-label="Aumentar"
                  onClick={() => setRefeicoesPorDia((n) => Math.min(8, n + 1))}
                  className="flex h-12 w-12 items-center justify-center border border-line-strong text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-2 font-display text-2xl font-extrabold uppercase tracking-tight">
                O que costuma comer?
              </h2>
              <p className="mb-6 text-sm text-steel">Escolha tudo que faz parte da sua rotina hoje.</p>
              <div className="flex flex-wrap gap-2">
                {alimentosHabituaisOpcoes.map((a) => (
                  <Chip key={a} selected={alimentos.includes(a)} onClick={() => toggle(alimentos, a, setAlimentos)}>
                    {a}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="mb-2 font-display text-2xl font-extrabold uppercase tracking-tight">
                Onde você sente que trava?
              </h2>
              <p className="mb-6 text-sm text-steel">Escolha o que mais pesa na sua rotina.</p>
              <div className="flex flex-col gap-2">
                {ondeTravaOpcoes.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => toggle(ondeTrava, o.id as OndeTrava, setOndeTrava)}
                    className={`flex items-center justify-between border p-4 text-left text-sm transition-colors ${
                      ondeTrava.includes(o.id as OndeTrava)
                        ? 'border-voltage bg-ink-raised'
                        : 'border-line hover:border-line-strong'
                    }`}
                  >
                    {o.label}
                    <span
                      className={`h-3.5 w-3.5 shrink-0 border ${
                        ondeTrava.includes(o.id as OndeTrava) ? 'border-voltage bg-voltage' : 'border-steel'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10">
        <Button fullWidth disabled={!canAdvance} onClick={handleNext}>
          {step === TOTAL_STEPS - 1 ? 'Ver meu raio-X' : 'Continuar'}
        </Button>
      </div>
    </ScreenShell>
  )
}
