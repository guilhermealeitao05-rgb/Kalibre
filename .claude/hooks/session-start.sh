#!/bin/bash
# Prepara o estúdio Kalibre em cada sessão nova na nuvem:
#   1. dependências npm (Remotion)
#   2. whisper.cpp compilado em ~/tools/whisper.cpp + atalho whisper-cli
#   3. modelo ggml-small.bin (multilíngue)
# Cada etapa é pulada se já estiver pronta.
set -uo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
WHISPER_DIR="$HOME/tools/whisper.cpp"
WHISPER_BIN="$WHISPER_DIR/build/bin/whisper-cli"
MODEL="$WHISPER_DIR/models/ggml-small.bin"
MODEL_MIN_BYTES=480000000 # o arquivo completo tem 487.601.967 bytes

log() { echo "[session-start] $*" >&2; }
failed=()

# 1. npm install (só se node_modules estiver ausente ou desatualizado)
setup_npm() {
  cd "$PROJECT_DIR" || return 1
  if [ -f node_modules/.package-lock.json ] && [ node_modules/.package-lock.json -nt package-lock.json ]; then
    log "npm: dependências já instaladas"
    return 0
  fi
  log "npm: instalando dependências..."
  npm install --no-audit --no-fund >&2
}

# 2. whisper.cpp
setup_whisper() {
  if [ -x "$WHISPER_BIN" ]; then
    log "whisper.cpp: já compilado"
  else
    if [ ! -d "$WHISPER_DIR/.git" ]; then
      log "whisper.cpp: clonando..."
      rm -rf "$WHISPER_DIR"
      mkdir -p "$(dirname "$WHISPER_DIR")"
      git clone --depth 1 https://github.com/ggml-org/whisper.cpp "$WHISPER_DIR" >&2 || return 1
    fi
    log "whisper.cpp: compilando (Release)..."
    cmake -S "$WHISPER_DIR" -B "$WHISPER_DIR/build" -DCMAKE_BUILD_TYPE=Release >&2 || return 1
    cmake --build "$WHISPER_DIR/build" -j"$(nproc)" --config Release --target whisper-cli >&2 || return 1
  fi
  ln -sf "$WHISPER_BIN" /usr/local/bin/whisper-cli 2>/dev/null \
    || log "whisper.cpp: não foi possível criar /usr/local/bin/whisper-cli (use $WHISPER_BIN)"
}

# 3. modelo small multilíngue
setup_model() {
  local size=0
  [ -f "$MODEL" ] && size=$(stat -c %s "$MODEL")
  if [ "$size" -ge "$MODEL_MIN_BYTES" ]; then
    log "modelo small: já baixado"
    return 0
  fi
  [ -f "$MODEL" ] && { log "modelo small: arquivo incompleto, baixando de novo"; rm -f "$MODEL"; }
  [ -d "$WHISPER_DIR/models" ] || return 1
  log "modelo small: baixando (~466 MB)..."
  (cd "$WHISPER_DIR" && bash models/download-ggml-model.sh small >&2) || return 1
  size=$(stat -c %s "$MODEL" 2>/dev/null || echo 0)
  [ "$size" -ge "$MODEL_MIN_BYTES" ]
}

setup_npm || failed+=("npm install")
setup_whisper || failed+=("whisper.cpp")
setup_model || failed+=("modelo small")

if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  {
    echo "export WHISPER_MODEL=\"$MODEL\""
    echo "export PATH=\"$WHISPER_DIR/build/bin:\$PATH\""
  } >> "$CLAUDE_ENV_FILE"
fi

if [ ${#failed[@]} -gt 0 ]; then
  echo "Instalação automática FALHOU em: ${failed[*]}. Veja o log acima."
  exit 1
fi
echo "Estúdio Kalibre pronto: npm, whisper-cli e modelo $MODEL."
