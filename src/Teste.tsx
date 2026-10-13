import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Teste: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({ frame, fps, config: { damping: 12 } });
  const escala = interpolate(entrada, [0, 1], [0.3, 1]);
  const subida = interpolate(entrada, [0, 1], [300, 0]);
  const opacidade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 150,
          color: "#facc15",
          letterSpacing: 4,
          opacity: opacidade,
          transform: `translateY(${subida}px) scale(${escala})`,
        }}
      >
        FUNCIONOU
      </div>
    </AbsoluteFill>
  );
};
