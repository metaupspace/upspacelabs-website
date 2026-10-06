#!/usr/bin/env bash
#
# Builds @metaupspace/{design-tokens,icons,ui} from a local checkout of
# UpspaceLabs-Design-System and packs them into vendor/metaupspace/ as
# stable, version-less tarballs that package.json (and the pnpm overrides in
# pnpm-workspace.yaml) point at. Then reinstalls them.
#
# Use this until the design system is published to GitHub Packages; after
# that, swap the `file:` entries for version ranges and delete vendor/.
#
#   pnpm ds:pack                      # build + pack + install
#   SKIP_BUILD=1 pnpm ds:pack         # pack the existing dist/ folders as-is
#   DS_DIR=/path/to/ds pnpm ds:pack   # design system somewhere other than ../UpspaceLabs-Design-System

set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DS_DIR="$(cd "${DS_DIR:-$APP_DIR/../UpspaceLabs-Design-System}" && pwd)"
OUT_DIR="$APP_DIR/vendor/metaupspace"
PACKAGES=(design-tokens icons ui)

mkdir -p "$OUT_DIR"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

for pkg in "${PACKAGES[@]}"; do
  pkg_dir="$DS_DIR/packages/$pkg"
  if [[ "${SKIP_BUILD:-0}" != "1" ]]; then
    echo "▸ building @metaupspace/$pkg"
    (cd "$pkg_dir" && pnpm --silent build)
  fi
  echo "▸ packing @metaupspace/$pkg"
  (cd "$pkg_dir" && pnpm pack --pack-destination "$TMP_DIR" >/dev/null)
  mv "$TMP_DIR"/metaupspace-"$pkg"-*.tgz "$OUT_DIR/metaupspace-$pkg.tgz"
done

echo "▸ installing into $(basename "$APP_DIR")"
cd "$APP_DIR"
pnpm install

echo "✓ design system packed from $DS_DIR"
for pkg in "${PACKAGES[@]}"; do
  version=$(tar -xzOf "$OUT_DIR/metaupspace-$pkg.tgz" package/package.json | node -p 'JSON.parse(require("fs").readFileSync(0)).version')
  echo "  @metaupspace/$pkg@$version"
done
