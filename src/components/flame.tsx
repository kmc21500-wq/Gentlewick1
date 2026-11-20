export function Flame({ lit, size = "md" }: { lit: boolean; size?: "sm" | "md" | "lg" }) {
  return (
    <div className={`gw-flame gw-flame-${size} ${lit ? "is-lit" : ""}`} aria-hidden="true">
      <span className="glow" />
      <span className="outer" />
      <span className="inner" />
      <span className="stick" />
      <span className="wax" />
    </div>
  );
}
