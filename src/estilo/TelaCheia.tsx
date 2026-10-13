import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { entrada, saida, visivel } from "./animacao";
import { FONTE } from "./tokens";

// Tela cheia do V3 (sem a pessoa): entra em ~0,13 s e sai em ~0,1 s.
export const TelaCheia: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly fundo: string;
  readonly saiSuave?: boolean;
  readonly children: React.ReactNode;
}> = ({ em, fim, fundo, saiSuave = true, children }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  const p = entrada(frame, em, 4);
  const s = saiSuave ? saida(frame, fim, 3) : 1;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: fundo,
        opacity: Math.min(p, s),
        fontFamily: FONTE,
      }}
    >
      <AbsoluteFill style={{ scale: interpolate(p, [0, 1], [1.04, 1]) }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
