# Woodello React Frontend (MERN-ready)

## Run locally
1. `cd client`
2. `npm install`
3. `npm run dev`

## Backend integration
- Set `VITE_API_BASE_URL` in `.env` (see `.env.example`).
- API helper is in `src/services/api.js`.
- Replace static form `action="#"` handlers with calls to:
  - `api.submitContact(payload)`
  - `api.submitMerchantLead(payload)`
- Replace mock product data (`src/data/content.js`) with `api.getProducts()` and `api.getProductBySlug(slug)`.

## Suggested MERN structure
- `client/` -> React frontend (this folder)
- `server/` -> Express API
- MongoDB collections: `products`, `downloads`, `merchant_leads`, `contact_messages`
