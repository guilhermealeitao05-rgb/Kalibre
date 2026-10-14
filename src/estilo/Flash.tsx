import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Flash branco curto (5 quadros) para marcar viradas.
export const Flash: React.FC<{ readonly em: number[]; readonly intensidade?: number }> = ({ em, intensidade = 0.65 }) => {
  const frame = useCurrentFrame();
  const o = em.reduce(
    (acc, p) => Math.max(acc, interpolate(frame, [p, p + 1, p + 6], [0, intensidade, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })),
    0,
  );
  if (o <= 0) {
    return null;
  }
  return <AbsoluteFill style={{ backgroundColor: "white", opacity: o, pointerEvents: "none" }} />;
};
