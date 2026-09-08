export type Objetivo = 'ganho' | 'manutencao' | 'definicao'

export type DiaSemana = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'

export interface DiaTreino {
  dia: DiaSemana
  periodo: 'manha' | 'tarde' | 'noite'
}

export interface User {
  id: string
  nome?: string
  objetivo: Objetivo
  treinos: DiaTreino[]
  refeicoesPorDia: number
  preferencias: string[]
  isSubscriber: boolean
  reducedMotion: boolean
  lembretesAtivos: boolean
  criadoEm: string
}

export type OndeTrava =
  | 'fim_de_semana'
  | 'falta_de_tempo'
  | 'nao_sei_quanto_comer'
  | 'treino_sem_pre_pos'
  | 'ansiedade_noturna'
  | 'orcamento'

export interface Assessment {
  id: string
  userId: string
  objetivo: Objetivo
  diasTreino: DiaSemana[]
  refeicoesPorDia: number
  alimentosHabituais: string[]
  ondeTrava: OndeTrava[]
  criadoEm: string
}

export interface Leitura {
  id: string
  titulo: string
  descricao: string
  valorExibido: number
  unidade: string
  tag: string
}

export interface RaioX {
  id: string
  assessmentId: string
  leituras: Leitura[]
  criadoEm: string
}

export interface Adjustment {
  id: string
  titulo: string
  porque: string
  quandoUsar: string
  comoTestar: string[]
  sinalDeSucesso: string
  tags: OndeTrava[]
  objetivos: Objetivo[]
}

export type CycleStatus = 'ativo' | 'concluido' | 'abandonado'

export interface Cycle {
  id: string
  userId: string
  adjustmentId: string
  duracaoDias: 14 | 21
  inicio: string
  fim: string
  status: CycleStatus
}

export interface CheckIn {
  id: string
  cycleId: string
  data: string
  aderencia: 'sim' | 'parcial' | 'nao'
  energia: 1 | 2 | 3 | 4 | 5
  notas?: string
}

export interface Review {
  id: string
  cycleId: string
  aprendizado: string
  aderenciaMedia: number
  proximoSugeridoId?: string
  criadoEm: string
}

export interface Troca {
  id: string
  tipo: 'troca'
  de: string
  para: string
  porque: string
}

export interface Aula {
  id: string
  tipo: 'aula'
  titulo: string
  blocos: string[]
  takeaway: string
}

export type ContentItem = Troca | Aula

export interface ShoppingListItem {
  id: string
  nome: string
  categoria: 'proteina' | 'carbo' | 'gordura' | 'hortifruti' | 'outros'
  quantidadeSugerida: string
  marcado: boolean
}

export interface WeekPlanDay {
  dia: DiaSemana
  temTreino: boolean
  periodoTreino?: 'manha' | 'tarde' | 'noite'
  foco: string
}
