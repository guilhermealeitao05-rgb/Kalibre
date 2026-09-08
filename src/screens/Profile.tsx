import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Disclaimer } from '../components/Disclaimer'
import { useKalibreStore } from '../store/useKalibreStore'

const objetivoLabel: Record<string, string> = {
  ganho: 'Ganho',
  manutencao: 'Manutenção',
  definicao: 'Definição',
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
        checked ? 'border-voltage bg-voltage' : 'border-line-strong bg-transparent'
      }`}
    >
      <motion.span
        className={`absolute top-0.5 h-4 w-4 rounded-full ${checked ? 'bg-ink' : 'bg-steel'}`}
        animate={{ left: checked ? 22 : 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </button>
  )
}

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-bone">{label}</p>
        {description && <p className="mt-0.5 text-xs text-steel">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export function Profile() {
  const navigate = useNavigate()
  const user = useKalibreStore((s) => s.user)
  const toggleReducedMotion = useKalibreStore((s) => s.toggleReducedMotion)
  const toggleLembretes = useKalibreStore((s) => s.toggleLembretes)
  const setSubscriber = useKalibreStore((s) => s.setSubscriber)
  const reset = useKalibreStore((s) => s.reset)
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <ScreenShell withTabBar eyebrow="Configurações" title="Perfil">
      <Card className="mb-6 p-5" tick={false}>
        <p className="mb-1 font-mono-nums text-[11px] uppercase tracking-[0.2em] text-steel">Seu perfil</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div>
            <p className="font-display text-xl font-bold uppercase text-voltage">
              {user ? objetivoLabel[user.objetivo] : '—'}
            </p>
            <p className="text-xs text-steel">Objetivo</p>
          </div>
          <div>
            <p className="font-mono-nums text-xl font-bold text-bone">{user?.refeicoesPorDia ?? '—'}</p>
            <p className="text-xs text-steel">Refeições/dia</p>
          </div>
          <div>
            <p className="font-mono-nums text-xl font-bold text-bone">{user?.treinos.length ?? 0}</p>
            <p className="text-xs text-steel">Treinos/semana</p>
          </div>
        </div>
      </Card>

      <section className="mb-6 border-t border-line">
        <h2 className="mb-1 mt-4 text-xs font-bold uppercase tracking-wide text-steel">Preferências</h2>
        <Row label="Lembretes" description="Avisos leves de check-in">
          <Toggle checked={user?.lembretesAtivos ?? true} onChange={toggleLembretes} label="Ativar lembretes" />
        </Row>
        <Row label="Reduzir movimento" description="Troca animações por transições curtas">
          <Toggle checked={user?.reducedMotion ?? false} onChange={toggleReducedMotion} label="Reduzir movimento" />
        </Row>
        <Row label="Tema" description="Dark-first é a assinatura visual do Kalibre">
          <span className="rounded-full border border-line-strong px-3 py-1 text-xs text-steel">Escuro</span>
        </Row>
      </section>

      <section className="mb-6 border-t border-line">
        <h2 className="mb-1 mt-4 text-xs font-bold uppercase tracking-wide text-steel">Assinatura</h2>
        <Row
          label={user?.isSubscriber ? 'Plano ativo' : 'Sem assinatura'}
          description={user?.isSubscriber ? 'Você tem acesso ao loop completo' : 'Acesso limitado ao MVP'}
        >
          {user?.isSubscriber ? (
            <button
              type="button"
              onClick={() => setSubscriber(false)}
              className="text-xs font-medium text-danger underline underline-offset-2"
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/paywall')}
              className="text-xs font-medium text-voltage underline underline-offset-2"
            >
              Assinar
            </button>
          )}
        </Row>
      </section>

      <section className="mb-8 border-t border-line pt-4">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-steel">Sobre</h2>
        <Disclaimer className="mb-3" />
        <p className="text-xs leading-relaxed text-steel">
          Kalibre — calibre sua alimentação. Todo o conteúdo é educativo e elaborado com base em princípios gerais de
          nutrição esportiva, sem fazer prescrição individual.
        </p>
      </section>

      <div className="border-t border-line pt-5">
        {!confirmReset ? (
          <Button variant="ghost" onClick={() => setConfirmReset(true)}>
            Apagar meus dados
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-steel">Isso apaga ciclos, check-ins e histórico deste dispositivo. Não dá pra desfazer.</p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  reset()
                  navigate('/onboarding')
                }}
              >
                Confirmar
              </Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </ScreenShell>
  )
}
