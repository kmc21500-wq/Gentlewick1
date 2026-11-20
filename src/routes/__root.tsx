import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import appCss from "../styles.css?url";

function publicHost(value: string | undefined) {
  const host = String(value ?? "")
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();
  if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
  if (
    host === "vercel.app" ||
    host.endsWith(".vercel.app") ||
    host === "vercel.com" ||
    host.endsWith(".vercel.com")
  ) {
    return "";
  }
  return host;
}

export const Route = createRootRoute({
  head: ({ matches }) => {
    const path = matches.at(-1)?.pathname ?? "/";
    const url = `https://gentlewick.com${path === "/" ? "" : path}`;
    const host = publicHost(import.meta.env.VITE_PUBLIC_HOSTNAME);
    const xBanner = host ? `https://${host}/x-banner.jpg` : "";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Gentlewick" },
        { name: "description", content: "A soft place to remember the ones who left paw prints. Keep their name, their photograph, and a candle you can light whenever you come back." },
        { name: "theme-color", content: "#F7F3EC" },
        { property: "og:site_name", content: "Gentlewick" },
        { property: "og:url", content: url },
        ...(xBanner ? [{ property: "x:game:image", content: xBanner }] : []),
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..700&family=Outfit:wght@300..600&display=swap",
        },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    };
  },
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <Shell>
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="kicker">Gentlewick</p>
        <h1 className="mt-3 font-serif text-4xl">This page is quiet.</h1>
        <p className="mt-3 text-muted">Nothing is kept at this address.</p>
        <Link to="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </main>
    </Shell>
  );
}
