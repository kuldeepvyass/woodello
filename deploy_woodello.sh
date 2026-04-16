#!/usr/bin/env bash
set -Eeuo pipefail

# Safe static-site deploy for the Woodello Vite client.
# This script builds locally, uploads a release tarball, and atomically
# updates a dedicated symlink on the server without changing nginx config.

VPS_HOST="${VPS_HOST:-72.61.251.100}"
VPS_USER="${VPS_USER:-root}"
APP_NAME="${APP_NAME:-woodello-client}"
LOCAL_CLIENT_DIR="${LOCAL_CLIENT_DIR:-client}"
RELEASES_TO_KEEP="${RELEASES_TO_KEEP:-5}"

REMOTE_ROOT="${REMOTE_ROOT:-/var/www/${APP_NAME}}"
REMOTE_RELEASES="${REMOTE_ROOT}/releases"
REMOTE_CURRENT="${REMOTE_ROOT}/current"

if ! command -v ssh >/dev/null 2>&1; then
  echo "Error: ssh is required."
  exit 1
fi

if ! command -v scp >/dev/null 2>&1; then
  echo "Error: scp is required."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required."
  exit 1
fi

if [[ ! -d "${LOCAL_CLIENT_DIR}" ]]; then
  echo "Error: local client directory not found: ${LOCAL_CLIENT_DIR}"
  exit 1
fi

release_id="$(date +%Y%m%d%H%M%S)"
archive_name="${APP_NAME}-${release_id}.tar.gz"
tmp_archive="/tmp/${archive_name}"

echo "[1/5] Installing dependencies and building locally..."
pushd "${LOCAL_CLIENT_DIR}" >/dev/null
npm ci
npm run build

if [[ ! -d "dist" ]]; then
  echo "Error: build output directory '${LOCAL_CLIENT_DIR}/dist' not found."
  popd >/dev/null
  exit 1
fi

tar -czf "${tmp_archive}" -C dist .
popd >/dev/null

echo "[2/5] Creating remote release directories (isolated app path)..."
ssh "${VPS_USER}@${VPS_HOST}" "mkdir -p '${REMOTE_RELEASES}'"

echo "[3/5] Uploading release archive..."
scp "${tmp_archive}" "${VPS_USER}@${VPS_HOST}:/tmp/${archive_name}"

echo "[4/5] Activating new release atomically..."
ssh "${VPS_USER}@${VPS_HOST}" bash -s -- \
  "${REMOTE_RELEASES}" "${REMOTE_CURRENT}" "${archive_name}" "${release_id}" "${RELEASES_TO_KEEP}" <<'REMOTE_EOF'
set -Eeuo pipefail

remote_releases="$1"
remote_current="$2"
archive_name="$3"
release_id="$4"
releases_to_keep="$5"

release_dir="${remote_releases}/${release_id}"

mkdir -p "${release_dir}"
tar -xzf "/tmp/${archive_name}" -C "${release_dir}"
ln -sfn "${release_dir}" "${remote_current}"

if [[ "${releases_to_keep}" =~ ^[0-9]+$ ]] && [[ "${releases_to_keep}" -gt 0 ]]; then
  cd "${remote_releases}"
  ls -1dt */ 2>/dev/null | tail -n +$((releases_to_keep + 1)) | xargs -r rm -rf
fi

rm -f "/tmp/${archive_name}"
REMOTE_EOF

echo "[5/5] Cleaning up local temp archive..."
rm -f "${tmp_archive}"

cat <<INFO

Deployment complete.

App name: ${APP_NAME}
Current release symlink: ${REMOTE_CURRENT}

Important:
- This script does not modify nginx or any existing website config.
- To serve this site, point a separate server block/root to: ${REMOTE_CURRENT}
- Example nginx root value: root ${REMOTE_CURRENT};

INFO