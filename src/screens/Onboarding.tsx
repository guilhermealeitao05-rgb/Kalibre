import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Ticks } from '../components/Ticks'
import { Disclaimer } from '../components/Disclaimer'
import { PageTransition } from '../motion/PageTransition'
import { useKalibreStore } from '../store/useKalibreStore'
import { useReducedMotion } from '../hooks/useReducedMotion'

const slides = [
  {
    eyebrow: 'O que é',
    title: 'Você já treina. Já come com alguma estrutura. E travou.',
    body: 'O Kalibre não é mais uma dieta pronta nem um contador de calorias. É um instrumento de precisão pra calibrar a alimentação que você já tem — com pequenos ajustes, um de cada vez.',
  },
  {
    eyebrow: 'A promessa',
    title: 'Calibrar, não recomeçar.',
    body: 'Você não precisa de outra dieta. Precisa calibrar a sua. A cada ciclo, um ajuste de alta alavancagem — até destravar o resultado que você já deveria ter.',
  },
  {
    eyebrow: 'Antes de começar',
    title: 'Educação, não prescrição.',
    body: 'O Kalibre organiza princípios e opções — quem decide é você, sobre a sua própria comida. Nunca é uma ordem individual de quanto comer.',
    withDisclaimer: true,
  },
]

export function Onboarding() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const completeOnboarding = useKalibreStore((s) => s.completeOnboarding)
  const reducedMotion = useReducedMotion()
  const slide = slides[step]
  const isLast = step === slides.length - 1

  function handleNext() {
    if (isLast) {
      completeOnboarding()
      navigate('/autoavaliacao')
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <PageTransition>
      <div className="flex min-h-svh flex-col justify-between px-6 pt-[calc(env(safe-area-inset-top)+32px)] pb-10">
        <div>
          <Ticks count={20} className="mb-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reducedMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 font-mono-nums text-xs uppercase tracking-[0.25em] text-voltage">
                {slide.eyebrow}
              </p>
              <h1 className="mb-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-bone">
                {slide.title}
              </h1>
              <p className="text-base leading-relaxed text-steel">{slide.body}</p>
              {slide.withDisclaimer && (
                <div className="mt-6 border border-line-strong bg-ink-raised p-4">
                  <Disclaimer />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <div className="mb-6 flex justify-center gap-2" role="tablist" aria-label="Progresso do onboarding">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-voltage' : 'w-1.5 bg-line-strong'
                }`}
              />
            ))}
          </div>
          <Button fullWidth onClick={handleNext}>
            {isLast ? 'Fazer meu raio-X' : 'Continuar'}
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
