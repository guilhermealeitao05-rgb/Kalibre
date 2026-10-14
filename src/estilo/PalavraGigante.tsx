import { fitText } from "@remotion/layout-utils";
import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada, visivel } from "./animacao";
import { AREA_SEGURA, COR, FONTE, LARGURA_UTIL, TAMANHO } from "./tokens";

const ESPACAMENTO = "-0.056em"; // letras bem apertadas, como no V3

// Palavra gigante do V3. A linha de base fica logo acima da cabeça.
export const PalavraGigante: React.FC<{
  readonly texto: string;
  readonly em: number;
  readonly fim: number;
  readonly sufixo?: string; // ex.: seta azul "→" ou "↑"
  readonly risco?: number; // quadro em que o risco azul passa
  readonly ondulado?: number; // quadro em que o sublinhado ondulado aparece
  readonly linhaDeBase?: number;
  readonly cor?: string;
  readonly brilho?: boolean; // brilho branco suave atrás das letras (fundo movimentado)
}> = ({ texto, em, fim, sufixo, risco, ondulado, linhaDeBase = 520, cor = COR.texto, brilho = false }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  const textoMedido = sufixo ? `${texto} ${sufixo}` : texto;
  const { fontSize: cabe } = fitText({
    text: textoMedido,
    withinWidth: LARGURA_UTIL,
    fontFamily: FONTE,
    fontWeight: 800,
    letterSpacing: ESPACAMENTO,
  });
  const tamanho = Math.min(TAMANHO.gigante, cabe);
  const p = entrada(frame, em, 4);
  const pRisco = risco === undefined ? 0 : entrada(frame, risco, 5);
  const pOnda = ondulado === undefined ? 0 : entrada(frame, ondulado, 8);
  return (
    <div
      style={{
        position: "absolute",
        left: AREA_SEGURA.esquerda,
        width: LARGURA_UTIL,
        top: linhaDeBase - tamanho * 0.97,
        display: "flex",
        justifyContent: "center",
        opacity: p,
        scale: interpolate(p, [0, 1], [0.94, 1]),
      }}
    >
      <div
        style={{
          position: "relative",
          fontFamily: FONTE,
          fontWeight: 800,
          fontSize: tamanho,
          letterSpacing: ESPACAMENTO,
          lineHeight: 1.2,
          color: cor,
          whiteSpace: "pre",
          textShadow: brilho
            ? "0 0 24px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.7)"
            : undefined,
        }}
      >
        {texto}
        {sufixo ? <span style={{ color: COR.azul }}>{` ${sufixo}`}</span> : null}
        {risco !== undefined ? (
          <div
            style={{
              position: "absolute",
              left: "-2%",
              top: "50%",
              width: `${104 * pRisco}%`,
              height: tamanho * 0.085,
              background: COR.azul,
              borderRadius: tamanho * 0.04,
              rotate: "-2deg",
            }}
          />
        ) : null}
        {ondulado !== undefined ? (
          <svg
            viewBox="0 0 400 24"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: 0,
              top: "93%",
              width: "100%",
              height: tamanho * 0.12,
              overflow: "visible",
            }}
          >
            <path
              d="M0 12 Q 12.5 0 25 12 T 50 12 T 75 12 T 100 12 T 125 12 T 150 12 T 175 12 T 200 12 T 225 12 T 250 12 T 275 12 T 300 12 T 325 12 T 350 12 T 375 12 T 400 12"
              fill="none"
              stroke={COR.azul}
              strokeWidth={6}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - pOnda}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
};
