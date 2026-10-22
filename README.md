# Manual Chery E5 — sitio estático

SvelteKit (adapter-static). Deploy automático a Cloudflare Pages + R2 con GitHub Actions.

## Secrets requeridos (GitHub → Settings → Secrets and variables → Actions)

| Secret | Valor |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token con permisos **Cloudflare Pages: Edit** y **R2: Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID (dashboard → inicio derecha) |

## URL del PDF

El PDF pesa 28 MB y Pages limita archivos a 25 MiB → vive en R2.
En `/pdf` (route `src/routes/pdf/+page.svelte`) la constante `PDF_URL` apunta
al archivo. Local: `/manual_liviano.pdf`. Público: la URL `pub-*.r2.dev` que
aparece al activar el acceso público del bucket (R2 → Settings → Public access).
