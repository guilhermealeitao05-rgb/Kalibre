import { create } from 'zustand'
import type { User, Assessment, RaioX, Cycle, CheckIn, Review, Objetivo, DiaSemana, OndeTrava } from '../lib/types'
import { repository, emptyState, type KalibreState } from '../lib/repository'
import { generateId } from '../lib/id'
import { generateRaioX } from '../engine/raioX'
import { computeAderenciaMedia, buildAprendizado, suggestNextAdjustment } from '../engine/review'
import { getAdjustmentById } from '../data'

interface KalibreStore extends KalibreState {
  hydrated: boolean
  hydrate: () => void
  reset: () => void

  completeOnboarding: () => void
  ensureUser: () => User

  submitAssessment: (input: {
    objetivo: Objetivo
    diasTreino: DiaSemana[]
    refeicoesPorDia: number
    alimentosHabituais: string[]
    ondeTrava: OndeTrava[]
  }) => { assessment: Assessment; raioX: RaioX }

  startCycle: (adjustmentId: string, duracaoDias: 14 | 21) => Cycle
  addCheckIn: (input: Omit<CheckIn, 'id' | 'cycleId' | 'data'> & { cycleId: string }) => CheckIn
  completeCycle: (cycleId: string) => Review | undefined

  setSubscriber: (value: boolean) => void
  toggleReducedMotion: (value: boolean) => void
  toggleLembretes: (value: boolean) => void

  activeCycle: () => Cycle | undefined
  latestRaioX: () => RaioX | undefined
  checkInsForCycle: (cycleId: string) => CheckIn[]
  testedAdjustmentIds: () => string[]
}

function persist(state: KalibreState) {
  repository.save(state)
}

export const useKalibreStore = create<KalibreStore>((set, get) => ({
  ...emptyState,
  hydrated: false,

  hydrate: () => {
    const loaded = repository.load()
    set({ ...loaded, hydrated: true })
  },

  reset: () => {
    repository.clear()
    set({ ...emptyState, hydrated: true })
  },

  completeOnboarding: () => {
    set({ onboardingDone: true })
    persist({ ...get() })
  },

  ensureUser: () => {
    const existing = get().user
    if (existing) return existing
    const user: User = {
      id: generateId('user'),
      objetivo: 'manutencao',
      treinos: [],
      refeicoesPorDia: 4,
      preferencias: [],
      isSubscriber: false,
      reducedMotion: false,
      lembretesAtivos: true,
      criadoEm: new Date().toISOString(),
    }
    set({ user })
    persist({ ...get(), user })
    return user
  },

  submitAssessment: (input) => {
    const user = get().ensureUser()
    const assessment: Assessment = {
      id: generateId('assess'),
      userId: user.id,
      objetivo: input.objetivo,
      diasTreino: input.diasTreino,
      refeicoesPorDia: input.refeicoesPorDia,
      alimentosHabituais: input.alimentosHabituais,
      ondeTrava: input.ondeTrava,
      criadoEm: new Date().toISOString(),
    }
    const leituras = generateRaioX(assessment)
    const raioX: RaioX = {
      id: generateId('raiox'),
      assessmentId: assessment.id,
      leituras,
      criadoEm: new Date().toISOString(),
    }

    const updatedUser: User = {
      ...user,
      objetivo: input.objetivo,
      refeicoesPorDia: input.refeicoesPorDia,
      treinos: input.diasTreino.map((dia) => ({ dia, periodo: 'tarde' as const })),
    }

    const next = {
      ...get(),
      user: updatedUser,
      assessments: [...get().assessments, assessment],
      raioXs: [...get().raioXs, raioX],
    }
    set(next)
    persist(next)
    return { assessment, raioX }
  },

  startCycle: (adjustmentId, duracaoDias) => {
    const user = get().ensureUser()
    const inicio = new Date()
    const fim = new Date(inicio)
    fim.setDate(fim.getDate() + duracaoDias)

    const cycle: Cycle = {
      id: generateId('cycle'),
      userId: user.id,
      adjustmentId,
      duracaoDias,
      inicio: inicio.toISOString(),
      fim: fim.toISOString(),
      status: 'ativo',
    }
    const next = { ...get(), cycles: [...get().cycles, cycle] }
    set(next)
    persist(next)
    return cycle
  },

  addCheckIn: (input) => {
    const checkIn: CheckIn = {
      id: generateId('checkin'),
      cycleId: input.cycleId,
      data: new Date().toISOString(),
      aderencia: input.aderencia,
      energia: input.energia,
      notas: input.notas,
    }
    const next = { ...get(), checkIns: [...get().checkIns, checkIn] }
    set(next)
    persist(next)
    return checkIn
  },

  completeCycle: (cycleId) => {
    const state = get()
    const cycle = state.cycles.find((c) => c.id === cycleId)
    if (!cycle) return undefined
    const adjustment = getAdjustmentById(cycle.adjustmentId)
    if (!adjustment) return undefined

    const checkIns = state.checkIns.filter((c) => c.cycleId === cycleId)
    const aderenciaMedia = computeAderenciaMedia(checkIns)
    const aprendizado = buildAprendizado(adjustment, aderenciaMedia)
    const testedIds = state.cycles.map((c) => c.adjustmentId)
    const proximo = suggestNextAdjustment(cycle.adjustmentId, testedIds, state.user?.objetivo ?? 'manutencao')

    const review: Review = {
      id: generateId('review'),
      cycleId,
      aprendizado,
      aderenciaMedia,
      proximoSugeridoId: proximo?.id,
      criadoEm: new Date().toISOString(),
    }

    const updatedCycles = state.cycles.map((c) => (c.id === cycleId ? { ...c, status: 'concluido' as const } : c))
    const next = { ...state, cycles: updatedCycles, reviews: [...state.reviews, review] }
    set(next)
    persist(next)
    return review
  },

  setSubscriber: (value) => {
    const user = get().ensureUser()
    const updatedUser = { ...user, isSubscriber: value }
    const next = { ...get(), user: updatedUser }
    set(next)
    persist(next)
  },

  toggleReducedMotion: (value) => {
    const user = get().ensureUser()
    const updatedUser = { ...user, reducedMotion: value }
    const next = { ...get(), user: updatedUser }
    set(next)
    persist(next)
  },

  toggleLembretes: (value) => {
    const user = get().ensureUser()
    const updatedUser = { ...user, lembretesAtivos: value }
    const next = { ...get(), user: updatedUser }
    set(next)
    persist(next)
  },

  activeCycle: () => get().cycles.find((c) => c.status === 'ativo'),
  latestRaioX: () => get().raioXs[get().raioXs.length - 1],
  checkInsForCycle: (cycleId) => get().checkIns.filter((c) => c.cycleId === cycleId),
  testedAdjustmentIds: () => get().cycles.map((c) => c.adjustmentId),
}))
