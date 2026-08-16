# Luxora

Plataforma web premium para reserva de aviacion privada, disenada desde el
inicio para escalar a un marketplace completo de experiencias de lujo.

## Stack

- Next.js, React, TypeScript, Tailwind CSS y Framer Motion
- Supabase Auth, PostgreSQL y Storage
- Stripe para pagos por reserva, anticipo, saldo restante y comisiones
- Google Maps para rutas, aeropuertos base y ubicaciones de activos

## Arquitectura de producto

La entidad principal es `Asset`, no `Aircraft`. Cada publicacion pertenece a una
categoria y guarda atributos especificos en `category_attributes`, lo que permite
soportar jets, helicopteros, yates, villas, autos, botes e islas privadas sin
crear tablas separadas por vertical.

El esquema base para Supabase esta en `supabase/schema.sql`.

## Variables de entorno

Copia `.env.example` y completa:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Comandos

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Deploy en Cloudflare Workers

Luxora usa la integracion nativa de vinext para Cloudflare Workers con
`@cloudflare/vite-plugin`.

Para desplegar:

```bash
npm ci
npm run build
npm run deploy:cloudflare
```

Antes del primer deploy, autentica Wrangler con `wrangler login` o configura
`CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID` en CI.
