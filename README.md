# Gentlewick

Gentlewick is a quiet, cinematic pet-remembrance sanctuary: a place to create a page, keep a photograph and words close, light a candle, and return when you need to remember.

## Local memorial experience
- Create and edit memorials in this browser.
- Add, change, or remove a photo (images are resized before local storage).
- Light candles and leave a note.
- Browse memorials kept on this device.
- Share written memorial details with a generated link; local photos and candle history are not uploaded.
- Create a remembrance card and save it.
- Explore the candle concept and save a non-binding candle note locally.

## Shared sanctuary
The site can display shared sanctuary lanterns from Supabase. Cloud memorial creation is **disabled by default** and must only be enabled after the server-side service-role key is configured and the backend security review is complete. Shared memorial details, photos, candle counts, and blessings are public.

## Important limitations
- Local memorials, photos, candle history, and candle holds are stored in this browser. There is currently no automatic backup or cloud recovery for local memorials.
- Clearing browser/site data, changing browser, or changing devices may make local memories unavailable.
- The candle hold flow is a prototype only: no order is sent, no payment is taken, and email is not sent.
- Real candle sales/payments are not implemented.

## Run locally
Requires Node.js and npm:
1. `npm install`
2. `npm run dev`
3. Open the Vite address shown in the terminal.

## Checks
- `npm run launch:audit`
- `npm run test:smoke`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Deployment
The project is connected to Vercel. Deploy previews should be tested before production promotion. Never commit `.env` or service-role secrets. Cloud memorial creation requires the server-only `SUPABASE_SERVICE_ROLE_KEY` and explicit `VITE_CLOUD_MEMORIAL_CREATE_ENABLED=true`; the public Supabase anon key alone is not sufficient.
