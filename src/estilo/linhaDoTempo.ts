import { interpolate, staticFile } from "remotion";
import type { Recorte } from "./AtrasDaPessoa";
import type { PalavraTempo } from "./FraseApoio";

type Transcricao = {
  trechos_mantidos_s: number[][];
  palavras: { texto: string; inicio_editado_s: number }[];
};

// O alinhamento marca a palavra ~0,05 s depois do começo do som; adianto o texto nisso.
const ADIANTO_S = 0.05;

// Monta tudo que um vídeo editado precisa a partir da transcrição aprovada:
// tempo de cada palavra, trechos mantidos (com zoom alternado 100/108% nos cortes),
// punch-ins de ênfase e a máscara da pessoa em cada quadro.
export const criarLinhaDoTempo = ({
  transcricao,
  fps,
  pastaRecorte,
  origemZoom,
  duracaoTelaFinalS = 2.6,
}: {
  transcricao: Transcricao;
  fps: number;
  pastaRecorte: string;
  origemZoom: { x: number; y: number };
  duracaoTelaFinalS?: number;
}) => {
  const palavras = transcricao.palavras.map((p) => ({
    texto: p.texto,
    em: Math.max(0, Math.round((p.inicio_editado_s - ADIANTO_S) * fps)),
  }));

  // Quadro em que a palavra `i` começa a ser falada.
  const f = (i: number) => palavras[i].em;

  // Palavras de `de` até `ate` (inclusive), com texto opcionalmente trocado.
  const w = (de: number, ate = de, texto?: string[]): PalavraTempo[] =>
    palavras.slice(de, ate + 1).map((p, k) => ({ texto: texto?.[k] ?? p.texto, em: p.em }));

  let inicioEditado = 0;
  const trechos = transcricao.trechos_mantidos_s.map(([a, b], i) => {
    const inicioOriginal = Math.round(a * fps);
    const duracao = Math.round(b * fps) - inicioOriginal;
    const t = { inicioOriginal, inicioEditado, duracao, zoom: i % 2 === 1 ? 1.08 : 1 };
    inicioEditado += duracao;
    return t;
  });

  const fimDaFala = inicioEditado;
  const duracaoTelaFinal = Math.round(duracaoTelaFinalS * fps);

  // Punch-in: +6% em 6 quadros, segura e volta em 6 quadros.
  const punch = (quadro: number, inicios: number[], dur = 30) =>
    inicios.reduce((acc, p) => {
      const v = interpolate(quadro, [p, p + 6, p + dur - 6, p + dur], [1, 1.06, 1.06, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return Math.max(acc, v);
    }, 1);

  const trechoNoQuadro = (quadro: number) =>
    trechos.find((s) => quadro >= s.inicioEditado && quadro < s.inicioEditado + s.duracao) ?? null;

  // Máscara da pessoa no quadro editado `quadro`, com o mesmo zoom do vídeo.
  const recorteNoQuadro = (quadro: number, escalaExtra = 1, deslocX = 0, deslocY = 0): Recorte | null => {
    const t = trechoNoQuadro(quadro);
    if (!t) {
      return null;
    }
    const original = t.inicioOriginal + (quadro - t.inicioEditado);
    return {
      src: staticFile(`${pastaRecorte}/${String(original).padStart(5, "0")}.png`),
      escala: t.zoom * escalaExtra,
      origemX: origemZoom.x,
      origemY: origemZoom.y,
      deslocX,
      deslocY,
    };
  };

  return {
    f,
    w,
    trechos,
    fimDaFala,
    duracaoTotal: fimDaFala + duracaoTelaFinal,
    punch,
    trechoNoQuadro,
    recorteNoQuadro,
    origemZoom,
  };
};
