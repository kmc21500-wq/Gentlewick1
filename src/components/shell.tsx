import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Wordmark } from "@/components/wordmark";
import { Paw } from "@/components/paw";

const LINKS = [
  { to: "/memorials", label: "The lights" },
  { to: "/about", label: "About" },
  { to: "/account", label: "My memories" },
  { to: "/privacy", label: "Privacy" },
] as const;

export function Shell({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  if (bare) return <div className="min-h-screen bg-night text-night-fg">{children}</div>;
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="text-ink" onClick={() => setOpen(false)} aria-label="Gentlewick, home">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="mb-3 flex items-end gap-1 text-[#c6ae8a]" aria-hidden="true">
              <Paw className="size-3.5 -rotate-12" />
              <Paw className="mb-2 size-3 rotate-6 opacity-80" />
              <Paw className="mb-4 size-2.5 rotate-12 opacity-55" />
            </span>
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={pathname === link.to ? "text-ink" : "text-muted"}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/create" className="btn btn-primary">
                Begin a page
              </Link>
            </nav>
            <button
              type="button"
              className="btn btn-ghost min-h-11 min-w-11 md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="mt-1 inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.14em] text-muted uppercase"
        >
          <span className="h-px w-5 bg-[#d4b16a]" />
          Pet Memorials
          <Paw className="size-2.5 text-[#c6ae8a]" />
          Virtual Candles
          <span className="h-px w-5 bg-[#d4b16a]" />
        </Link>
      </div>
      {open ? (
        <nav className="grid gap-1 border-t border-line px-5 py-3 md:hidden" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl px-3 py-3 text-lg"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/create" className="btn btn-primary mt-2" onClick={() => setOpen(false)}>
            Begin a page
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-6 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <Wordmark lockup />
          <p className="mt-3 flex items-center gap-2 text-muted">
            <Paw className="size-3.5 text-[#c6ae8a]" />
            A soft place to keep their light close.
          </p>
          <a href="https://gentlewick.com" className="footer-link mt-4 inline-block">
            gentlewick.com
          </a>
          <a href="mailto:hello@gentlewick.com" className="footer-link mt-1 block">
            hello@gentlewick.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/memorials" className="footer-link">
            The lights
          </Link>
          <Link to="/about" className="footer-link">
            About
          </Link>
          <Link to="/create" className="footer-link">
            Begin a page
          </Link>
          <Link to="/account" className="footer-link">
            My memories
          </Link>
          <Link to="/privacy" className="footer-link">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
