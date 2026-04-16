#!/usr/bin/env bash
set -Eeuo pipefail

# One-shot VPS setup for woodello.in.
# This script only adds a dedicated nginx site and does not alter existing sites.

VPS_HOST="${VPS_HOST:-72.61.251.100}"
VPS_USER="${VPS_USER:-root}"
DOMAIN="${DOMAIN:-woodello.in}"
WWW_DOMAIN="${WWW_DOMAIN:-www.woodello.in}"
APP_NAME="${APP_NAME:-woodello-client}"
WEB_ROOT="${WEB_ROOT:-/var/www/${APP_NAME}/current}"
SETUP_SSL="${SETUP_SSL:-1}"

if ! command -v ssh >/dev/null 2>&1; then
  echo "Error: ssh is required."
  exit 1
fi

echo "Configuring VPS ${VPS_USER}@${VPS_HOST} for ${DOMAIN}..."

ssh "${VPS_USER}@${VPS_HOST}" "DOMAIN='${DOMAIN}' WWW_DOMAIN='${WWW_DOMAIN}' WEB_ROOT='${WEB_ROOT}' SETUP_SSL='${SETUP_SSL}' bash -s" <<'REMOTE_EOF'
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Error: run as root on VPS."
  exit 1
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "Error: nginx is not installed on VPS."
  exit 1
fi

domain="${DOMAIN}"
www_domain="${WWW_DOMAIN}"
web_root="${WEB_ROOT}"
setup_ssl="${SETUP_SSL}"

nginx_available="/etc/nginx/sites-available/${domain}"
nginx_enabled="/etc/nginx/sites-enabled/${domain}"

mkdir -p "$(dirname "${web_root}")"

if [[ ! -e "${web_root}/index.html" ]]; then
  echo "Warning: ${web_root}/index.html not found."
  echo "Deploy your app first by running ./deploy_woodello.sh locally."
fi

cat > "${nginx_available}" <<NGINX_CONF
server {
    listen 80;
    listen [::]:80;
    server_name ${domain} ${www_domain};

    root ${web_root};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }
}
NGINX_CONF

if [[ ! -L "${nginx_enabled}" ]]; then
  ln -s "${nginx_available}" "${nginx_enabled}"
fi

nginx -t
systemctl reload nginx

if [[ "${setup_ssl}" != "1" ]]; then
  echo "SSL step skipped (SETUP_SSL=${setup_ssl})."
  exit 0
fi

if ! command -v certbot >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    export DEBIAN_FRONTEND=noninteractive
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
  elif command -v dnf >/dev/null 2>&1; then
    dnf install -y certbot python3-certbot-nginx
  elif command -v yum >/dev/null 2>&1; then
    yum install -y certbot python3-certbot-nginx
  else
    echo "Warning: could not auto-install certbot. Install it manually, then run:"
    echo "certbot --nginx -d ${domain} -d ${www_domain} --redirect --non-interactive --agree-tos -m admin@${domain}"
    exit 0
  fi
fi

# Non-interactive certificate setup with a default admin mailbox.
certbot --nginx \
  -d "${domain}" \
  -d "${www_domain}" \
  --redirect \
  --non-interactive \
  --agree-tos \
  -m "admin@${domain}"

echo "VPS setup complete for ${domain}."
REMOTE_EOF

echo "All done."