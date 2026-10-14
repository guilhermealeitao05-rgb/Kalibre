import { Audio, Video } from "@remotion/media";
import type React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AtrasDaPessoa } from "../../estilo/AtrasDaPessoa";
import { BarraCarregamento, Celular, Checklist, ContadorNotificacao, Diagrama, Enquete, GradeCards, Pilula } from "../../estilo/Cards";
import { CardPerfil } from "../../estilo/CardPerfil";
import { FraseApoio } from "../../estilo/FraseApoio";
import { IconeLanche, IconePlay, IconeRaio, IconeSino } from "../../estilo/Icones";
import { ListaChaves } from "../../estilo/ListaChaves";
import { PalavraGigante } from "../../estilo/PalavraGigante";
import { TelaFinal } from "../../estilo/TelaFinal";
import { COR } from "../../estilo/tokens";
import { useFonteCarregada } from "../../estilo/useFonte";
import { TelaDopamina, TelaPensamentos } from "./Cenas";
import { LINHA, VIDEO } from "./dados";

const { f, w, trechos, fimDaFala, duracaoTotal, punch, recorteNoQuadro, origemZoom } = LINHA;

type Som = "whoosh" | "swish" | "tick" | "pop" | "impacto";
const Sfx: React.FC<{ readonly som: Som; readonly em: number }> = ({ som, em }) => {
  const { fps } = useVideoConfig();
  return <Audio src={staticFile(`sfx/${som}.wav`)} from={Math.max(0, em)} premountFor={fps} />;
};

// Plano aprovado: projetos/dopamina-barata/plano.md (estilo V3, versão mais trabalhada).
export const DopaminaBarata: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fonte = useFonteCarregada();

  // Punch-ins de ênfase em "nada?", "merda" e "escravo".
  const enfase = punch(frame, [f(12), f(21), f(140)]);
  const merdaAzul = w(20, 22).map((p, i) => (i === 1 ? { ...p, cor: COR.azul } : p));

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Vídeo com as pausas cortadas; 100/108% alternado nos cortes + punch-ins. */}
      {trechos.map((t, i) => (
        <Video
          key={i}
          name={`Trecho ${i + 1}`}
          src={VIDEO}
          from={t.inicioEditado}
          durationInFrames={t.duracao}
          trimBefore={t.inicioOriginal}
          // A voz do iPhone chega alta: −6 dB aqui deixa os efeitos ~18 dB abaixo dela.
          volume={0.5}
          premountFor={fps}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            scale: t.zoom * enfase,
            transformOrigin: `${origemZoom.x}px ${origemZoom.y}px`,
          }}
        />
      ))}

      {fonte ? (
        <>
          {/* Atrás da cabeça (com brilho, por causa do quadro colorido na parede). */}
          <AtrasDaPessoa recorte={recorteNoQuadro(frame, enfase)}>
            <PalavraGigante brilho linhaDeBase={540} texto="difícil" em={f(8)} fim={f(12)} />
            <PalavraGigante brilho linhaDeBase={540} texto="nada?" em={f(12)} fim={f(13) + 8} />
            <PalavraGigante brilho linhaDeBase={540} texto="celular." em={f(23)} fim={f(24) + 4} />
            <PalavraGigante brilho linhaDeBase={540} texto="estímulos" em={f(27)} fim={f(31)} />
            <PalavraGigante brilho linhaDeBase={540} texto="imediatismo" em={f(49)} fim={f(50)} />
            <PalavraGigante brilho linhaDeBase={540} texto="questionamento." em={f(65)} fim={f(66)} />
            <PalavraGigante brilho linhaDeBase={540} texto="prazer" sufixo="↓" em={f(72)} fim={f(75)} />
            <ListaChaves linhas={[w(75, 78, ["coisas", "simples", "da", "vida"])]} fim={f(79)} topo={380} brilho />
            <PalavraGigante brilho linhaDeBase={540} texto="difícil" em={f(93)} fim={f(94) + 6} />
            <PalavraGigante brilho linhaDeBase={540} texto="imediatamente." em={f(102)} fim={f(103)} />
          </AtrasDaPessoa>
          <BarraCarregamento em={f(49) + 2} fim={f(50)} topo={585} />

          {/* Legenda = frase de apoio no topo, palavra por palavra. */}
          <FraseApoio palavras={w(0, 4)} fim={f(5)} />
          <FraseApoio palavras={w(5, 7)} fim={f(9)} />
          <FraseApoio palavras={w(9, 11)} fim={f(13)} />
          <FraseApoio palavras={w(13, 16)} fim={f(17)} />
          <FraseApoio palavras={w(17, 19)} fim={f(20)} />
          <FraseApoio palavras={merdaAzul} fim={f(23)} />
          <FraseApoio palavras={w(24, 26)} fim={f(28)} />
          <FraseApoio palavras={w(28, 30)} fim={f(31)} />
          <FraseApoio palavras={w(31, 34)} fim={f(35)} />
          <FraseApoio palavras={w(40, 44)} fim={f(45)} />
          <FraseApoio palavras={w(45, 48)} fim={f(50)} />
          <FraseApoio palavras={w(50, 52)} fim={f(53)} />
          <FraseApoio palavras={w(53, 54)} fim={f(55)} />
          <FraseApoio palavras={w(55, 57)} fim={f(58)} />
          <FraseApoio palavras={w(61, 64)} fim={f(65)} />
          <FraseApoio palavras={w(66, 70)} fim={f(71)} />
          <FraseApoio palavras={w(71, 71)} fim={f(73)} />
          <FraseApoio palavras={w(73, 74)} fim={f(79)} />
          <FraseApoio palavras={w(79, 80)} fim={f(92)} />
          <FraseApoio palavras={w(92, 92)} fim={f(94)} />
          <FraseApoio palavras={w(94, 97)} fim={f(98)} />
          <FraseApoio palavras={w(98, 101)} fim={f(103)} />
          <FraseApoio palavras={w(112, 115)} fim={f(116)} />
          <FraseApoio palavras={w(116, 119)} fim={f(120)} />
          <FraseApoio palavras={w(120, 122)} fim={f(123)} />
          <FraseApoio palavras={w(123, 126)} fim={f(127)} />
          <FraseApoio palavras={w(127, 130)} fim={f(131)} />
          <FraseApoio palavras={w(131, 133)} fim={f(134)} />
          <FraseApoio palavras={w(134, 137)} fim={f(138)} />
          <FraseApoio palavras={w(138, 141)} fim={f(142)} />
          <FraseApoio palavras={w(142, 146)} fim={f(147)} />
          <FraseApoio palavras={w(147, 150)} fim={fimDaFala} />

          {/* Cards por cima do corpo. */}
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

          {/* Telas cheias. */}
          <TelaPensamentos em={f(35)} fim={f(40)} antes={w(35, 38)} palavra={w(39, 39, ["pensamentos"])} />
          <TelaDopamina em={f(103)} fim={f(112)} eNao={w(103, 104)} suaDopamina={w(105, 107)} naoEstaSendo={w(108, 110)} destruida={w(111)[0]} />
          <TelaFinal em={fimDaFala} fim={duracaoTotal} arroba="@guilherme_antuness" botao="me segue para mais →" />
        </>
      ) : null}

      {/* Efeitos sonoros (~18 dB abaixo da voz). */}
      <Sfx som="whoosh" em={f(8) - 4} />
      <Sfx som="impacto" em={f(12)} />
      <Sfx som="pop" em={f(19)} />
      <Sfx som="swish" em={f(21)} />
      <Sfx som="tick" em={f(27)} />
      <Sfx som="tick" em={f(27) + 6} />
      <Sfx som="tick" em={f(27) + 11} />
      <Sfx som="tick" em={f(27) + 15} />
      <Sfx som="tick" em={f(27) + 18} />
      <Sfx som="tick" em={f(27) + 20} />
      <Sfx som="tick" em={f(27) + 22} />
      <Sfx som="whoosh" em={f(35) - 6} />
      <Sfx som="whoosh" em={f(40) - 6} />
      <Sfx som="swish" em={f(49)} />
      <Sfx som="pop" em={f(50)} />
      <Sfx som="pop" em={f(52)} />
      <Sfx som="pop" em={f(53)} />
      <Sfx som="pop" em={f(56)} />
      <Sfx som="pop" em={f(58)} />
      <Sfx som="swish" em={f(65)} />
      <Sfx som="tick" em={f(75)} />
      <Sfx som="tick" em={f(76)} />
      <Sfx som="tick" em={f(78)} />
      <Sfx som="tick" em={f(82)} />
      <Sfx som="tick" em={f(84)} />
      <Sfx som="tick" em={f(85)} />
      <Sfx som="tick" em={f(88)} />
      <Sfx som="whoosh" em={f(103) - 6} />
      <Sfx som="impacto" em={f(111) + 6} />
      <Sfx som="whoosh" em={f(112) - 6} />
      <Sfx som="pop" em={f(118)} />
      <Sfx som="pop" em={f(122)} />
      <Sfx som="pop" em={f(126)} />
      <Sfx som="pop" em={f(128)} />
      <Sfx som="pop" em={f(131)} />
      <Sfx som="tick" em={f(134)} />
      <Sfx som="pop" em={f(140)} />
      <Sfx som="pop" em={f(144)} />
      <Sfx som="whoosh" em={fimDaFala - 6} />
      <Sfx som="tick" em={fimDaFala + 10} />
    </AbsoluteFill>
  );
};
