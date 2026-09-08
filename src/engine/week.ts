import type { DiaSemana, WeekPlanDay, ShoppingListItem, Adjustment } from '../lib/types'
import { generateId } from '../lib/id'

const ordemSemana: DiaSemana[] = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']

export const diaLabel: Record<DiaSemana, string> = {
  seg: 'Segunda',
  ter: 'Terça',
  qua: 'Quarta',
  qui: 'Quinta',
  sex: 'Sexta',
  sab: 'Sábado',
  dom: 'Domingo',
}

export function buildWeekPlan(diasTreino: DiaSemana[], adjustment: Adjustment | undefined): WeekPlanDay[] {
  const treinoSet = new Set(diasTreino)
  return ordemSemana.map((dia) => {
    const temTreino = treinoSet.has(dia)
    return {
      dia,
      temTreino,
      periodoTreino: temTreino ? 'tarde' : undefined,
      foco: temTreino
        ? adjustment
          ? `Treino + ${adjustment.titulo.toLowerCase()}`
          : 'Dia de treino'
        : adjustment
          ? adjustment.titulo
          : 'Dia de descanso',
    }
  })
}

interface FoodMeta {
  categoria: ShoppingListItem['categoria']
  quantidade: string
}

const foodMap: Record<string, FoodMeta> = {
  'Arroz e feijão': { categoria: 'carbo', quantidade: 'reforce o estoque da semana' },
  'Frango grelhado': { categoria: 'proteina', quantidade: 'porção extra para distribuir nas refeições' },
  Ovos: { categoria: 'proteina', quantidade: 'uma dúzia extra' },
  'Carne vermelha': { categoria: 'proteina', quantidade: 'porção habitual' },
  Peixe: { categoria: 'proteina', quantidade: '1-2 porções na semana' },
  Pão: { categoria: 'carbo', quantidade: 'opção integral, se encontrar' },
  Tapioca: { categoria: 'carbo', quantidade: 'goma para a semana' },
  Batata: { categoria: 'carbo', quantidade: 'estoque para pré-treino' },
  Massas: { categoria: 'carbo', quantidade: 'porção habitual' },
  Iogurte: { categoria: 'proteina', quantidade: 'natural, sem açúcar' },
  'Whey protein': { categoria: 'proteina', quantidade: 'se já usa — mantenha' },
  Frutas: { categoria: 'hortifruti', quantidade: 'variedade para a semana' },
  'Verduras e legumes': { categoria: 'hortifruti', quantidade: 'para todas as refeições principais' },
  Oleaginosas: { categoria: 'gordura', quantidade: 'porção para os lanches' },
  'Fast-food / delivery': { categoria: 'outros', quantidade: 'reserve para o momento social combinado' },
  'Doces e sobremesas': { categoria: 'outros', quantidade: 'sem corte — só sem virar automático' },
}

export function buildShoppingList(alimentosHabituais: string[]): ShoppingListItem[] {
  const base = alimentosHabituais.length > 0 ? alimentosHabituais : Object.keys(foodMap).slice(0, 6)

  return base.map((nome) => {
    const meta = foodMap[nome] ?? { categoria: 'outros' as const, quantidade: 'conforme sua rotina' }
    return {
      id: generateId('item'),
      nome,
      categoria: meta.categoria,
      quantidadeSugerida: meta.quantidade,
      marcado: false,
    }
  })
}
