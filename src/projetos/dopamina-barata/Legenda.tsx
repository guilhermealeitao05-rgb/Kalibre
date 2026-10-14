import type React from "react";
import { FraseApoio } from "../../estilo/FraseApoio";
import { LINHA } from "./dados";

const { f, w, fimDaFala } = LINHA;

// Páginas da legenda (frase de apoio) aprovadas: [primeira palavra, última palavra, palavra em que some].
// `null` no fim = até o fim da fala.
const PAGINAS: [number, number, number | null][] = [
  [0, 4, 5], [5, 7, 9], [9, 11, 13], [13, 16, 17], [17, 19, 20], [20, 22, 23],
  [24, 26, 28], [28, 30, 31], [31, 34, 35], [40, 44, 45], [45, 48, 50],
  [50, 52, 53], [53, 54, 55], [55, 57, 58], [58, 60, 61],
  [61, 64, 65], [66, 70, 71], [71, 71, 73], [73, 74, 79], [79, 80, 92], [92, 92, 94],
  [94, 97, 98], [98, 101, 103], [112, 115, 116], [116, 119, 120], [120, 122, 123], [123, 126, 127],
  [127, 130, 131], [131, 133, 134], [134, 137, 138], [138, 141, 142], [142, 146, 147], [147, 150, null],
];

export type Destaque = { readonly cor?: string; readonly fundo?: string };

// Legenda do "Dopamina barata". `destaques` pinta palavras pelo índice na transcrição;
// `semPaginas` tira páginas que outro elemento substitui (ex.: um selo no lugar da frase).
export const Legenda: React.FC<{
  readonly destaques?: Record<number, Destaque>;
  readonly semPaginas?: number[];
}> = ({ destaques = {}, semPaginas = [] }) => (
  <>
    {PAGINAS.filter(([de]) => !semPaginas.includes(de)).map(([de, ate, some]) => (
      <FraseApoio
        key={de}
        palavras={w(de, ate).map((p, k) => ({ ...p, ...destaques[de + k] }))}
        fim={some === null ? fimDaFala : f(some)}
      />
    ))}
  </>
);
