import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada } from "../../estilo/animacao";
import { Bloco } from "../../estilo/Cards";
import { Palavra } from "../../estilo/Palavra";
import type { PalavraTempo } from "../../estilo/FraseApoio";
import { TelaCheia } from "../../estilo/TelaCheia";
import { AREA_SEGURA, COR, FONTE, LARGURA_UTIL } from "../../estilo/tokens";

// "sozinho com os próprios / pensamentos …" (fundo preto).
export const TelaPensamentos: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly antes: PalavraTempo[];
  readonly palavra: PalavraTempo[];
}> = ({ em, fim, antes, palavra }) => {
  const frame = useCurrentFrame();
  const reticencias = palavra[0].em;
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.preto}>
      <Bloco palavras={antes} topo={700} tamanho={56} peso={700} cor={COR.branco} />
      <Bloco palavras={palavra} topo={790} tamanho={150} cor={COR.branco} />
      <div
        style={{
          position: "absolute",
          left: AREA_SEGURA.esquerda,
          width: LARGURA_UTIL,
          top: 960,
          textAlign: "center",
          fontFamily: FONTE,
          fontWeight: 800,
          fontSize: 150,
          lineHeight: 1,
          color: COR.azul,
          letterSpacing: "0.05em",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              opacity: frame < reticencias ? 0 : interpolate((frame - reticencias - i * 4) % 18, [0, 6, 18], [0.25, 1, 0.25]),
            }}
          >
            •
          </span>
        ))}
      </div>
    </TelaCheia>
  );
};

// "e não, / a sua dopamina / não está sendo / ~~destruída.~~" (fundo azul).
export const TelaDopamina: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly eNao: PalavraTempo[];
  readonly suaDopamina: PalavraTempo[];
  readonly naoEstaSendo: PalavraTempo[];
  readonly destruida: PalavraTempo;
}> = ({ em, fim, eNao, suaDopamina, naoEstaSendo, destruida }) => {
  const frame = useCurrentFrame();
  const pRisco = entrada(frame, destruida.em + 6, 6);
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.azul}>
      <Bloco palavras={eNao} topo={540} tamanho={60} peso={700} cor={COR.branco} />
      <Bloco palavras={suaDopamina} topo={630} tamanho={140} cor={COR.branco} />
      <Bloco palavras={naoEstaSendo} topo={960} tamanho={64} peso={700} cor={COR.branco} />
      <div
        style={{
          position: "absolute",
          left: AREA_SEGURA.esquerda,
          width: LARGURA_UTIL,
          top: 1050,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", fontFamily: FONTE, fontWeight: 800, fontSize: 150, letterSpacing: "-0.05em", lineHeight: 1.05, color: COR.branco }}>
          <Palavra texto={destruida.texto} em={destruida.em} />
          <div
            style={{
              position: "absolute",
              left: "-4%",
              top: "52%",
              width: `${108 * pRisco}%`,
              height: 16,
              borderRadius: 8,
              backgroundColor: COR.branco,
              rotate: "-3deg",
            }}
          />
        </div>
      </div>
    </TelaCheia>
  );
};
