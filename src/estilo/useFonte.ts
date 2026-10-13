import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { FONTE } from "./tokens";
import "./fonte";

// Espera a Inter carregar antes de medir ou desenhar texto.
export const useFonteCarregada = () => {
  const [carregada, setCarregada] = useState(false);
  const [handle] = useState(() => delayRender("Carregando a fonte Inter"));
  useEffect(() => {
    Promise.all([
      document.fonts.load(`700 56px ${FONTE}`),
      document.fonts.load(`800 100px ${FONTE}`),
    ]).then(() => {
      setCarregada(true);
      continueRender(handle);
    });
  }, [handle]);
  return carregada;
};
