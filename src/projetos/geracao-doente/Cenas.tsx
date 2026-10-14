import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { entrada } from "../../estilo/animacao";
import type { PalavraTempo } from "../../estilo/FraseApoio";
import { Palavra } from "../../estilo/Palavra";
import { TelaCheia } from "../../estilo/TelaCheia";
import { AREA_SEGURA, COR, FONTE, LARGURA_UTIL } from "../../estilo/tokens";

const blocoCentral = (top: number): React.CSSProperties => ({
  position: "absolute",
  left: AREA_SEGURA.esquerda,
  width: LARGURA_UTIL,
  top,
  textAlign: "center",
  fontFamily: FONTE,
});

const Linha: React.FC<{ readonly palavras: PalavraTempo[] }> = ({ palavras }) => (
  <>
    {palavras.map((p, i) => (
      <Palavra key={i} texto={(i > 0 ? " " : "") + p.texto} em={p.em} />
    ))}
  </>
);

// "segundo a OMS — 1 em 7 — adolescentes", com 7 bonequinhos.
export const TelaOMS: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly fonte: PalavraTempo[];
  readonly numero: PalavraTempo[];
  readonly destaque: PalavraTempo;
}> = ({ em, fim, fonte, numero, destaque }) => {
  const frame = useCurrentFrame();
  const pAzul = entrada(frame, destaque.em, 5);
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.creme}>
      <div style={{ ...blocoCentral(520), fontWeight: 700, fontSize: 56, letterSpacing: "-0.02em", color: COR.texto }}>
        <span style={{ color: COR.azul }}>• </span>
        <Linha palavras={fonte} />
      </div>
      <div style={{ ...blocoCentral(610), fontWeight: 800, fontSize: 300, letterSpacing: "-0.06em", lineHeight: 1.1, color: COR.texto }}>
        <Linha palavras={numero} />
      </div>
      <div style={{ position: "absolute", left: AREA_SEGURA.esquerda + 14, top: 1000, display: "flex", gap: 22 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const azul = i === 0;
          const cor = azul
            ? interpolate(pAzul, [0, 1], [0, 1]) > 0.5
              ? COR.azul
              : COR.cinzaClaro
            : COR.cinzaClaro;
          return (
            <svg
              key={i}
              width={100}
              height={150}
              viewBox="0 0 100 150"
              style={{
                opacity: entrada(frame, em + 3 + i * 2, 4),
                scale: azul ? interpolate(pAzul, [0, 0.5, 1], [1, 1.18, 1]) : 1,
              }}
            >
              <circle cx={50} cy={32} r={26} fill={cor} />
              <rect x={14} y={66} width={72} height={84} rx={34} fill={cor} />
            </svg>
          );
        })}
      </div>
      <div style={{ ...blocoCentral(1190), fontWeight: 700, fontSize: 56, letterSpacing: "-0.02em", color: COR.azul }}>
        <Palavra texto={destaque.texto} em={destaque.em} />
      </div>
    </TelaCheia>
  );
};

const NOTIFICACOES = [
  { app: "Mensagens", texto: "Você tem novas mensagens", cor: "#34C759" },
  { app: "Vídeos", texto: "Novo vídeo curto pra você", cor: "#FF2D55" },
  { app: "Curtidas", texto: "Alguém curtiu sua foto", cor: "#FF9500" },
  { app: "Ao vivo", texto: "Não perca: ao vivo agora", cor: "#AF52DE" },
];

// Notificações pipocando e "dopamina barata" em branco.
export const TelaNotificacoes: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly frase: PalavraTempo[];
}> = ({ em, fim, frase }) => {
  const frame = useCurrentFrame();
  const apaga = interpolate(frame, [frase[0].em, frase[0].em + 4], [1, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.preto}>
      {NOTIFICACOES.map((n, i) => {
        const p = entrada(frame, em + i * 3, 4);
        return (
          <div
            key={n.app}
            style={{
              position: "absolute",
              left: AREA_SEGURA.esquerda,
              width: LARGURA_UTIL,
              top: 300 + i * 165,
              height: 140,
              borderRadius: 36,
              backgroundColor: "rgba(255,255,255,0.16)",
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "0 30px",
              boxSizing: "border-box",
              opacity: p * apaga,
              translate: `0px ${interpolate(p, [0, 1], [-30, 0])}px`,
              scale: interpolate(p, [0, 1], [0.94, 1]),
              fontFamily: FONTE,
              color: COR.branco,
            }}
          >
            <div style={{ width: 76, height: 76, borderRadius: 18, backgroundColor: n.cor, flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 32, opacity: 0.7 }}>{n.app} · agora</div>
              <div style={{ fontWeight: 600, fontSize: 40 }}>{n.texto}</div>
            </div>
          </div>
        );
      })}
      <div style={{ ...blocoCentral(1010), fontWeight: 800, fontSize: 170, letterSpacing: "-0.06em", lineHeight: 1.0, color: COR.branco }}>
        {frase.map((p, i) => (
          <div key={i}>
            <Palavra texto={p.texto} em={p.em} />
          </div>
        ))}
      </div>
    </TelaCheia>
  );
};

// "comparação" repetida em eco (como o "revolução revolução" do V3).
export const TelaComparacao: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly palavra: string;
}> = ({ em, fim, palavra }) => {
  const frame = useCurrentFrame();
  const sobe = interpolate(frame, [em, fim], [0, -60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const linhas = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.preto}>
      <AbsoluteFill style={{ translate: `0px ${sobe}px` }}>
        {linhas.map((l) => {
          const opacidadeBase = [1, 0.55, 0.3, 0.14][Math.abs(l)];
          return (
            <div
              key={l}
              style={{
                ...blocoCentral(800 + l * 128),
                fontWeight: 800,
                fontSize: 120,
                letterSpacing: "-0.05em",
                lineHeight: 1,
                color: COR.branco,
                opacity: opacidadeBase * entrada(frame, em + Math.abs(l) * 2, 4),
              }}
            >
              {palavra}
            </div>
          );
        })}
      </AbsoluteFill>
    </TelaCheia>
  );
};

// "← { como melhorar o corpo? } →" em branco sobre azul.
export const TelaPergunta: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly palavras: PalavraTempo[];
}> = ({ em, fim, palavras }) => (
  <TelaCheia em={em} fim={fim} fundo={COR.azul}>
    <div style={{ ...blocoCentral(880), fontWeight: 700, fontSize: 62, letterSpacing: "-0.03em", color: COR.branco, whiteSpace: "pre" }}>
      {"← { "}
      <Linha palavras={palavras} />
      {" } →"}
    </div>
  </TelaCheia>
);

// "e perder sua / qualidade de vida / no processo."
export const TelaQualidade: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly antes: PalavraTempo[];
  readonly qualidade: PalavraTempo;
  readonly deVida: PalavraTempo[];
  readonly depois: PalavraTempo[];
}> = ({ em, fim, antes, qualidade, deVida, depois }) => {
  const frame = useCurrentFrame();
  const pOnda = entrada(frame, deVida[deVida.length - 1].em + 3, 9);
  return (
    <TelaCheia em={em} fim={fim} fundo={COR.creme} saiSuave={false}>
      <div style={{ ...blocoCentral(640), fontWeight: 700, fontSize: 56, letterSpacing: "-0.02em", color: COR.texto }}>
        <Linha palavras={antes} />
      </div>
      <div style={{ ...blocoCentral(730), fontWeight: 800, fontSize: 190, letterSpacing: "-0.06em", lineHeight: 1.0, color: COR.texto }}>
        <div>
          <Palavra texto={qualidade.texto} em={qualidade.em} />
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Linha palavras={deVida} />
          <svg viewBox="0 0 400 24" preserveAspectRatio="none" style={{ position: "absolute", left: 0, top: "100%", width: "100%", height: 26, overflow: "visible" }}>
            <path
              d="M0 12 Q 12.5 0 25 12 T 50 12 T 75 12 T 100 12 T 125 12 T 150 12 T 175 12 T 200 12 T 225 12 T 250 12 T 275 12 T 300 12 T 325 12 T 350 12 T 375 12 T 400 12"
              fill="none"
              stroke={COR.azul}
              strokeWidth={9}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - pOnda}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
      <div style={{ ...blocoCentral(1180), fontWeight: 700, fontSize: 56, letterSpacing: "-0.02em", color: COR.texto }}>
        <Linha palavras={depois} />
      </div>
    </TelaCheia>
  );
};
