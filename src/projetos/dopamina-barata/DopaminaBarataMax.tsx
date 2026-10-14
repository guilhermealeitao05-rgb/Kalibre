import { Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AtrasDaPessoa } from "../../estilo/AtrasDaPessoa";
import { BarraCarregamento, CardBateria, Celular, Checklist, ContadorNotificacao, Diagrama, Enquete, GradeCards, Pilula } from "../../estilo/Cards";
import { CardPerfil } from "../../estilo/CardPerfil";
import { Flash } from "../../estilo/Flash";
import { IconeLanche, IconePlay, IconeRaio, IconeSino } from "../../estilo/Icones";
import { ListaChaves } from "../../estilo/ListaChaves";
import { PalavraGigante } from "../../estilo/PalavraGigante";
import { Sfx } from "../../estilo/Sfx";
import { TelaFinal } from "../../estilo/TelaFinal";
import { COR } from "../../estilo/tokens";
import { useFonteCarregada } from "../../estilo/useFonte";
import { TelaDopamina, TelaImediato, TelaPensamentos, TelaQuestionamento } from "./Cenas";
import { LINHA, VIDEO } from "./dados";
import { Legenda } from "./Legenda";

const { f, w, trechos, fimDaFala, duracaoTotal, punch, trechoNoQuadro, recorteNoQuadro, origemZoom } = LINHA;

// Palavras da legenda com caixa azul (texto branco).
const AZUL = { fundo: COR.azul, cor: COR.branco };
const DESTAQUES = {
  16: AZUL, 21: AZUL, 42: AZUL, 76: AZUL, 118: AZUL, 122: AZUL,
  126: AZUL, 134: AZUL, 140: AZUL, 146: AZUL, 148: AZUL,
};

// Tremida de câmera curta (decai em ~10 quadros) nos impactos.
const tremida = (quadro: number, inicios: number[]) => {
  let x = 0;
  let y = 0;
  for (const p of inicios) {
    const d = quadro - p;
    if (d >= 0 && d < 10) {
      const a = 16 * Math.exp(-d / 3.5);
      x += a * Math.sin(d * 2.3);
      y += a * Math.cos(d * 1.9);
    }
  }
  return { x, y };
};

// Versão MÁXIMA (teste A/B): tudo da versão aprovada + zoom contínuo, tremidas,
// flashes, palavras em caixa azul, bateria, 2 telas cheias extras e mais efeitos sonoros.
export const DopaminaBarataMax: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonte = useFonteCarregada();

  const t = trechoNoQuadro(frame);
  // Zoom contínuo: cada trecho aproxima 3,5% devagar do começo ao fim.
  const deriva = t ? interpolate(frame, [t.inicioEditado, t.inicioEditado + t.duracao], [1, 1.035]) : 1;
  const enfase = punch(frame, [f(12), f(21), f(27), f(49), f(72), f(93), f(140), f(146)]);
  const { x: tx, y: ty } = tremida(frame, [f(12), f(93), f(140)]);
  const escala = deriva * enfase;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {trechos.map((tr, i) => (
        <Video
          key={i}
          name={`Trecho ${i + 1}`}
          src={VIDEO}
          from={tr.inicioEditado}
          durationInFrames={tr.duracao}
          trimBefore={tr.inicioOriginal}
          volume={0.5}
          premountFor={fps}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            scale: tr.zoom * escala,
            translate: `${tx}px ${ty}px`,
            transformOrigin: `${origemZoom.x}px ${origemZoom.y}px`,
          }}
        />
      ))}

      {fonte ? (
        <>
          <AtrasDaPessoa recorte={recorteNoQuadro(frame, escala, tx, ty)}>
            <PalavraGigante brilho linhaDeBase={540} texto="difícil" em={f(8)} fim={f(12)} />
            <PalavraGigante brilho linhaDeBase={540} texto="nada?" em={f(12)} fim={f(13) + 8} />
            <PalavraGigante brilho linhaDeBase={540} texto="celular." em={f(23)} fim={f(24) + 4} />
            <PalavraGigante brilho linhaDeBase={540} texto="estímulos" em={f(27)} fim={f(31)} />
            <PalavraGigante brilho linhaDeBase={540} texto="imediatismo" em={f(49)} fim={f(50)} />
            <PalavraGigante brilho linhaDeBase={540} texto="prazer" sufixo="↓" em={f(72)} fim={f(75)} />
            <ListaChaves linhas={[w(75, 78, ["coisas", "simples", "da", "vida"])]} fim={f(79)} topo={380} brilho />
            <PalavraGigante brilho linhaDeBase={540} texto="difícil" risco={f(94)} em={f(93)} fim={f(94) + 6} />
            <PalavraGigante brilho linhaDeBase={540} texto="escravo" sufixo="?" em={f(140)} fim={f(142)} />
          </AtrasDaPessoa>
          <BarraCarregamento em={f(49) + 2} fim={f(50)} topo={585} />

          <Legenda destaques={DESTAQUES} semPaginas={[58]} />

          <Celular em={f(19)} fim={f(24) + 6} />
          <ContadorNotificacao em={f(27)} ate={f(30) + 4} fim={f(31) + 6} />
          <GradeCards
            fim={f(61)}
            itens={[
              { texto: "vídeos curtos", em: f(50), icone: <IconePlay tamanho={52} /> },
              { texto: "notificações", em: f(52), icone: <IconeSino tamanho={52} /> },
              { texto: "comidas hiperpalatáveis", em: f(53), icone: <IconeLanche tamanho={52} /> },
              { texto: "recompensas imediatas", em: f(56), icone: <IconeRaio tamanho={52} /> },
            ]}
          />
          <Pilula texto="↻ o tempo inteiro" em={f(58)} fim={f(61)} topo={255} />
          <CardBateria rotulo="prazer com coisas simples" em={f(71)} ate={f(73)} fim={f(75)} />
          <Checklist
            topo={960}
            fim={f(92)}
            itens={[
              { texto: "se alimentar bem", em: f(82) },
              { texto: "treinar", em: f(84) },
              { texto: "construir bons hábitos", em: f(85) },
              { texto: "cuidar da própria saúde", em: f(88) },
            ]}
          />
          <Diagrama topo={985} fim={f(127) + 4} nos={[{ texto: "hábitos", em: f(118) }, { texto: "atenção", em: f(122) }, { texto: "escolhas", em: f(126) }]} />
          <Pilula texto="comenta aqui ↓" em={f(128)} fim={f(131)} topo={1000} />
          <Enquete
            pergunta="você controla os seus hábitos?"
            em={f(131)}
            fim={f(142)}
            opcoes={[
              { texto: "controlo", em: f(134) },
              { texto: "virei escravo deles", em: f(140), destaque: true },
            ]}
          />
          <CardPerfil em={f(144)} fim={fimDaFala} nome="Guilherme Antunes" arroba="@guilherme_antuness" iniciais="GA" foto={staticFile("perfil/foto.jpg")} />

          <TelaPensamentos em={f(35)} fim={f(40)} antes={w(35, 38)} palavra={w(39, 39, ["pensamentos"])} />
          <TelaQuestionamento em={f(64)} fim={f(66)} antes={w(61, 64)} palavra={w(65, 65, ["questionamento"])} />
          <TelaImediato em={f(101)} fim={f(103)} palavras={w(101, 102)} />
          <TelaDopamina em={f(103)} fim={f(112)} eNao={w(103, 104)} suaDopamina={w(105, 107)} naoEstaSendo={w(108, 110)} destruida={w(111)[0]} />
          <TelaFinal em={fimDaFala} fim={duracaoTotal} arroba="@guilherme_antuness" botao="me segue para mais →" />
        </>
      ) : null}

      <Flash em={[f(12), f(35), f(64), f(101), f(103), f(111) + 6, fimDaFala]} />

      {/* Efeitos sonoros (~18 dB abaixo da voz). */}
      <Sfx som="whoosh" em={f(8) - 4} />
      <Sfx som="impacto" em={f(12)} />
      <Sfx som="pop" em={f(16)} />
      <Sfx som="pop" em={f(19)} />
      <Sfx som="swish" em={f(21)} />
      <Sfx som="whoosh" em={f(23) - 4} />
      <Sfx som="tick" em={f(27)} />
      <Sfx som="tick" em={f(27) + 6} />
      <Sfx som="tick" em={f(27) + 11} />
      <Sfx som="tick" em={f(27) + 15} />
      <Sfx som="tick" em={f(27) + 18} />
      <Sfx som="tick" em={f(27) + 20} />
      <Sfx som="tick" em={f(27) + 22} />
      <Sfx som="whoosh" em={f(35) - 6} />
      <Sfx som="whoosh" em={f(40) - 6} />
      <Sfx som="pop" em={f(42)} />
      <Sfx som="swish" em={f(49)} />
      <Sfx som="pop" em={f(50)} />
      <Sfx som="pop" em={f(52)} />
      <Sfx som="pop" em={f(53)} />
      <Sfx som="pop" em={f(56)} />
      <Sfx som="pop" em={f(58)} />
      <Sfx som="whoosh" em={f(64) - 6} />
      <Sfx som="impacto" em={f(65)} />
      <Sfx som="whoosh" em={f(66) - 6} />
      <Sfx som="pop" em={f(71)} />
      <Sfx som="tick" em={f(71) + 8} />
      <Sfx som="tick" em={f(71) + 14} />
      <Sfx som="tick" em={f(75)} />
      <Sfx som="pop" em={f(76)} />
      <Sfx som="tick" em={f(78)} />
      <Sfx som="tick" em={f(82)} />
      <Sfx som="tick" em={f(84)} />
      <Sfx som="tick" em={f(85)} />
      <Sfx som="tick" em={f(88)} />
      <Sfx som="impacto" em={f(93)} />
      <Sfx som="swish" em={f(94)} />
      <Sfx som="whoosh" em={f(101) - 6} />
      <Sfx som="whoosh" em={f(103) - 4} />
      <Sfx som="impacto" em={f(111) + 6} />
      <Sfx som="whoosh" em={f(112) - 6} />
      <Sfx som="pop" em={f(118)} />
      <Sfx som="pop" em={f(122)} />
      <Sfx som="pop" em={f(126)} />
      <Sfx som="pop" em={f(128)} />
      <Sfx som="pop" em={f(131)} />
      <Sfx som="tick" em={f(134)} />
      <Sfx som="impacto" em={f(140)} />
      <Sfx som="pop" em={f(144)} />
      <Sfx som="pop" em={f(146)} />
      <Sfx som="whoosh" em={fimDaFala - 6} />
      <Sfx som="tick" em={fimDaFala + 10} />
    </AbsoluteFill>
  );
};
