import { Flame } from "@/components/flame";

export function Portrait({
  name,
  photo,
  lit,
  size = "lg",
}: {
  name: string;
  photo: string | null;
  lit: boolean;
  size?: "md" | "lg";
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "·";
  return (
    <div className={`portrait portrait-${size}`}>
      <Flame lit={lit} size={size === "lg" ? "lg" : "sm"} />
      {photo ? (
        <img src={photo} alt="" className="portrait-photo" />
      ) : (
        <div className="portrait-fallback font-serif" aria-hidden="true">
          {initial}
        </div>
      )}
    </div>
  );
}
