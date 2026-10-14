import { Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AtrasDaPessoa } from "../../estilo/AtrasDaPessoa";
import { CardPerfil } from "../../estilo/CardPerfil";
import { PalavraGigante } from "../../estilo/PalavraGigante";
import { Sfx } from "../../estilo/Sfx";
import { TelaFinal } from "../../estilo/TelaFinal";
import { useFonteCarregada } from "../../estilo/useFonte";
import { TelaDopamina } from "./Cenas";
import { LINHA, VIDEO } from "./dados";
import { Legenda } from "./Legenda";

const { f, w, trechos, fimDaFala, duracaoTotal, recorteNoQuadro, origemZoom } = LINHA;

// Versão LEVE (teste A/B): só legenda, 6 palavras gigantes, 1 tela cheia e o CTA.
// Sem cards por cima do corpo, sem punch-ins e com poucos efeitos sonoros.
export const DopaminaBarataLeve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonte = useFonteCarregada();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {trechos.map((t, i) => (
        <Video
          key={i}
          name={`Trecho ${i + 1}`}
          src={VIDEO}
          from={t.inicioEditado}
          durationInFrames={t.duracao}
          trimBefore={t.inicioOriginal}
          volume={0.5}
          premountFor={fps}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            scale: t.zoom,
            transformOrigin: `${origemZoom.x}px ${origemZoom.y}px`,
          }}
        />
      ))}

      {fonte ? (
        <>
          <AtrasDaPessoa recorte={recorteNoQuadro(frame)}>
            <PalavraGigante brilho linhaDeBase={540} texto="difícil" em={f(8)} fim={f(12)} />
            <PalavraGigante brilho linhaDeBase={540} texto="nada?" em={f(12)} fim={f(13) + 8} />
            <PalavraGigante brilho linhaDeBase={540} texto="estímulos" em={f(27)} fim={f(31)} />
            <PalavraGigante brilho linhaDeBase={540} texto="imediatismo" em={f(49)} fim={f(50)} />
            <PalavraGigante brilho linhaDeBase={540} texto="prazer" em={f(72)} fim={f(75)} />
            <PalavraGigante brilho linhaDeBase={540} texto="escravo" em={f(140)} fim={f(142)} />
          </AtrasDaPessoa>

          <Legenda />

          <CardPerfil em={f(144)} fim={fimDaFala} nome="Guilherme Antunes" arroba="@guilherme_antuness" iniciais="GA" foto={staticFile("perfil/foto.jpg")} />
          <TelaDopamina em={f(103)} fim={f(112)} eNao={w(103, 104)} suaDopamina={w(105, 107)} naoEstaSendo={w(108, 110)} destruida={w(111)[0]} />
          <TelaFinal em={fimDaFala} fim={duracaoTotal} arroba="@guilherme_antuness" botao="me segue para mais →" />
        </>
      ) : null}

      <Sfx som="whoosh" em={f(8) - 4} />
      <Sfx som="impacto" em={f(12)} />
      <Sfx som="whoosh" em={f(103) - 6} />
      <Sfx som="impacto" em={f(111) + 6} />
      <Sfx som="whoosh" em={f(112) - 6} />
      <Sfx som="pop" em={f(144)} />
      <Sfx som="whoosh" em={fimDaFala - 6} />
      <Sfx som="tick" em={fimDaFala + 10} />
    </AbsoluteFill>
  );
};
