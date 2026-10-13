import { Easing, interpolate } from "remotion";
import { QUADROS_ENTRADA } from "./tokens";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0 → 1 a partir do quadro `inicio`, em `duracao` quadros.
export const entrada = (frame: number, inicio: number, duracao = QUADROS_ENTRADA) =>
  interpolate(frame, [inicio, inicio + duracao], [0, 1], {
    ...CLAMP,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

// 1 → 0 terminando no quadro `fim`.
export const saida = (frame: number, fim: number, duracao = QUADROS_ENTRADA) =>
  interpolate(frame, [fim - duracao, fim], [1, 0], CLAMP);

export const visivel = (frame: number, inicio: number, fim: number) =>
  frame >= inicio && frame < fim;
