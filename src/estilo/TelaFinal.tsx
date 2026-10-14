import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada } from "./animacao";
import { TelaCheia } from "./TelaCheia";
import { AREA_SEGURA, COR, FONTE, LARGURA_UTIL } from "./tokens";

const blocoCentral = (top: number): React.CSSProperties => ({
  position: "absolute",
  left: AREA_SEGURA.esquerda,
  width: LARGURA_UTIL,
  top,
  textAlign: "center",
  fontFamily: FONTE,
});

// Tela final (CTA): "← { @arroba } →" + botão azul com alças de seleção.
export const TelaFinal: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly arroba: string;
  readonly botao: string;
}> = ({ em, fim, arroba, botao }) => {
  const frame = useCurrentFrame();
  const pBotao = entrada(frame, em + 10, 6);
  const alca: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    backgroundColor: COR.branco,
    border: `3px solid ${COR.azul}`,
  };
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.creme} saiSuave={false}>
      <div style={{ ...blocoCentral(740), fontWeight: 700, fontSize: 60, letterSpacing: "-0.03em", color: COR.texto, whiteSpace: "pre" }}>
        <span style={{ color: COR.azul }}>{"← { "}</span>
        {arroba}
        <span style={{ color: COR.azul }}>{" } →"}</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: (AREA_SEGURA.esquerda + AREA_SEGURA.direita) / 2,
          top: 880,
          translate: "-50% 0px",
          scale: interpolate(pBotao, [0, 1], [0.8, 1]),
          opacity: pBotao,
          padding: 10,
          outline: `3px solid ${COR.azul}`,
        }}
      >
        <div
          style={{
            backgroundColor: COR.azul,
            color: COR.branco,
            fontFamily: FONTE,
            fontWeight: 700,
            fontSize: 54,
            letterSpacing: "-0.03em",
            padding: "18px 40px",
            borderRadius: 18,
            whiteSpace: "pre",
          }}
        >
          {botao}
        </div>
        <div style={{ ...alca, left: -9, top: -9 }} />
        <div style={{ ...alca, right: -9, top: -9 }} />
        <div style={{ ...alca, left: -9, bottom: -9 }} />
        <div style={{ ...alca, right: -9, bottom: -9 }} />
      </div>
    </TelaCheia>
  );
};
