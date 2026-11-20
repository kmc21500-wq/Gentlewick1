export function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="40" cy="52" rx="16" ry="13.5" />
      <ellipse cx="17" cy="30" rx="7.5" ry="10" />
      <ellipse cx="31" cy="18" rx="7" ry="9.5" />
      <ellipse cx="49" cy="18" rx="7" ry="9.5" />
      <ellipse cx="63" cy="30" rx="7.5" ry="10" />
    </svg>
  );
}
