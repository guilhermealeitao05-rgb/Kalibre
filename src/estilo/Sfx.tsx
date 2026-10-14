import { Audio } from "@remotion/media";
import type React from "react";
import { staticFile, useVideoConfig } from "remotion";

// Efeitos sonoros gerados para o estúdio (public/sfx), sem direito autoral.
export type Som = "whoosh" | "swish" | "tick" | "pop" | "impacto";

export const Sfx: React.FC<{ readonly som: Som; readonly em: number; readonly volume?: number }> = ({ som, em, volume = 1 }) => {
  const { fps } = useVideoConfig();
  return <Audio src={staticFile(`sfx/${som}.wav`)} from={Math.max(0, em)} volume={volume} premountFor={fps} />;
};
