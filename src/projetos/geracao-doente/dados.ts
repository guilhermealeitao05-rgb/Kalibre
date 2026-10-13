import { staticFile } from "remotion";
import type { Recorte } from "../../estilo/AtrasDaPessoa";
import type { PalavraTempo } from "../../estilo/FraseApoio";
import transcricao from "../../../projetos/geracao-doente/transcricao.json";

export const FPS = 30;
export const VIDEO = staticFile("videos/geracao-doente.mp4");

// O alinhamento marca a palavra ~0,05 s depois do começo do som; adianto o texto nisso.
const ADIANTO_S = 0.05;

const palavras = transcricao.palavras.map((p) => ({
  texto: p.texto,
  em: Math.max(0, Math.round((p.inicio_editado_s - ADIANTO_S) * FPS)),
}));

// Quadro (no vídeo editado) em que a palavra `i` começa a ser falada.
export const f = (i: number) => palavras[i].em;

// Palavras de `de` até `ate` (inclusive), com o texto opcionalmente trocado.
export const w = (de: number, ate = de, texto?: string[]): PalavraTempo[] =>
  palavras.slice(de, ate + 1).map((p, k) => ({ texto: texto?.[k] ?? p.texto, em: p.em }));

// Trechos mantidos depois dos cortes de pausa (aprovados na etapa 1).
// Em cada corte, o enquadramento alterna entre 100% e 108%.
export const TRECHOS = (() => {
  let inicioEditado = 0;
  return transcricao.trechos_mantidos_s.map(([a, b], i) => {
    const inicioOriginal = Math.round(a * FPS);
    const duracao = Math.round(b * FPS) - inicioOriginal;
    const t = { inicioOriginal, inicioEditado, duracao, zoom: i % 2 === 1 ? 1.08 : 1 };
    inicioEditado += duracao;
    return t;
  });
})();

export const FIM_DA_FALA = TRECHOS[TRECHOS.length - 1].inicioEditado + TRECHOS[TRECHOS.length - 1].duracao;
export const DURACAO_TELA_FINAL = Math.round(2.6 * FPS);
export const DURACAO_TOTAL = FIM_DA_FALA + DURACAO_TELA_FINAL;

// Centro do zoom: um pouco acima do rosto, para não cortar a cabeça.
export const ORIGEM_ZOOM = { x: 540, y: 760 };

// Máscara da pessoa no quadro editado `quadro` (mesmo zoom do vídeo).
export const recorteNoQuadro = (quadro: number): Recorte | null => {
  const t = TRECHOS.find((s) => quadro >= s.inicioEditado && quadro < s.inicioEditado + s.duracao);
  if (!t) {
    return null;
  }
  const original = t.inicioOriginal + (quadro - t.inicioEditado);
  return {
    src: staticFile(`videos/geracao-doente-recorte/${String(original).padStart(5, "0")}.png`),
    escala: t.zoom,
    origemX: ORIGEM_ZOOM.x,
    origemY: ORIGEM_ZOOM.y,
  };
};
