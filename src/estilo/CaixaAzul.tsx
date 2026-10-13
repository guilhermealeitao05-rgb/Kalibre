import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada, visivel } from "./animacao";
import { Palavra } from "./Palavra";
import type { PalavraTempo } from "./FraseApoio";
import { CENTRO_X, COR, FONTE } from "./tokens";

// Palavra em caixa azul com texto branco (como o "edit" do V3).
export const CaixaAzul: React.FC<{
  readonly palavras: PalavraTempo[];
  readonly fim: number;
  readonly topo?: number;
  readonly tamanho?: number;
}> = ({ palavras, fim, topo = 360, tamanho = 110 }) => {
  const frame = useCurrentFrame();
  const em = palavras[0].em;
  if (!visivel(frame, em, fim)) {
    return null;
  }
  const p = entrada(frame, em, 5);
  return (
    <div
      style={{
        position: "absolute",
        left: CENTRO_X,
        top: topo,
        translate: "-50% 0px",
        scale: interpolate(p, [0, 1], [0.9, 1]),
        opacity: p,
        backgroundColor: COR.azul,
        color: COR.branco,
        fontFamily: FONTE,
        fontWeight: 800,
        fontSize: tamanho,
        letterSpacing: "-0.05em",
        lineHeight: 1.1,
        padding: `${tamanho * 0.06}px ${tamanho * 0.18}px ${tamanho * 0.1}px`,
        whiteSpace: "pre",
      }}
    >
      {palavras.map((w, i) => (
        <Palavra key={i} texto={(i > 0 ? " " : "") + w.texto} em={w.em} />
      ))}
    </div>
  );
};
