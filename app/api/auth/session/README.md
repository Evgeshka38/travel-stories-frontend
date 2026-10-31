# TODO: Route Handler

Backend endpoint: `GET /api/auth/session`

This folder intentionally does NOT contain `route.ts` yet.

Until a real `route.ts` is added here, the request should continue to
fall through to the generic `/api/:path*` rewrite in `next.config.ts`.

When implementing this handler:
1. Add `route.ts` in this folder.
2. Proxy the request to `/api/auth/session` on `NEXT_PUBLIC_API_URL`.
3. Preserve cookies for private endpoints.
4. Forward backend `Set-Cookie` headers for auth endpoints.
5. Preserve query params/body/content type where applicable.
