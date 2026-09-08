import type { Assessment, Leitura, Adjustment } from '../lib/types'
import { adjustments } from '../data'

/**
 * Ranks adjustments by relevance to the raio-X readings and the user's
 * objective, returning 2-4 candidates. Never returns a single option —
 * choice between real alternatives is the point (section 3 of the brief).
 */
export function suggestAdjustments(leituras: Leitura[], assessment: Assessment): Adjustment[] {
  const tagWeight = new Map<string, number>()
  leituras.forEach((l, i) => tagWeight.set(l.tag, leituras.length - i))

  const scored = adjustments.map((adj) => {
    let score = 0
    adj.tags.forEach((tag) => {
      score += tagWeight.get(tag) ?? 0
    })
    if (adj.objetivos.includes(assessment.objetivo)) score += 1
    return { adj, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const top = scored.filter((s) => s.score > 0).slice(0, 4)
  const picked = top.length >= 2 ? top : scored.slice(0, 3)

  return picked.slice(0, 4).map((s) => s.adj)
}
