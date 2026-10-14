# Editor de vídeos do Guilherme Antunes

Este repositório é **um editor de vídeos** para o Instagram (Remotion + whisper.cpp).
A marca é **Guilherme Antunes** (@guilherme_antuness).

## Antes de editar qualquer vídeo

1. Leia `perfil.md`. Ele descreve quem é o criador, o público e o tom dos vídeos.
2. Leia `estilo.md`. É o estilo de edição dele, medido em vídeos de referência (legenda, cores, ritmo, som).
   O padrão escolhido é o **V3** (tipografia gigante + telas cheias).
3. Siga as skills do Remotion em `.claude/skills`, principalmente `remotion-best-practices` e `remotion-captions`.

## Padrões dos vídeos

- Vertical 1080x1920, 30 fps (`src/config/video.ts`).
- Legendas em português, transcritas com whisper.cpp e o modelo `ggml-small.bin`.
  Nunca invente ou simule uma transcrição, e nunca use os modelos `for-tests-ggml-*.bin`.

## Como trabalhar com o Guilherme

- Ele não programa e usa o app do Claude no iPad: explique cada passo em uma frase simples.
- Nunca peça para rodar comandos no Terminal nem para abrir "localhost".
- Quando um vídeo ficar pronto, mande o MP4 na conversa.
- Trabalhe no ramo `remotion-studio`. Não mexa no `main` e não crie pull request sem ele pedir.

## Fluxo de edição aprovado (modelo: `projetos/geracao-doente/`)

Sempre em etapas, esperando a aprovação do Guilherme entre elas:

1. **Baixar e transcrever.**
   - Os vídeos vêm do Google Drive. Para baixar, o arquivo precisa estar como "Qualquer pessoa com o link"; peça isso a ele.
   - Vídeo HDR do iPhone (HLG/BT.2020): converta para H.264 BT.709 com o tone-map `hable` (a "cor A" que ele aprovou), sem nenhum outro ajuste de cor.
   - Transcreva com whisper.cpp (`-dtw small -nfa` dá o tempo exato de cada palavra).
   - Mostre o que vai cortar (silêncios > 0,2 s, erros, repetições, "tipo/cara/né") e as palavras duvidosas da transcrição.
2. **Plano segundo a segundo** no estilo V3: gancho nos 3 primeiros segundos, frase de apoio, palavras gigantes, telas cheias, CTAs (incluindo o card de perfil). Salve em `projetos/<video>/plano.md`.
3. **Montar e mandar uma prévia em MP4.**
   - Componentes reutilizáveis em `src/estilo/`.
   - A palavra atrás da cabeça usa uma máscara da pessoa gerada com RobustVideoMatting.
   - Efeitos sonoros em `public/sfx`, ~18 dB abaixo da voz.
   - Volume final em −14 LUFS.
   - Confira a cor comparando pixels com o vídeo original.

Regras:
- Área segura: texto e elementos só em x 60–920 e y 250–1480.
- Sem música: ele coloca pelo Instagram.
- Entrega: a conversa aceita arquivos de até 30 MB. Mande a versão final em HEVC (`hvc1`) abaixo disso, com `display: render`; o modo "attach" não abre no iPad.
- O repositório é **público**: nunca coloque vídeos nem a foto de perfil no git. A foto de perfil fica em `public/perfil/foto.jpg` (fora do git); peça de novo se não estiver na máquina.

## Ambiente

`.claude/hooks/session-start.sh` instala as dependências npm, compila o whisper.cpp em `~/tools/whisper.cpp`
(com o atalho `whisper-cli`) e baixa o modelo small. Se a sessão não rodou o hook, rode-o manualmente com
`CLAUDE_CODE_REMOTE=true .claude/hooks/session-start.sh`.
