import { staticFile } from "remotion";
import { criarLinhaDoTempo } from "../../estilo/linhaDoTempo";
import transcricao from "../../../projetos/dopamina-barata/transcricao.json";

export const VIDEO = staticFile("videos/dopamina-barata.mp4");

export const LINHA = criarLinhaDoTempo({
  transcricao,
  fps: 30,
  pastaRecorte: "videos/dopamina-barata-recorte",
  origemZoom: { x: 540, y: 700 },
});
