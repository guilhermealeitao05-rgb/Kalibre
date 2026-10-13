// Estilo V3 do Guilherme (medido em estilo.md): tipografia gigante + telas cheias.
export const COR = {
  texto: "#12100C",
  creme: "#EDE3E0",
  azul: "#2A5BFA",
  preto: "#0B0A09",
  branco: "#FFFFFF",
  cinzaClaro: "#BDB4AE",
};

export const FONTE = "Inter";

// Área segura (o Instagram cobre topo, base e lateral direita).
export const AREA_SEGURA = {
  esquerda: 60,
  direita: 920,
  topo: 250,
  base: 1480,
};

export const CENTRO_X = (AREA_SEGURA.esquerda + AREA_SEGURA.direita) / 2;
export const LARGURA_UTIL = AREA_SEGURA.direita - AREA_SEGURA.esquerda;

// Tamanhos medidos no V3 (em 1080x1920).
export const TAMANHO = {
  apoio: 56,
  gigante: 250,
};

// Entrada de cada palavra: fade de 3 quadros (~0,1 s), como no V3.
export const QUADROS_ENTRADA = 3;
