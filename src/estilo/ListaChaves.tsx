import type React from "react";
import { useCurrentFrame } from "remotion";
import { entrada, visivel } from "./animacao";
import { Palavra } from "./Palavra";
import type { PalavraTempo } from "./FraseApoio";
import { AREA_SEGURA, COR, FONTE, LARGURA_UTIL } from "./tokens";

// "{ item, item, item }" do V3: os itens entram quando são falados.
// Cada linha é uma lista de itens; a vírgula entra junto com o item.
export const ListaChaves: React.FC<{
  readonly linhas: PalavraTempo[][];
  readonly fim: number;
  readonly topo?: number;
  readonly tamanho?: number;
}> = ({ linhas, fim, topo = 350, tamanho = 64 }) => {
  const frame = useCurrentFrame();
  const inicio = linhas[0][0].em;
  if (!visivel(frame, inicio, fim)) {
    return null;
  }
  const pChaves = entrada(frame, inicio, 4);
  const chave = (c: string) => (
    <span style={{ color: COR.azul, opacity: pChaves, whiteSpace: "pre" }}>{c}</span>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: AREA_SEGURA.esquerda,
        width: LARGURA_UTIL,
        top: topo,
        textAlign: "center",
        fontFamily: FONTE,
        fontWeight: 800,
        fontSize: tamanho,
        letterSpacing: "-0.04em",
        lineHeight: 1.12,
        color: COR.texto,
      }}
    >
      {linhas.map((linha, l) => (
        <div key={l} style={{ whiteSpace: "nowrap" }}>
          {l === 0 ? chave("{ ") : null}
          {linha.map((item, i) => (
            <Palavra key={i} texto={(i > 0 ? " " : "") + item.texto} em={item.em} />
          ))}
          {l === linhas.length - 1 ? chave(" }") : null}
        </div>
      ))}
    </div>
  );
};
