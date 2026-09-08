# Kalibre

Kalibre — calibre sua alimentação. Um instrumento de precisão pra quem já treina
e já faz dieta, mas travou: pequenos ajustes, um de cada vez, até destravar o
resultado.

Não é contador de calorias, não é dieta pronta, não é app de treino. É o loop
autoavaliação → raio-X → ajuste da vez → semana calibrada → check-ins →
reavaliação — que recomeça a cada ciclo.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (tokens da identidade "direta e bruta" em `src/index.css`)
- Framer Motion (interações-assinatura: raio-X scanner, gauge, snap de seleção)
- Zustand + `localStorage` (via `src/lib/repository.ts`, trocável por Supabase
  na fase 2 sem tocar a UI)
- PWA instalável (`vite-plugin-pwa`)

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção + service worker
npm run preview  # serve o build de produção
```

## Estrutura

```
src/
  app/         layout com tab bar
  components/  design system (Button, Card, Gauge, Ticks, CountUp, ...)
  data/        datasets reais em JSON (ajustes, trocas, aulas)
  engine/      lógica do loop (raio-X, sugestão de ajuste, semana, review)
  hooks/       useReducedMotion
  lib/         tipos, repository, ids
  motion/      transições compartilhadas
  screens/     uma tela por rota da jornada
  store/       Zustand
```

## Nota legal

Conteúdo educativo. O Kalibre organiza princípios e opções — quem decide e
ajusta é a pessoa, sobre a própria comida. Nunca prescreve quantidade
individual. Não substitui acompanhamento com nutricionista.
