import type React from "react";
import { AbsoluteFill, Img } from "remotion";

export type Recorte = {
  // PNG com transparência onde a pessoa está (opaco no resto).
  readonly src: string;
  // Mesmo zoom aplicado ao vídeo naquele trecho.
  readonly escala: number;
  readonly origemX: number;
  readonly origemY: number;
  // Deslocamento do vídeo naquele quadro (tremida de câmera), em px.
  readonly deslocX?: number;
  readonly deslocY?: number;
};

// Tudo que fica aqui dentro aparece ATRÁS da pessoa: a máscara esconde o
// conteúdo onde a pessoa está. A cor do vídeo não é tocada.
export const AtrasDaPessoa: React.FC<{
  readonly recorte: Recorte | null;
  readonly children: React.ReactNode;
}> = ({ recorte, children }) => {
  if (!recorte) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }
  const { src, escala, origemX, origemY, deslocX = 0, deslocY = 0 } = recorte;
  const mascara: React.CSSProperties = {
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
    maskSize: `${1080 * escala}px ${1920 * escala}px`,
    WebkitMaskSize: `${1080 * escala}px ${1920 * escala}px`,
    maskPosition: `${origemX - origemX * escala + deslocX}px ${origemY - origemY * escala + deslocY}px`,
    WebkitMaskPosition: `${origemX - origemX * escala + deslocX}px ${origemY - origemY * escala + deslocY}px`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  };
  return (
    <>
      {/* Garante que a máscara deste quadro já carregou antes da captura. */}
      <Img
        src={src}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
      />
      <AbsoluteFill style={mascara}>{children}</AbsoluteFill>
    </>
  );
};
