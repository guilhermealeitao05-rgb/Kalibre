import adjustmentsRaw from './adjustments.json'
import trocasRaw from './trocas.json'
import aulasRaw from './aulas.json'
import type { Adjustment, Troca, Aula, ContentItem } from '../lib/types'

export const adjustments: Adjustment[] = adjustmentsRaw as Adjustment[]
export const trocas: Troca[] = trocasRaw as Troca[]
export const aulas: Aula[] = aulasRaw as Aula[]
export const contentItems: ContentItem[] = [...trocas, ...aulas]

export function getAdjustmentById(id: string): Adjustment | undefined {
  return adjustments.find((a) => a.id === id)
}

export const alimentosHabituaisOpcoes = [
  'Arroz e feijão',
  'Frango grelhado',
  'Ovos',
  'Carne vermelha',
  'Peixe',
  'Pão',
  'Tapioca',
  'Batata',
  'Massas',
  'Iogurte',
  'Whey protein',
  'Frutas',
  'Verduras e legumes',
  'Oleaginosas',
  'Fast-food / delivery',
  'Doces e sobremesas',
] as const

export const ondeTravaOpcoes: { id: string; label: string }[] = [
  { id: 'fim_de_semana', label: 'O fim de semana desmonta tudo' },
  { id: 'falta_de_tempo', label: 'Falta tempo pra organizar as refeições' },
  { id: 'nao_sei_quanto_comer', label: 'Não sei se estou comendo do jeito certo' },
  { id: 'treino_sem_pre_pos', label: 'Treino sem pensar no antes/depois' },
  { id: 'ansiedade_noturna', label: 'Ansiedade ou fome à noite' },
  { id: 'orcamento', label: 'Orçamento aperta as escolhas' },
]
