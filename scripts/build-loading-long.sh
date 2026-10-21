#!/usr/bin/env bash
# 把每一组 loading 动画帧纵向拼成一张长图。
# 用法: scripts/build-loading-long.sh [输出目录]
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/src/assets/loading"
OUT="${1:-$ROOT}"

if ! command -v magick >/dev/null; then
  echo "error: 需要 ImageMagick (magick)" >&2
  exit 1
fi

build() {
  local prefix="$1" name="$2"
  local frames=("$SRC/${prefix}"A0{1..4}.png)

  for f in "${frames[@]}"; do
    if [[ ! -f "$f" ]]; then
      echo "error: 缺少帧文件: $f" >&2
      exit 1
    fi
  done

  magick "${frames[@]}" -append "$OUT/$name"
  magick identify -format "%f: %wx%h\n" "$OUT/$name"
}

# 白色图标组（暗色主题用）
build "load_icon_" "loading-long-dark.png"

# 黑色图标组（亮色主题用）
build "load_icon_light_" "loading-long-light.png"
