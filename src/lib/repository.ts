import type { User, Assessment, RaioX, Cycle, CheckIn, Review } from './types'

export interface KalibreState {
  user: User | null
  assessments: Assessment[]
  raioXs: RaioX[]
  cycles: Cycle[]
  checkIns: CheckIn[]
  reviews: Review[]
  onboardingDone: boolean
}

export interface KalibreRepository {
  load(): KalibreState
  save(state: KalibreState): void
  clear(): void
}

export const emptyState: KalibreState = {
  user: null,
  assessments: [],
  raioXs: [],
  cycles: [],
  checkIns: [],
  reviews: [],
  onboardingDone: false,
}

const STORAGE_KEY = 'kalibre.state.v1'

/**
 * localStorage-backed repository for the MVP. Swappable for a Supabase-backed
 * implementation later without touching the store or UI — callers only see
 * this interface.
 */
export class LocalStorageRepository implements KalibreRepository {
  load(): KalibreState {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return { ...emptyState }
      const parsed = JSON.parse(raw) as Partial<KalibreState>
      return { ...emptyState, ...parsed }
    } catch {
      return { ...emptyState }
    }
  }

  save(state: KalibreState): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // storage unavailable (private mode, quota) — fail silently, in-memory state still works
    }
  }

  clear(): void {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }
}

export const repository: KalibreRepository = new LocalStorageRepository()
