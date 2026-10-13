import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada } from "./animacao";

// Uma palavra que entra no quadro em que é falada (fade + leve subida, ~0,1 s).
export const Palavra: React.FC<{
  readonly texto: string;
  readonly em: number;
  readonly cor?: string;
  readonly style?: React.CSSProperties;
}> = ({ texto, em, cor, style }) => {
  const frame = useCurrentFrame();
  const p = entrada(frame, em);
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
