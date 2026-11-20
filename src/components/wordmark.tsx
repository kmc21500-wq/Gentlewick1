export function Wordmark({ lockup = false, tone = "ink" }: { lockup?: boolean; tone?: "ink" | "light" }) {
  const ink = tone === "light" ? "text-night-fg" : "text-ink";
  const mute = tone === "light" ? "text-cream" : "text-muted";

  return (
    <span className={`inline-flex items-center gap-2.5 ${ink}`}>
      <Mark tone={tone} />
      <span className="flex flex-col items-start">
        <span className="font-serif text-[1.35rem] leading-none tracking-tight">
          Gentlewick
          <sup className={`ml-px font-sans text-[0.55rem] font-medium ${mute}`} aria-hidden="true">
            ™
          </sup>
          <span className="sr-only"> trademark</span>
        </span>
        {lockup ? (
          <span className={`mt-1.5 text-[0.68rem] tracking-[0.16em] uppercase ${mute}`}>
            For the ones who left paw prints
          </span>
        ) : null}
      </span>
    </span>
  );
}

function Mark({ tone }: { tone: "ink" | "light" }) {
  const wick = tone === "light" ? "#F3EDE4" : "#2A2622";
  return (
    <svg viewBox="0 0 24 36" className="h-8 w-5 shrink-0" aria-hidden="true">
      <path
        fill="#E7A23A"
        d="M12 1.2c2.4 3.6 5.4 6 5.4 10.2a5.4 5.4 0 0 1-10.8 0C6.6 7.2 9.6 4.8 12 1.2z"
      />
      <path
        fill="#FFF8EC"
        d="M12 7c1 1.4 1.8 2.3 1.8 3.6A1.8 1.8 0 0 1 12 12.4a1.8 1.8 0 0 1-1.8-1.8C10.2 9.3 11 8.4 12 7z"
      />
      <path d="M12 16.2v8.2" stroke={wick} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
