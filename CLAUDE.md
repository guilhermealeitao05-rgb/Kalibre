# Editor de vídeos do Guilherme Antunes

Este repositório é **um editor de vídeos** para o Instagram (Remotion + whisper.cpp).
A marca é **Guilherme Antunes** (@guilherme_antuness).

## Antes de editar qualquer vídeo

1. Leia `perfil.md`. Ele descreve quem é o criador, o público e o tom dos vídeos.
2. Siga as skills do Remotion em `.claude/skills`, principalmente `remotion-best-practices` e `remotion-captions`.

## Padrões dos vídeos

- Vertical 1080x1920, 30 fps (`src/config/video.ts`).
- Legendas em português, transcritas com whisper.cpp e o modelo `ggml-small.bin`.
  Nunca invente ou simule uma transcrição, e nunca use os modelos `for-tests-ggml-*.bin`.

## Como trabalhar com o Guilherme

- Ele não programa e usa o app do Claude no iPad: explique cada passo em uma frase simples.
- Nunca peça para rodar comandos no Terminal nem para abrir "localhost".
- Quando um vídeo ficar pronto, mande o MP4 na conversa.
- Trabalhe no ramo `remotion-studio`. Não mexa no `main` e não crie pull request sem ele pedir.

## Ambiente

`.claude/hooks/session-start.sh` instala as dependências npm, compila o whisper.cpp em `~/tools/whisper.cpp`
(com o atalho `whisper-cli`) e baixa o modelo small. Se a sessão não rodou o hook, rode-o manualmente com
`CLAUDE_CODE_REMOTE=true .claude/hooks/session-start.sh`.
