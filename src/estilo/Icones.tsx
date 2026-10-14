import type React from "react";
import { COR } from "./tokens";

// Ícones simples desenhados para o estúdio (sem emoji nem imagens de terceiros).
type P = { readonly tamanho?: number; readonly cor?: string };

export const IconePlay: React.FC<P> = ({ tamanho = 48, cor = COR.branco }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48">
    <path d="M17 11 L37 24 L17 37 Z" fill={cor} strokeLinejoin="round" stroke={cor} strokeWidth={3} />
  </svg>
);

export const IconeSino: React.FC<P> = ({ tamanho = 48, cor = COR.branco }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" fill="none" stroke={cor} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 33 h24 l-3 -5 v-8 a9 9 0 0 0 -18 0 v8 z" fill={cor} />
    <path d="M20 37 a4 4 0 0 0 8 0" />
  </svg>
);

export const IconeLanche: React.FC<P> = ({ tamanho = 48, cor = COR.branco }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" fill={cor}>
    <path d="M9 21 a15 10 0 0 1 30 0 z" />
    <rect x={8} y={24} width={32} height={4} rx={2} />
    <rect x={9} y={31} width={30} height={7} rx={3.5} />
  </svg>
);

export const IconeRaio: React.FC<P> = ({ tamanho = 48, cor = COR.branco }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48">
    <path d="M27 6 L12 27 h11 l-3 15 L36 20 h-11 z" fill={cor} strokeLinejoin="round" stroke={cor} strokeWidth={2} />
  </svg>
);

export const IconeCheck: React.FC<P> = ({ tamanho = 48, cor = COR.azul }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" fill="none">
    <rect x={5} y={5} width={38} height={38} rx={10} stroke={cor} strokeWidth={5} />
  </svg>
);

export const IconeSeta: React.FC<P> = ({ tamanho = 48, cor = COR.azul }) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 48 48" fill="none" stroke={cor} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6 v34 M12 28 l12 12 l12 -12" />
  </svg>
);
