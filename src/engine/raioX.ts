import type { Assessment, Leitura, OndeTrava } from '../lib/types'
import { generateId } from '../lib/id'

interface LeituraTemplate {
  tag: OndeTrava
  titulo: string
  descricao: (a: Assessment) => string
  valorExibido: (a: Assessment) => number
  unidade: string
}

const templates: LeituraTemplate[] = [
  {
    tag: 'nao_sei_quanto_comer',
    titulo: 'Proteína concentrada',
    descricao: () =>
      'Pelo que você contou, sua proteína tende a se concentrar em uma ou duas refeições — o resto do dia fica raso. Isso trava mais gente do que parece.',
    valorExibido: (a) => Math.max(1, Math.round(a.refeicoesPorDia / 2)),
    unidade: 'de janelas com proteína',
  },
  {
    tag: 'treino_sem_pre_pos',
    titulo: 'Treino sem âncora',
    descricao: () =>
      'Seus treinos não têm uma refeição de antes ou depois definida. O resultado do treino se perde quando a nutrição em volta dele é improviso.',
    valorExibido: (a) => a.diasTreino.length,
    unidade: 'treinos/semana sem plano',
  },
  {
    tag: 'fim_de_semana',
    titulo: 'Inconsistência de fim de semana',
    descricao: () =>
      'A rotina de segunda a sexta parece funcionar — mas o padrão muda muito no fim de semana. É aí que boa parte do resultado escapa.',
    valorExibido: () => 2,
    unidade: 'dias fora do padrão',
  },
  {
    tag: 'ansiedade_noturna',
    titulo: 'Fome noturna',
    descricao: () =>
      'Você indicou que a fome ou a ansiedade aparecem mais forte à noite. É um padrão comum — e um dos mais fáceis de calibrar com o ajuste certo.',
    valorExibido: () => 1,
    unidade: 'pico noturno identificado',
  },
  {
    tag: 'falta_de_tempo',
    titulo: 'Decisões de improviso',
    descricao: () =>
      'Sem tempo pra organizar, boa parte das suas escolhas de comida acontecem na hora, sob pressão — o que raramente é a opção que você escolheria com calma.',
    valorExibido: (a) => a.refeicoesPorDia,
    unidade: 'refeições/dia no improviso',
  },
  {
    tag: 'orcamento',
    titulo: 'Orçamento pressionando escolhas',
    descricao: () =>
      'O orçamento parece influenciar boa parte das suas escolhas de comida. Dá pra calibrar sem depender de suplemento caro ou alimento importado.',
    valorExibido: () => 1,
    unidade: 'ponto de pressão identificado',
  },
]

const fallbackTemplate: LeituraTemplate = {
  tag: 'nao_sei_quanto_comer',
  titulo: 'Rotina com espaço pra calibrar',
  descricao: () =>
    'Sua base já é sólida — você treina e já come com alguma estrutura. O próximo resultado vem de um ajuste fino, não de recomeçar do zero.',
  valorExibido: (a) => a.refeicoesPorDia,
  unidade: 'refeições mapeadas',
}

export function generateRaioX(assessment: Assessment): Leitura[] {
  const chosenTags = assessment.ondeTrava.length > 0 ? assessment.ondeTrava : (['nao_sei_quanto_comer'] as OndeTrava[])

  const matched = chosenTags
    .map((tag) => templates.find((t) => t.tag === tag))
    .filter((t): t is LeituraTemplate => Boolean(t))

  const pool = matched.length > 0 ? matched : [fallbackTemplate]
  const picked = pool.slice(0, 3)

  return picked.map((template) => ({
    id: generateId('leitura'),
    titulo: template.titulo,
    descricao: template.descricao(assessment),
    valorExibido: template.valorExibido(assessment),
    unidade: template.unidade,
    tag: template.tag,
  }))
}
