# Meu estilo de edição

Análise de 3 vídeos de referência (Reels) que o Guilherme escolheu como inspiração.
Tudo aqui foi **medido** nos vídeos, quadro a quadro. Quando algo não pôde ser medido com segurança, está escrito.

## O que me chamou atenção (palavras do Guilherme)

> "Gostei por ser um vídeo bastante dinâmico e ilustrativo. A maneira como os elementos aparecem, os efeitos sonoros são bem equilibrados e o resultado ficou muito bom."

## Estilo padrão escolhido: V3

O Guilherme escolheu o **V3** (tipografia gigante + telas cheias) como padrão dos vídeos dele.
Ao editar, siga a seção **"V3: tipografia gigante + telas cheias"** abaixo. Os outros dois ficam só como referência.

## Os 3 vídeos analisados

| # | Perfil | Duração útil | Visual |
|---|---|---|---|
| V1 | @lukachoi_ ("Vídeo 100% editado por IA") | 38,1 s | Falando com a câmera + **cards escuros no topo** com números e gráficos, legenda em CAIXA ALTA |
| V2 | @oandrenuneu ("Comenta EDIT IA PRO") | 34,9 s | Tema "tecnologia/HUD" roxo e magenta, **interfaces falsas de edição** sobre o vídeo, legenda minúscula |
| V3 | @lukachoi_ ("Comenta GUIA") | 28,8 s | Fundo creme, **tipografia gigante** (palavra atrás da cabeça), telas cheias de texto/gráfico entre as falas |

Arquivos no Google Drive: `ScreenRecording_10-13-2026 07-40-33_1.MP4` (V1), `07-39-37_1.MP4` (V2), `07-41-44_1.MP4` (V3).

---

## Resumo: o que os 3 têm em comum (medido)

| Item | V1 | V2 | V3 |
|---|---|---|---|
| Velocidade da fala | 197 palavras/min | 199 palavras/min | 228 palavras/min |
| Pausas na fala | máx. 0,57 s; só 4 acima de 0,25 s | máx. 0,22 s | máx. 0,10 s |
| Palavras na legenda por vez | **até 3** (maioria 3) | **até 3** (maioria 2–3) | 1 a 6 em blocos de texto |
| Tempo de cada "página" da legenda | média 0,7 s | média ~0,5 s | varia |
| Como a palavra entra | sincronizada com a fala, uma por uma | sincronizada com a fala, uma por uma | sincronizada com a fala, uma por uma |
| Troca de elemento visual | a cada ~2–5 s | a cada ~1–3 s | a cada ~1–2 s |
| Música | **não tem** | **não tem batida** (só efeitos) | **sim**, ~111 BPM |
| Efeitos sonoros | **não tem** | **muitos** (~36, ≈1 por segundo) | alguns no início (contadores) |
| Volume final | −13,9 LUFS | −14,1 LUFS | −14,5 LUFS |

**Conclusões medidas:**

1. **Fala sem respiro.** Os três cortam quase todas as pausas: a fala fica em ~200–230 palavras por minuto, com silêncios internos de 0,05 a 0,08 s em média.
2. **Legenda curta, palavra por palavra.** No máximo 3 palavras por vez nos vídeos falados. Cada palavra aparece (ou acende) exatamente quando é falada, e a "página" é limpa a cada vírgula ou ponto.
3. **Uma palavra-chave colorida por frase.** Amarelo no V1 e lilás no V2. No V3, a palavra importante vira tipografia gigante.
4. **Sempre tem algo novo na tela.** Um card, um número contando, um gráfico, um ícone ou uma tela cheia mudam a cada 1–5 segundos, quase sempre no exato momento em que a palavra correspondente é falada.
5. **Som equilibrado.** A voz domina. O que não é voz (música e efeitos) fica de 15 a 27 dB abaixo dela, e o volume final de todos fica perto de −14 LUFS.

---

## V1: cards escuros no topo + legenda em caixa alta (@lukachoi_)

### Legenda
- **Fonte:** Montserrat **Black** (peso 900), CAIXA ALTA. Identifiquei comparando o texto real com 15 fontes candidatas renderizadas lado a lado. Tem uma sombra escura suave atrás das letras.
- **Tamanho:** altura das maiúsculas = **60 px** num vídeo de 1080x1920, o que equivale a uma fonte de ~86 px.
- **Posição:** centro da linha em **y ≈ 1376 de 1920** (72% da altura), centralizada na horizontal. Ocupa até quase a largura toda (de x≈36 a x≈1130 num frame de 1180 px). Quando quebra, a segunda linha fica logo abaixo, bem colada.
- **Cores:**
  - palavra já falada: branco **#FDFBFD**
  - palavra-chave: amarelo **#FAC200** (ex.: "BOLSA", "DÓLAR", "200", "5", "SOFTWARE", "IA")
  - palavra que ainda vai ser falada: cinza translúcido **#8F8889** (branco com ~50% de transparência)
- **Animação:** a página inteira (até 3 palavras) aparece, as palavras ainda não faladas ficam translúcidas e cada uma "acende" para branco ou amarelo quando é dita. A transição leva ~3 quadros (0,1 s).
- **Medido em 38 s:** 45 páginas. Distribuição de palavras por página: 1 palavra = 10, 2 = 6, **3 = 28**. A página dura 0,7 s em média. Páginas de 1 palavra aparecem em fim de frase ("ISSO.", "VEZ,", "BARATO.").

### Cards no topo
- **Formato:** retângulo escuro **#1C1B1F / #181818**, cantos arredondados (raio ≈ 20–30 px), de x 69 a x 1010 (**largura ≈ 940 px**, margem de ~70 px de cada lado). Começa em **y ≈ 120 px** e tem de ~420 a 500 px de altura.
- **Hierarquia do texto:**
  - rótulo pequeno em verde **#37925F**, caixa alta, com altura ~24 px (ex.: "HOJE · 05/10")
  - título branco em caixa alta, altura ~75 px (ex.: "Á BOLSA")
  - segunda linha do título em verde **#22A356**, altura ~75 px (ex.: "EXPLODIU 🚀")
- **Pílulas:** verde **#309958** "▲ IBOV +7,55%" e vermelha **#FD4E50** "▼ US$ −4,3%".
- **Adesivo:** fundo amarelo (mesmo tom da legenda), levemente inclinado ("99% vão ignorar").
- **Card de destaque:** fundo amarelo **#F0C000** com texto preto **#0C0C0C** ("EMPREENDEDOR / PRESTA ATENÇÃO").
- **Entrada:** fade rápido com leve desfoque, **2–3 quadros (~0,1 s)**. **Saída:** fade de ~3 quadros. Fica ~0,2 s sem card e o próximo entra.

### Linha do tempo dos elementos (segundos)

| De | Até | Dura | Elemento |
|---|---|---|---|
| 1,3 | 4,1 | 2,8 | Foto recortada de uma pessoa citada na fala, ao lado do rosto |
| 4,13 | 9,37 | 5,2 | Card "HOJE · 05/10 / Á BOLSA EXPLODIU 🚀". As pílulas entram ~6,0; o adesivo "99% vão ignorar" entra ~7,0, quando ele fala "99%" |
| 9,73 | 12,63 | 2,9 | Gráfico "IBOVESPA · PONTOS": número contando 190.405 → 206.600 e linha verde subindo até "200 MIL · RECORDE" |
| 12,63 | 15,0 | 2,4 | Gráfico "DÓLAR COMERCIAL": R$ 5,238 → R$ 4,994, linha vermelha descendo, selo "−4,3%" |
| 15,0 | 16,07 | 1,1 | **Sem card** (pergunta "MAS POR QUÊ?") |
| 16,07 | 19,63 | 3,6 | "ELEIÇÃO · 1º TURNO / O mercado leu:" 🌎 → notas de dinheiro voando → 🇧🇷 "dinheiro voltando" |
| 20,0 | 22,77 | 2,8 | Card amarelo "EMPREENDEDOR / PRESTA ATENÇÃO" |
| 23,17 | 24,93 | 1,8 | "O QUE MUDA PRA VOCÊ / Como isso afeta quem empreende?" + chips "1 · Dólar" e "2 · Investidor" (~24,1) |
| 25,3 | 32,27 | 7,0 | "1 · DÓLAR MAIS BARATO": valor contando R$ 104,35 → R$ 99,88 (−R$ 4,47). Chips "IA", "Ferramentas" e "Servidor" entram um a um quando ele fala cada palavra (~29–30) |
| 32,67 | 38,1 | 5,4 | "2 · INVESTIDOR / Mais apetite pra risco": medidor com o ponteiro indo de "medo" a "apetite" e "= mais dinheiro pra startup 📈" |

### Cortes e zoom
- **10 cortes secos** em 38 s (1,33 · 4,13 · 9,53 · 14,97 · 15,90 · 19,63 · 22,83 · 24,73 · 28,07 · 32,07), ou seja, 1 a cada ~3,5 s. Quase todos caem junto com a troca de card.
- Os cortes **alternam o enquadramento**: normal → **zoom de ~110%** → normal → 110%… Medi comparando o fundo antes e depois de cada corte.

### Som
- **Só voz.** Separei a voz do resto com IA (Demucs): o que não é voz fica em −64 dBFS, ~48 dB abaixo da voz, ou seja, silêncio. Não detectei música nem efeitos sonoros.
- Volume: −13,9 LUFS integrado, pico −3,2 dBTP.

---

## V2: tema tecnológico roxo + interfaces falsas de edição (@oandrenuneu)

### Legenda
- **Fonte:** Montserrat **ExtraBold** (peso 800), **minúsculas** (escrita normal de frase). Identificada por comparação lado a lado.
- **Tamanho:** altura total da linha, da ponta do "d" ao pé do "q", = **53 px** em 1080x1920. Isso equivale a uma fonte de ~50–55 px.
- **Posição:** centro em **y ≈ 1393 de 1920** (72,5%), centralizada.
- **Cores:**
  - texto branco levemente rosado **#F8F0FB**
  - palavra falada agora: lilás **#BC9EE5**, que volta para branco quando a próxima palavra começa
- **Animação:** cada palavra entra em ~2 quadros (fade de ~0,07 s) no momento em que é falada. Às vezes uma linha de luz roxa "escaneia" a legenda (efeito de scanner).
- **Medido:** páginas de **2 a 3 palavras** ("porque quem editou", "a mesma frase", "duas vezes", "a melhor"), que duram ~0,5 s. Entre uma página e outra a tela fica sem legenda por ~0,1–0,2 s.

### Título do gancho (0–4,7 s)
- CAIXA ALTA branca no topo, com a última palavra em lilás. As maiúsculas têm ~70 px de altura (a linha "UMA VEZ SÓ" mede 84 px com o acento).
- O texto muda conforme a fala: "EU GRAVEI ESSE VÍDEO UMA VEZ SÓ" → "ERREI" → "ERREI GAGUEJEI REPETI" (com sublinhado ondulado vermelho) → "E VOCÊ NÃO VIU NADA DISSO."

### Linha do tempo dos elementos

| De | Até | Elemento |
|---|---|---|
| 0 | 4,7 | Título do gancho no topo, mudando com a fala |
| 4,7 | 8,0 | "VISÃO COMPUTACIONAL / RECONHECENDO · QUADRO 0191": caixas de rastreio no rosto ("ROSTO 0,94", "OLHOS", "BOCA", "MÃO") e etiqueta "EDITOR ANDRÉ" → "EDITOR IA ✓" |
| 8,0 | 9,4 | Efeito de pontos/partículas sobre ele ("25.416 pontos") |
| 10,0 | 17,7 | "EDITANDO AO VIVO": o vídeo encolhe para dentro de uma tela de editor falsa, com linha do tempo, forma de onda e palavras destacadas. A contagem de erros sobe "2 erros" → "16 erros e pausas" → "17 cortes" |
| 17,7 | 21,8 | "03 MELHOR TOMADA": miniaturas "TOMADA 1" e "TOMADA 2" com aspas, ✓ verde e ✗ vermelho |
| 21,8 | 26,0 | "04 LEGENDA": legenda com mini forma de onda e tempo embaixo de cada palavra |
| 26,0 | 27,4 | "05 ZOOM": malha de pontos no rosto ("468 pontos") e caixa "1,30x"; o rosto fica visivelmente mais perto |
| 27,4 | 31,0 | "06 PROFUNDIDADE": fundo trocado por roxo, etiquetas "FUNDO" e "VOCÊ", e card 3D "CENÁRIO NOVO" inclinando |
| 31,0 | 34,9 | Cenário novo (sala neon), esqueleto de pontos nas mãos, etiqueta "TEXTO" e cubo 3D ("08 RASTREIO DE MOVIMENTO") |

- Durante todo o vídeo aparece um "HUD" fixo nos cantos: "● EDITANDO AO VIVO 00:16:27" à esquerda e o número da etapa ("02 CORTES", "04 LEGENDA"…) à direita, em **fonte monoespaçada** pequena.
- O enquadramento da câmera fica **fixo** nos cortes (medi o fundo antes e depois: zoom 1,00). O único zoom é o da etapa "05 ZOOM".

### Som
- Voz −17,3 dBFS. O que não é voz fica em média em **−32 dBFS, 14,8 dB abaixo da voz**.
- **Sem música com batida:** a periodicidade medida foi fraca (0,05), então não há ritmo regular.
- **~36 efeitos sonoros em 35 s (≈1 por segundo)**, de dois tipos:
  - **cliques/ticks** curtíssimos (0,02–0,06 s)
  - **whooshes** de 0,25–0,45 s

  Os picos ficam entre −15 e −40 dBFS. 8 das 19 trocas visuais têm um efeito a menos de 0,2 s de distância.
- Volume final: −14,1 LUFS, pico −0,6 dBTP.

---

## V3: tipografia gigante + telas cheias (@lukachoi_)

### Texto (não é legenda tradicional: é tipografia animada)
- **Fonte:** **Inter ExtraBold/Bold** com espaçamento **bem negativo** entre letras, parecida com a SF Pro, a fonte do iPhone. Identificada por comparação lado a lado.
- **Três tamanhos:**
  - **Palavra gigante** ("editado", "criador", "impossível"): altura do "x" = 135 px e altura com haste ("d") = 190 px, ou seja, uma fonte de **~250 px**. Centro em y ≈ 575 de 1920 (30% do topo). **Fica atrás da cabeça**: o cabelo cobre parte das letras.
  - **Frase de apoio** ("esse vídeo foi", "é por isso que qualquer"): fonte de **~55 px**, no topo (y ≈ 260–310), alinhada à esquerda ou centralizada.
  - **Frase do CTA** ("Por que não você?"): fonte de ~60 px, centralizada.
- **Cores:**
  - texto quase preto **#12100C**
  - fundo creme **#EDE3E0 / #F2E8E5**
  - **azul de destaque #2A5BFA / #2E5BF2**: sublinhados, risco, botão e palavras como "hoje.", "edit"
- **Animação:** as palavras entram **uma a uma** junto com a fala, cada uma com fade de 2–3 quadros (~0,1 s), do cinza claro ao preto, deslizando de leve.
- **Elementos gráficos de texto:**
  - chaves { } com setas ← →, por exemplo "{ eu só falei. }"
  - **risco azul** sobre "impossível"
  - **sublinhado ondulado azul** sob "explodindo"
  - palavra em **caixa azul** com texto branco ("edit")
  - **botão azul** "me segue para mais →" com alças de seleção, como num programa de design

### Linha do tempo

| De | Até | Dura | Elemento |
|---|---|---|---|
| 0 | 2,4 | 2,4 | "esse vídeo foi" no topo + "editado" gigante atrás da cabeça |
| 2,4 | 4,4 | 2,0 | "cada { legenda, número, gráfico }" centralizado |
| 4,4 | 6,7 | 2,3 | **Tela cheia creme:** "• faturamento em R$" + número contando 10.000 → 1.000.000 |
| 6,7 | 7,7 | 1,0 | Volta à pessoa com um card de perfil do Instagram ("48 posts · 97,9 mil seguidores · Seguindo ✓") |
| 7,7 | 9,1 | 1,4 | **Tela cheia preta:** "explodindo ↑" + gráfico de barras azuis crescendo (16% → 30% → 47% → 70% → 100%) |
| 9,1 | 10,7 | 1,6 | "a palavra é" + "impossível" gigante, riscado de azul |
| 10,7 | 12,7 | 2,0 | "eu não abri nenhum programa," + "← { eu só falei. } →" |
| 12,7 | 15,1 | 2,4 | "é por isso que qualquer" + "criador" gigante atrás da cabeça, sublinhado azul + "consegue fazer isso hoje." |
| 15,1 | 18,1 | 3,0 | "você não precisa mais saber" + "edit" em caixa azul → "você precisa saber o que" |
| 18,1 | 19,3 | 1,2 | **Tela cheia azul:** "← { a ideia sempre }" em branco |
| 19,3 | 21,3 | 2,0 | Pessoa: "agora", "então" |
| 21,3 | 22,5 | 1,2 | **Tela cheia preta:** "revolução revolução" repetido em várias linhas, com eco/fade |
| 23,5 | 24,7 | 1,2 | Pílula azul "criar conteúdo" + mosaico de fotos e vídeos em volta dele |
| 24,7 | 26,2 | 1,5 | "porque vai ter muitas formas", "de você" |
| 26,2 | 28,8 | 2,6 | **Tela final creme (CTA):** "← { Por que não você? } →" + botão azul "me segue para mais →" |

- **5 telas cheias** (sem a pessoa), de 1,2 a 2,6 s cada, intercaladas com a fala a cada ~3–5 s.

### Som
- Voz −17,8 dBFS. O que não é voz fica em média em **−40,6 dBFS, 22,8 dB abaixo da voz**.
- **Música com batida regular de ~111 BPM**: pulso a cada 0,54 s, forte (0,42) a partir de ~9,5 s. Durante a fala a música fica em ~−45 dBFS por segundo, **~27 dB abaixo da voz**. Na tela final, sem fala, ela sobe para **−33 dBFS**.
- **Efeitos no começo** (0–8 s): ticks curtos (~0,03 s) com picos de −21 a −22 dBFS em 4,1 · 5,5 · 6,0 · 7,2 s, durante o número contando e o gráfico.
- Volume final: −14,5 LUFS, pico −3,2 dBTP.

---

## Regras práticas tiradas das medições (para os meus vídeos)

Valores de referência para o formato 1080x1920, 30 fps:

1. **Cortar as pausas:** nenhum silêncio interno acima de ~0,25 s. A meta é ficar em torno de 200 palavras por minuto.
2. **Legenda:**
   - no máximo **3 palavras por vez**, cada palavra aparecendo ou acendendo **no momento em que é falada** (fade de ~0,1 s)
   - nova página a cada vírgula ou ponto
   - centro em **~72% da altura** (y ≈ 1380), área em que nenhum dos três coloca outra coisa
3. **Uma cor de destaque** para a palavra-chave. A legenda fica branca e o destaque é uma cor forte (amarelo no V1, lilás no V2, azul no V3).
4. **Elemento novo a cada 2–5 s**, entrando **junto com a palavra falada**:
   - card com número, gráfico ou ícone, que entra em ~0,1 s e sai em ~0,1 s
   - ou uma tela cheia de 1–2,5 s
5. **Números sempre animados:** contando até o valor (190.405 → 206.600; 10.000 → 1.000.000; R$ 104,35 → R$ 99,88) e gráficos crescendo.
6. **Cortes secos** a cada ~3–4 s, alternando o enquadramento normal com um zoom de ~110%.
7. **Som:**
   - a voz manda
   - música, se tiver, ~25 dB abaixo da voz
   - efeitos sonoros curtos (ticks de 0,03 s, whooshes de 0,3–0,4 s) nas entradas de elementos, ~15–20 dB abaixo da voz
   - volume final em **−14 LUFS**
8. **CTA no final:** os três terminam pedindo para seguir ou comentar. O V3 usa uma tela final de 2,6 s com botão "me segue para mais →".

---

## Como foi medido

- **Fonte:** gravações de tela do iPhone (1180x2556, ~60 qps). O vídeo do Reel ocupa a tela do topo até y = 2300 (logo abaixo fica a barra de progresso do Instagram). As medidas foram convertidas para 1080x1920 multiplicando por 0,834.
- **Legendas:** leitura por OCR (Tesseract) 10 vezes por segundo, isolando só as cores da legenda, e transcrição palavra por palavra com whisper.cpp (modelo small).
- **Tamanhos e cores:** medição de pixels nos quadros e mediana das cores do texto.
- **Fontes:** comparação visual do texto real com 15 fontes renderizadas lado a lado.
- **Cortes e zoom:** diferença entre quadros só no fundo atrás da pessoa, mais a comparação de escala antes e depois de cada corte.
- **Som:** volume em LUFS (ffmpeg loudnorm), separação de voz/resto com Demucs (IA), detecção de ataques sonoros e da batida no áudio sem voz.

**Limites:**
- **Fontes:** o nome é a mais parecida entre as testadas, não uma confirmação do arquivo original.
- **Zoom do V3:** nos cortes não deu para medir com confiança, porque o fundo creme é liso demais para comparar.
- **Tipo de efeito sonoro:** a classificação (clique ou whoosh) vem só da duração e do formato do som. Ninguém ouviu.
- **Interface do Instagram:** os ícones e textos dele aparecem por cima das gravações e foram ignorados.
