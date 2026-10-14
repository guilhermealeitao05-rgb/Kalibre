import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada } from "./animacao";

// Uma palavra que entra no quadro em que é falada (fade + leve subida, ~0,1 s).
export const Palavra: React.FC<{
  readonly texto: string;
  readonly em: number;
  readonly cor?: string;
  readonly fundo?: string; // caixa colorida atrás da palavra
  readonly style?: React.CSSProperties;
}> = ({ texto, em, cor, fundo, style }) => {
  const frame = useCurrentFrame();
  const p = entrada(frame, em);
  if (fundo) {
    const espaco = texto.startsWith(" ") ? " " : "";
    return (
      <>
        {espaco}
        <span
          style={{
            display: "inline-block",
            opacity: p,
            scale: interpolate(p, [0, 0.7, 1], [0.8, 1.08, 1]),
            backgroundColor: fundo,
            color: cor,
            padding: "0 0.18em",
            borderRadius: "0.14em",
            whiteSpace: "pre",
            ...style,
          }}
        >
          {texto.trimStart()}
        </span>
      </>
    );
  }
  return (
    <span
      style={{
        display: "inline-block",
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [8, 0])}px`,
        color: cor,
        whiteSpace: "pre",
        ...style,
      }}
    >
      {texto}
    </span>
  );
};
