import { Audio, Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AtrasDaPessoa } from "../../estilo/AtrasDaPessoa";
import { CaixaAzul } from "../../estilo/CaixaAzul";
import { CardPerfil } from "../../estilo/CardPerfil";
import { FraseApoio } from "../../estilo/FraseApoio";
import { ListaChaves } from "../../estilo/ListaChaves";
import { PalavraGigante } from "../../estilo/PalavraGigante";
import { useFonteCarregada } from "../../estilo/useFonte";
import { TelaComparacao, TelaFinal, TelaNotificacoes, TelaOMS, TelaPergunta, TelaQualidade } from "./Cenas";
import { DURACAO_TOTAL, f, FIM_DA_FALA, ORIGEM_ZOOM, recorteNoQuadro, TRECHOS, VIDEO, w } from "./dados";

// Efeitos sonoros gerados para o estúdio (public/sfx), sem direito autoral.
const Sfx: React.FC<{ readonly som: "whoosh" | "swish" | "tick" | "pop" | "impacto"; readonly em: number }> = ({ som, em }) => {
  const { fps } = useVideoConfig();
  return <Audio src={staticFile(`sfx/${som}.wav`)} from={Math.max(0, em)} premountFor={fps} />;
};

// Plano aprovado: projetos/geracao-doente/plano.md (estilo V3).
export const GeracaoDoente: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonte = useFonteCarregada();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Vídeo com as pausas cortadas. Em cada corte, alterna o enquadramento 100% / 108%. */}
      {TRECHOS.map((t, i) => (
        <Video
          key={i}
          name={`Trecho ${i + 1}`}
          src={VIDEO}
          from={t.inicioEditado}
          durationInFrames={t.duracao}
          trimBefore={t.inicioOriginal}
          premountFor={fps}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            scale: t.zoom,
            transformOrigin: `${ORIGEM_ZOOM.x}px ${ORIGEM_ZOOM.y}px`,
          }}
        />
      ))}

      {fonte ? (
        <>
          {/* Atrás da cabeça: palavras gigantes e listas entre chaves. */}
          <AtrasDaPessoa recorte={recorteNoQuadro(frame)}>
            <PalavraGigante texto="saúde" em={f(8)} fim={f(16)} risco={f(14)} />
            <PalavraGigante texto="doente." em={f(16)} fim={f(18)} />
            <ListaChaves linhas={[w(22, 23), w(24, 27, ["corpo", "perfeito,", "saúde", "mental"])]} fim={f(28)} />
            <PalavraGigante texto="saudáveis?" em={f(36)} fim={f(38)} />
            <PalavraGigante texto="mental." em={f(52)} fim={f(54)} />
            <PalavraGigante texto="estímulo." em={f(70)} fim={f(72)} />
            <PalavraGigante texto="rápidos" sufixo="→" em={f(77)} fim={f(80)} />
            <ListaChaves linhas={[w(88, 89, ["esforço,", "disciplina,"]), w(91, 91, ["constância"])]} fim={f(92)} />
            <PalavraGigante texto="difícil." em={f(95)} fim={f(97)} />
            <PalavraGigante texto="aumenta" sufixo="↑" ondulado={f(99) + 2} em={f(99)} fim={f(101)} />
            <PalavraGigante texto="obsessão." em={f(115)} fim={f(117)} />
            <PalavraGigante texto="ansioso," em={f(130)} fim={f(134)} />
            <PalavraGigante texto="corpo perfeito." risco={f(135)} em={f(134)} fim={f(136) + 6} />
            <PalavraGigante texto="refletir" em={f(150)} fim={f(155)} />
            <PalavraGigante texto="prejudicial" em={f(165)} fim={f(171)} />
            <PalavraGigante texto="físico" em={f(176)} fim={f(180)} />
          </AtrasDaPessoa>

          {/* Legenda = frase de apoio no topo, palavra por palavra. */}
          <FraseApoio palavras={w(0, 3)} fim={f(4)} />
          <FraseApoio palavras={w(4, 7)} fim={f(9)} />
          <FraseApoio palavras={w(9, 15)} fim={f(17)} />
          <FraseApoio palavras={w(17, 21)} fim={f(28)} />
          <FraseApoio palavras={w(28, 31)} fim={f(32)} />
          <FraseApoio palavras={w(32, 35)} fim={f(37)} />
          <FraseApoio palavras={w(37, 40)} fim={f(41)} />
          <FraseApoio palavras={w(48, 51)} fim={f(53)} />
          <FraseApoio palavras={w(53, 56)} fim={f(57)} />
          <FraseApoio palavras={w(57, 59)} fim={f(60)} />
          <FraseApoio palavras={w(63, 64)} fim={f(65)} />
          <FraseApoio palavras={w(65, 67)} fim={f(68)} />
          <FraseApoio palavras={w(68, 69)} fim={f(71)} />
          <FraseApoio palavras={w(71, 73)} fim={f(74)} />
          <FraseApoio palavras={w(74, 76)} fim={f(78)} />
          <FraseApoio palavras={w(78, 79)} fim={f(80)} />
          <FraseApoio palavras={w(80, 84)} fim={f(85)} />
          <FraseApoio palavras={w(85, 87)} fim={f(92)} />
          <FraseApoio palavras={w(92, 94)} fim={f(96)} />
          <FraseApoio palavras={w(96, 98)} fim={f(101)} />
          <FraseApoio palavras={w(104, 109)} fim={f(110)} />
          <FraseApoio palavras={w(110, 114)} fim={f(116)} />
          <FraseApoio palavras={w(116, 119)} fim={f(120)} />
          <FraseApoio palavras={w(120, 122)} fim={f(123)} />
          <FraseApoio palavras={w(123, 125)} fim={f(126)} />
          <FraseApoio palavras={w(126, 129)} fim={f(131)} />
          <FraseApoio palavras={w(131, 133)} fim={f(136)} />
          <FraseApoio palavras={w(136, 139)} fim={f(140)} />
          <FraseApoio palavras={w(140, 143)} fim={f(144)} />
          <FraseApoio palavras={w(148, 149)} fim={f(151)} />
          <FraseApoio palavras={w(151, 154)} fim={f(158)} />
          <FraseApoio palavras={w(158, 162)} fim={f(163)} />
          <FraseApoio palavras={w(163, 164)} fim={f(166)} />
          <FraseApoio palavras={w(166, 170)} fim={f(171)} />
          <FraseApoio palavras={w(171, 173)} fim={f(174)} />
          <FraseApoio palavras={w(174, 175)} fim={f(177)} />
          <FraseApoio palavras={w(177, 179)} fim={f(180)} />

          <CaixaAzul palavras={w(155, 157)} fim={f(163)} />
          <CardPerfil em={f(116)} fim={f(116) + 66} nome="Guilherme Antunes" arroba="@guilherme_antuness" iniciais="GA" />

          {/* Telas cheias. */}
          <TelaOMS em={f(41)} fim={f(48)} fonte={w(41, 43, ["segundo", "a", "OMS"])} numero={w(44, 46, ["1", "em", "7"])} destaque={w(47)[0]} />
          <TelaNotificacoes em={f(60)} fim={f(63)} frase={w(61, 62, ["dopamina", "barata"])} />
          <TelaComparacao em={f(101)} fim={f(104)} palavra="comparação" />
          <TelaPergunta em={f(144)} fim={f(148)} palavras={w(144, 147, ["como", "melhorar", "o", "corpo?"])} />
          <TelaQualidade em={f(180)} fim={FIM_DA_FALA} antes={w(180, 182)} qualidade={w(183)[0]} deVida={w(184, 185)} depois={w(186, 187)} />
          <TelaFinal em={FIM_DA_FALA} fim={DURACAO_TOTAL} arroba="@guilherme_antuness" botao="me segue para mais →" />
        </>
      ) : null}

      {/* Efeitos sonoros (~15–20 dB abaixo da voz). */}
      <Sfx som="whoosh" em={f(8) - 4} />
      <Sfx som="swish" em={f(14)} />
      <Sfx som="impacto" em={f(16)} />
      <Sfx som="tick" em={f(22)} />
      <Sfx som="tick" em={f(23)} />
      <Sfx som="tick" em={f(24)} />
      <Sfx som="tick" em={f(26)} />
      <Sfx som="whoosh" em={f(41) - 6} />
      <Sfx som="tick" em={f(46)} />
      <Sfx som="pop" em={f(47)} />
      <Sfx som="whoosh" em={f(48) - 6} />
      <Sfx som="pop" em={f(60)} />
      <Sfx som="pop" em={f(60) + 3} />
      <Sfx som="pop" em={f(60) + 6} />
      <Sfx som="pop" em={f(60) + 9} />
      <Sfx som="whoosh" em={f(63) - 6} />
      <Sfx som="tick" em={f(88)} />
      <Sfx som="tick" em={f(89)} />
      <Sfx som="tick" em={f(91)} />
      <Sfx som="swish" em={f(99) + 2} />
      <Sfx som="whoosh" em={f(101) - 6} />
      <Sfx som="pop" em={f(116)} />
      <Sfx som="swish" em={f(135)} />
      <Sfx som="whoosh" em={f(144) - 6} />
      <Sfx som="whoosh" em={f(148) - 6} />
      <Sfx som="whoosh" em={f(180) - 6} />
      <Sfx som="whoosh" em={FIM_DA_FALA - 6} />
      <Sfx som="tick" em={FIM_DA_FALA + 10} />
    </AbsoluteFill>
  );
};
