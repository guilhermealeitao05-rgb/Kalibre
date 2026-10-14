import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { entrada, saida, visivel } from "./animacao";
import { IconeCheck, IconeSeta, IconeSino } from "./Icones";
import { Palavra } from "./Palavra";
import type { PalavraTempo } from "./FraseApoio";
import { AREA_SEGURA, CENTRO_X, COR, FONTE, LARGURA_UTIL } from "./tokens";

// Cards brancos que entram por cima do corpo (metade de baixo, dentro da área segura).
const SOMBRA = "0 18px 50px rgba(0,0,0,0.22)";

// Entrada de card: sobe 40 px com fade e um leve "pop" de escala.
const useEntradaCard = (em: number, fim: number) => {
  const frame = useCurrentFrame();
  const p = entrada(frame, em, 6);
  const s = saida(frame, fim, 5);
  return {
    opacity: Math.min(p, s),
    translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
    scale: interpolate(p, [0, 0.7, 1], [0.92, 1.02, 1]),
  };
};

const Card: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly style: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ em, fim, style, children }) => {
  const anim = useEntradaCard(em, fim);
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: COR.branco,
        borderRadius: 32,
        boxShadow: SOMBRA,
        fontFamily: FONTE,
        color: COR.texto,
        boxSizing: "border-box",
        ...anim,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export type ItemGrade = { readonly texto: string; readonly em: number; readonly icone: React.ReactNode };

// Grade 2x2 de cards, cada um entra quando o item é falado.
export const GradeCards: React.FC<{
  readonly itens: ItemGrade[];
  readonly fim: number;
  readonly topo?: number;
}> = ({ itens, fim, topo = 920 }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, itens[0].em, fim)) {
    return null;
  }
  const larg = (LARGURA_UTIL - 24) / 2;
  return (
    <>
      {itens.map((it, i) =>
        frame >= it.em ? (
          <Card
            key={i}
            em={it.em}
            fim={fim}
            style={{
              left: AREA_SEGURA.esquerda + (i % 2) * (larg + 24),
              top: topo + Math.floor(i / 2) * 250,
              width: larg,
              height: 226,
              padding: "26px 28px",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 22,
                backgroundColor: COR.azul,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {it.icone}
            </div>
            <div style={{ marginTop: 16, fontWeight: 800, fontSize: 42, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
              {it.texto}
            </div>
          </Card>
        ) : null,
      )}
    </>
  );
};

// Checklist com caixinhas vazias.
export const Checklist: React.FC<{
  readonly itens: PalavraTempo[];
  readonly fim: number;
  readonly topo?: number;
}> = ({ itens, fim, topo = 900 }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, itens[0].em, fim)) {
    return null;
  }
  return (
    <Card em={itens[0].em} fim={fim} style={{ left: AREA_SEGURA.esquerda + 30, top: topo, width: LARGURA_UTIL - 60, padding: "34px 40px" }}>
      {itens.map((it, i) => {
        const p = entrada(frame, it.em, 4);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: i === 0 ? 0 : 22,
              opacity: p,
              translate: `${interpolate(p, [0, 1], [-20, 0])}px 0px`,
            }}
          >
            <IconeCheck tamanho={58} />
            <span style={{ fontWeight: 700, fontSize: 46, letterSpacing: "-0.03em" }}>{it.texto}</span>
          </div>
        );
      })}
    </Card>
  );
};

// Diagrama vertical: pílulas ligadas por setas azuis.
export const Diagrama: React.FC<{
  readonly nos: PalavraTempo[];
  readonly fim: number;
  readonly topo?: number;
}> = ({ nos, fim, topo = 880 }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, nos[0].em, fim)) {
    return null;
  }
  return (
    <>
      {nos.map((n, i) => {
        const y = topo + i * 190;
        return frame >= n.em ? (
          <div key={i}>
            {i > 0 ? (
              <div
                style={{
                  position: "absolute",
                  left: CENTRO_X - 28,
                  top: y - 74,
                  opacity: entrada(frame, n.em, 4),
                }}
              >
                <IconeSeta tamanho={56} />
              </div>
            ) : null}
            <Card
              em={n.em}
              fim={fim}
              style={{
                left: CENTRO_X - 230,
                top: y,
                width: 460,
                height: 110,
                borderRadius: 55,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 54,
                letterSpacing: "-0.04em",
                backgroundColor: i === nos.length - 1 ? COR.azul : COR.branco,
                color: i === nos.length - 1 ? COR.branco : COR.texto,
              }}
            >
              {n.texto}
            </Card>
          </div>
        ) : null;
      })}
    </>
  );
};

// Enquete no estilo do Instagram (sem porcentagens, para não inventar dado).
export const Enquete: React.FC<{
  readonly pergunta: string;
  readonly em: number;
  readonly opcoes: { texto: string; em: number; destaque?: boolean }[];
  readonly fim: number;
  readonly topo?: number;
}> = ({ pergunta, em, opcoes, fim, topo = 930 }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  return (
    <Card em={em} fim={fim} style={{ left: AREA_SEGURA.esquerda + 40, top: topo, width: LARGURA_UTIL - 80, padding: "36px 40px" }}>
      <div style={{ fontWeight: 800, fontSize: 50, letterSpacing: "-0.04em", lineHeight: 1.08 }}>{pergunta}</div>
      {opcoes.map((o, i) => {
        const p = entrada(frame, o.em, 5);
        return (
          <div
            key={i}
            style={{
              marginTop: 24,
              height: 100,
              borderRadius: 26,
              border: o.destaque ? "none" : "4px solid #DDD7D2",
              backgroundColor: o.destaque ? COR.azul : COR.branco,
              color: o.destaque ? COR.branco : COR.texto,
              display: "flex",
              alignItems: "center",
              padding: "0 36px",
              boxSizing: "border-box",
              fontWeight: 700,
              fontSize: 44,
              letterSpacing: "-0.03em",
              opacity: p,
              scale: interpolate(p, [0, 0.7, 1], [0.9, 1.03, 1]),
            }}
          >
            {o.texto}
          </div>
        );
      })}
    </Card>
  );
};

// Pílula azul (CTA curto ou selo), centralizada na área segura.
export const Pilula: React.FC<{
  readonly texto: string;
  readonly em: number;
  readonly fim: number;
  readonly topo: number;
}> = ({ texto, em, fim, topo }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  return (
    <div style={{ position: "absolute", left: AREA_SEGURA.esquerda, width: LARGURA_UTIL, top: topo, display: "flex", justifyContent: "center" }}>
      <Card
        em={em}
        fim={fim}
        style={{
          position: "relative",
          backgroundColor: COR.azul,
          color: COR.branco,
          borderRadius: 60,
          padding: "20px 44px",
          fontWeight: 800,
          fontSize: 50,
          letterSpacing: "-0.03em",
          whiteSpace: "pre",
        }}
      >
        {texto}
      </Card>
    </div>
  );
};

// Sino de notificação com contador vermelho subindo até "99+".
export const ContadorNotificacao: React.FC<{
  readonly em: number;
  readonly ate: number;
  readonly fim: number;
}> = ({ em, ate, fim }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  // Acelera: cresce devagar no começo e dispara no fim.
  const t = interpolate(frame, [em, ate], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const n = Math.max(1, Math.round(1 + 98 * t * t));
  const texto = n >= 99 ? "99+" : String(n);
  const pulso = interpolate((frame - em) % 4, [0, 2, 4], [1, 1.12, 1]);
  return (
    <Card em={em} fim={fim} style={{ left: 640, top: 960, width: 220, height: 220, borderRadius: 52, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: COR.azul }}>
      <IconeSino tamanho={120} />
      <div
        style={{
          position: "absolute",
          right: -18,
          top: -18,
          minWidth: 92,
          height: 92,
          padding: "0 14px",
          boxSizing: "border-box",
          borderRadius: 46,
          backgroundColor: "#FF3B30",
          color: COR.branco,
          fontWeight: 800,
          fontSize: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: frame < ate ? pulso : 1,
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        }}
      >
        {texto}
      </div>
    </Card>
  );
};

// Celular com um "feed" de vídeos curtos rolando sem parar.
export const Celular: React.FC<{ readonly em: number; readonly fim: number }> = ({ em, fim }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  const rolagem = ((frame - em) * 9) % 330;
  const cores = ["#2A5BFA", "#FF2D55", "#FF9500", "#34C759", "#AF52DE"];
  return (
    <Card em={em} fim={fim} style={{ left: AREA_SEGURA.esquerda + 10, top: 900, width: 300, height: 560, borderRadius: 54, backgroundColor: "#111", padding: 14 }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 42, overflow: "hidden", backgroundColor: "#222" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: i * 330 - rolagem,
              height: 320,
              backgroundColor: cores[(i + Math.floor((frame - em) / 37)) % cores.length],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={70} height={70} viewBox="0 0 48 48">
              <path d="M17 11 L37 24 L17 37 Z" fill="rgba(255,255,255,0.9)" />
            </svg>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Barra azul de carregamento que enche de 0 a 100% (para "imediatismo").
export const BarraCarregamento: React.FC<{
  readonly em: number;
  readonly fim: number;
  readonly topo: number;
}> = ({ em, fim, topo }) => {
  const frame = useCurrentFrame();
  if (!visivel(frame, em, fim)) {
    return null;
  }
  const p = entrada(frame, em, 6);
  return (
    <div
      style={{
        position: "absolute",
        left: CENTRO_X - 260,
        top: topo,
        width: 520,
        height: 22,
        borderRadius: 11,
        backgroundColor: "rgba(18,16,12,0.15)",
        overflow: "hidden",
      }}
    >
      <div style={{ width: `${100 * p}%`, height: "100%", backgroundColor: COR.azul, borderRadius: 11 }} />
    </div>
  );
};

// Bloco de texto com várias palavras temporizadas (usado nas telas cheias).
export const Bloco: React.FC<{
  readonly palavras: PalavraTempo[];
  readonly topo: number;
  readonly tamanho: number;
  readonly peso?: number;
  readonly cor?: string;
}> = ({ palavras, topo, tamanho, peso = 800, cor = COR.texto }) => (
  <div
    style={{
      position: "absolute",
      left: AREA_SEGURA.esquerda,
      width: LARGURA_UTIL,
      top: topo,
      textAlign: "center",
      fontFamily: FONTE,
      fontWeight: peso,
      fontSize: tamanho,
      letterSpacing: peso >= 800 ? "-0.05em" : "-0.02em",
      lineHeight: 1.05,
      color: cor,
    }}
  >
    {palavras.map((p, i) => (
      <Palavra key={i} texto={(i > 0 ? " " : "") + p.texto} em={p.em} cor={p.cor} />
    ))}
  </div>
);
