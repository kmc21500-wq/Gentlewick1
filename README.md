# Gentlewick

Gentlewick is a quiet, local-first pet memorial website. Visitors can create memorial pages, add photographs, leave words, and light virtual candles without creating an account.

## What works
- Create pet memorials and view them on this device.
- Add/change/remove a memorial photograph (images are resized before local storage).
- Light a candle and leave a note.
- Browse memorials saved in this browser.
- Share memorial words through a generated link; the recipient sees a dedicated shared remembrance page. Photographs remain local.
- Explore the candle product mock-up and save a non-binding candle note locally.

## Important limitations
- Memorials, photos, candle history, and held candle notes are stored in the visitor's browser only.
- Clearing browser/site data, using a different browser, or changing devices can make local memories unavailable.
- Shared memorial links contain the name, species, dates, and dedication. The photograph and candle history are not uploaded or publicly hosted.
- The candle "hold" flow is a prototype only: no order is sent, no payment is taken, and email is not sent.
- No accounts, backups, or cloud sync are available.

## Run locally
Requires Node.js and npm:
1. `npm install`
2. `npm run dev`
3. Open the Vite address shown in the terminal.

## Checks
- `npm run typecheck`
- `npm run build`
- `npm run lint`

## Deployment
The project commits its generated Vercel Build Output to `.vercel/output`. The GitHub Actions workflow rebuilds this output on pushes and pull requests to `main`, runs TypeScript checks, and commits generated output when it changes. Vercel deploys this generated output.

The site is local-first and requires no environment variables.
