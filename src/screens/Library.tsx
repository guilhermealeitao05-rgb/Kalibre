import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ScreenShell } from '../components/ScreenShell'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'
import { IconSearch, IconArrowRight } from '../components/icons'
import { adjustments, trocas, aulas } from '../data'
import type { Objetivo } from '../lib/types'

type Tab = 'ajustes' | 'trocas' | 'aulas'

const objetivoFiltros: { id: Objetivo | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'ganho', label: 'Ganho' },
  { id: 'manutencao', label: 'Manutenção' },
  { id: 'definicao', label: 'Definição' },
]

export function Library() {
  const [tab, setTab] = useState<Tab>('ajustes')
  const [query, setQuery] = useState('')
  const [objetivo, setObjetivo] = useState<Objetivo | 'todos'>('todos')
  const [expanded, setExpanded] = useState<string | null>(null)

  const q = query.trim().toLowerCase()

  const filteredAjustes = useMemo(
    () =>
      adjustments.filter((a) => {
        const matchesQuery = !q || a.titulo.toLowerCase().includes(q) || a.porque.toLowerCase().includes(q)
        const matchesObjetivo = objetivo === 'todos' || a.objetivos.includes(objetivo)
        return matchesQuery && matchesObjetivo
      }),
    [q, objetivo],
  )

  const filteredTrocas = useMemo(
    () => trocas.filter((t) => !q || t.de.toLowerCase().includes(q) || t.para.toLowerCase().includes(q)),
    [q],
  )

  const filteredAulas = useMemo(() => aulas.filter((a) => !q || a.titulo.toLowerCase().includes(q)), [q])

  return (
    <ScreenShell withTabBar showDisclaimer eyebrow="Explore quando quiser" title="Biblioteca">
      <div className="mb-4 flex items-center gap-2 border border-line-strong bg-ink-raised px-3 py-2.5">
        <IconSearch width={16} height={16} className="text-steel" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ajustes, trocas, aulas..."
          aria-label="Buscar na biblioteca"
          className="w-full bg-transparent text-sm text-bone placeholder:text-steel focus:outline-none"
        />
      </div>

      <div className="mb-5 flex gap-2 border-b border-line pb-4">
        {(['ajustes', 'trocas', 'aulas'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 border-b-2 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              tab === t ? 'border-voltage text-voltage' : 'border-transparent text-steel'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'ajustes' && (
        <div className="mb-4 flex flex-wrap gap-2">
          {objetivoFiltros.map((o) => (
            <Chip key={o.id} selected={objetivo === o.id} onClick={() => setObjetivo(o.id)}>
              {o.label}
            </Chip>
          ))}
        </div>
      )}

      {tab === 'ajustes' && (
        <div className="flex flex-col gap-3">
          {filteredAjustes.map((a) => {
            const isOpen = expanded === a.id
            return (
              <Card key={a.id} tick={false} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : a.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold uppercase tracking-tight">{a.titulo}</span>
                  <IconArrowRight width={16} height={16} className={`shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-line px-4 pb-4 pt-3"
                  >
                    <p className="mb-3 text-sm leading-relaxed text-steel">{a.porque}</p>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-bone">Como testar</p>
                    <ol className="mb-3 flex flex-col gap-1.5">
                      {a.comoTestar.map((step, i) => (
                        <li key={i} className="flex gap-2 text-sm text-steel">
                          <span className="font-mono-nums text-voltage">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className="text-xs text-steel">
                      <span className="font-bold text-bone">Sinal de sucesso: </span>
                      {a.sinalDeSucesso}
                    </p>
                  </motion.div>
                )}
              </Card>
            )
          })}
          {filteredAjustes.length === 0 && <EmptyResult />}
        </div>
      )}

      {tab === 'trocas' && (
        <div className="flex flex-col gap-3">
          {filteredTrocas.map((t) => (
            <Card key={t.id} tick={false} className="p-4">
              <div className="mb-2 flex items-center gap-2 text-sm">
                <span className="text-steel line-through">{t.de}</span>
                <IconArrowRight width={14} height={14} className="shrink-0 text-voltage" />
                <span className="font-bold text-bone">{t.para}</span>
              </div>
              <p className="text-sm leading-relaxed text-steel">{t.porque}</p>
            </Card>
          ))}
          {filteredTrocas.length === 0 && <EmptyResult />}
        </div>
      )}

      {tab === 'aulas' && (
        <div className="flex flex-col gap-3">
          {filteredAulas.map((a) => {
            const isOpen = expanded === a.id
            return (
              <Card key={a.id} tick={false} className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : a.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold uppercase tracking-tight">{a.titulo}</span>
                  <IconArrowRight width={16} height={16} className={`shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-line px-4 pb-4 pt-3"
                  >
                    <div className="mb-3 flex flex-col gap-2">
                      {a.blocos.map((b, i) => (
                        <p key={i} className="text-sm leading-relaxed text-steel">
                          {b}
                        </p>
                      ))}
                    </div>
                    <p className="border-t border-line pt-3 text-sm font-medium text-voltage">{a.takeaway}</p>
                  </motion.div>
                )}
              </Card>
            )
          })}
          {filteredAulas.length === 0 && <EmptyResult />}
        </div>
      )}
    </ScreenShell>
  )
}

function EmptyResult() {
  return <p className="py-10 text-center text-sm text-steel">Nada encontrado. Tente outra busca.</p>
}
