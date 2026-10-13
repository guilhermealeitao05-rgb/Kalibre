import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada, saida, visivel } from "./animacao";
import { AREA_SEGURA, COR, FONTE } from "./tokens";

// CTA no meio do vídeo: card de perfil que sobe no canto de baixo à esquerda.
// Sem número de seguidores, para não inventar dado.
export const CardPerfil: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly nome: string;
  readonly arroba: string;
  readonly iniciais: string;
}> = ({ em, fim, nome, arroba, iniciais }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  const p = entrada(frame, em, 7);
  const s = saida(frame, fim, 6);
  return (
    <div
      style={{
        position: "absolute",
        left: AREA_SEGURA.esquerda,
        top: 1270,
        width: 800,
        opacity: Math.min(p, s),
        translate: `0px ${interpolate(p, [0, 1], [50, 0])}px`,
        backgroundColor: COR.branco,
        borderRadius: 32,
        padding: "26px 30px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
        fontFamily: FONTE,
        color: COR.texto,
      }}
    >
      <div
        style={{
          width: 104,
          height: 104,
          borderRadius: 52,
          backgroundColor: COR.azul,
          color: COR.branco,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 42,
          letterSpacing: "-0.03em",
          flexShrink: 0,
        }}
      >
        {iniciais}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{nome}</div>
        <div style={{ fontWeight: 500, fontSize: 32, color: "#6B6560" }}>{arroba}</div>
      </div>
      <div
        style={{
          backgroundColor: COR.azul,
          color: COR.branco,
          fontWeight: 700,
          fontSize: 34,
          padding: "16px 28px",
          borderRadius: 18,
        }}
      >
        Seguir
      </div>
    </div>
  );
};
