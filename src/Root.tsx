import { Composition } from "remotion";
import { VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./config/video";
import { GeracaoDoente } from "./projetos/geracao-doente/GeracaoDoente";
import { DURACAO_TOTAL } from "./projetos/geracao-doente/dados";
import { DopaminaBarata } from "./projetos/dopamina-barata/DopaminaBarata";
import { LINHA as LINHA_DOPAMINA } from "./projetos/dopamina-barata/dados";
import { Teste } from "./Teste";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Teste"
        component={Teste}
        durationInFrames={5 * VIDEO_FPS}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="GeracaoDoente"
        component={GeracaoDoente}
        durationInFrames={DURACAO_TOTAL}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="DopaminaBarata"
        component={DopaminaBarata}
        durationInFrames={LINHA_DOPAMINA.duracaoTotal}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
