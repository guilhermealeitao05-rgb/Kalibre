import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenShell } from '../components/ScreenShell'
import { Button } from '../components/Button'
import { IconCheck, IconClose } from '../components/icons'
import { useKalibreStore } from '../store/useKalibreStore'

const beneficios = [
  'Loop completo: raio-X, ajustes, semanas calibradas e reavaliações sem limite',
  'Biblioteca inteira de ajustes, trocas e micro-aulas',
  'Histórico ilimitado — todo ciclo que você já testou, guardado',
  'Lembretes de check-in personalizados',
]

type Plano = 'mensal' | 'anual'

export function Paywall() {
  const navigate = useNavigate()
  const setSubscriber = useKalibreStore((s) => s.setSubscriber)
  const [plano, setPlano] = useState<Plano>('anual')

  function handleAssinar() {
    setSubscriber(true)
    navigate(-1)
  }

  return (
    <ScreenShell
      headerRight={
        <button type="button" onClick={() => navigate(-1)} aria-label="Fechar" className="text-steel">
          <IconClose />
        </button>
      }
    >
      <p className="mb-2 font-mono-nums text-xs uppercase tracking-[0.25em] text-voltage">Assinatura</p>
      <h1 className="mb-3 font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight">
        Desbloqueie o loop completo
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-steel">
        Sem pegadinha: você vê exatamente o que recebe, cancela quando quiser.
      </p>

      <ul className="mb-8 flex flex-col gap-3">
        {beneficios.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-voltage text-ink">
              <IconCheck width={12} height={12} strokeWidth={3} />
            </span>
            <span className="text-sm leading-relaxed text-bone">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mb-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setPlano('anual')}
          className={`relative border p-4 text-left transition-colors ${
            plano === 'anual' ? 'border-voltage bg-ink-raised' : 'border-line-strong'
          }`}
        >
          <span className="absolute -top-2.5 right-4 bg-voltage px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
            Economize 44%
          </span>
          <div className="flex items-center justify-between">
            <span>
              <span className="block font-display font-bold uppercase">Anual</span>
              <span className="block text-xs text-steel">R$ 16,60/mês, cobrado anualmente</span>
            </span>
            <span className="font-mono-nums text-xl font-bold text-voltage">R$199,90</span>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setPlano('mensal')}
          className={`border p-4 text-left transition-colors ${
            plano === 'mensal' ? 'border-voltage bg-ink-raised' : 'border-line-strong'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>
              <span className="block font-display font-bold uppercase">Mensal</span>
              <span className="block text-xs text-steel">Cobrado todo mês</span>
            </span>
            <span className="font-mono-nums text-xl font-bold text-bone">R$29,90</span>
          </div>
        </button>
      </div>

      <Button fullWidth onClick={handleAssinar}>
        Assinar plano {plano}
      </Button>
      <p className="mt-4 text-center text-xs text-steel">Cancele quando quiser, direto no seu perfil.</p>
    </ScreenShell>
  )
}
