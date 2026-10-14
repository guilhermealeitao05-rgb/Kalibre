import type React from "react";
import { useCurrentFrame } from "remotion";
import { visivel } from "./animacao";
import { Palavra } from "./Palavra";
import { AREA_SEGURA, COR, FONTE, LARGURA_UTIL, TAMANHO } from "./tokens";

export type PalavraTempo = { readonly texto: string; readonly em: number; readonly cor?: string; readonly fundo?: string };

// A legenda do estilo V3: frase curta no topo, palavra por palavra.
export const FraseApoio: React.FC<{
  readonly palavras: PalavraTempo[];
  readonly fim: number;
  readonly y?: number;
  readonly cor?: string;
}> = ({ palavras, fim, y = 268, cor = COR.texto }) => {
  const frame = useCurrentFrame();
  if (palavras.length === 0 || !visivel(frame, palavras[0].em, fim)) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: AREA_SEGURA.esquerda,
        width: LARGURA_UTIL,
        top: y,
        textAlign: "center",
        fontFamily: FONTE,
        fontWeight: 700,
        fontSize: TAMANHO.apoio,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        color: cor,
      }}
    >
      {palavras.map((p, i) => (
        <Palavra key={i} texto={(i > 0 ? " " : "") + p.texto} em={p.em} cor={p.cor} fundo={p.fundo} />
      ))}
    </div>
  );
};
