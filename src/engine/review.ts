import type { CheckIn, Adjustment, Objetivo } from '../lib/types'
import { adjustments } from '../data'

export function computeAderenciaMedia(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0
  const pontos = checkIns.reduce((sum, c) => {
    if (c.aderencia === 'sim') return sum + 1
    if (c.aderencia === 'parcial') return sum + 0.5
    return sum
  }, 0)
  return Math.round((pontos / checkIns.length) * 100)
}

export function buildAprendizado(adjustment: Adjustment, aderenciaMedia: number): string {
  if (aderenciaMedia >= 75) {
    return `Você manteve "${adjustment.titulo}" na maior parte do ciclo. ${adjustment.sinalDeSucesso} Isso já pode virar parte fixa da sua rotina.`
  }
  if (aderenciaMedia >= 40) {
    return `"${adjustment.titulo}" foi testado de forma parcial neste ciclo — o que já é informação valiosa. Vale entender o que atrapalhou antes de somar um novo ajuste.`
  }
  return `Este ciclo mostrou que "${adjustment.titulo}" não encaixou na sua rotina como está. Isso não é fracasso — é dado. O próximo ajuste pode ser mais simples de sustentar.`
}

export function suggestNextAdjustment(
  currentAdjustmentId: string,
  testedIds: string[],
  objetivo: Objetivo,
): Adjustment | undefined {
  const excluded = new Set([currentAdjustmentId, ...testedIds])
  const candidates = adjustments.filter((a) => !excluded.has(a.id))
  const pool = candidates.length > 0 ? candidates : adjustments.filter((a) => a.id !== currentAdjustmentId)

  const scored = pool.map((a) => ({
    a,
    score: a.objetivos.includes(objetivo) ? 1 : 0,
  }))
  scored.sort((x, y) => y.score - x.score)
  return scored[0]?.a
}
