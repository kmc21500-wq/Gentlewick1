import { useEffect, useState } from "react";
import type { Lantern } from "@/lib/gentlewickApi";

interface StarlightLanternSkyProps {
  lanterns: Lantern[];
  activeLanternId: string | null;
  risingLanternId?: string | null;
  onSelectLantern: (lantern: Lantern) => void;
  onOpenReleaseModal: () => void;
}

const MOBILE_SAFE_SLOTS = [
  { x: 22, y: 20 }, { x: 78, y: 20 }, { x: 25, y: 43 }, { x: 75, y: 43 },
  { x: 50, y: 31 }, { x: 50, y: 54 }, { x: 15, y: 58 }, { x: 85, y: 58 },
  { x: 35, y: 70 }, { x: 65, y: 70 }, { x: 18, y: 32 }, { x: 82, y: 32 },
];

export function StarlightLanternSky({
  lanterns, activeLanternId, risingLanternId, onSelectLantern, onOpenReleaseModal,
}: StarlightLanternSkyProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth <= 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return <section id="sky-section" className="lantern-hero">
    <div className="cinematic-vignette" aria-hidden="true" />
    <div className="cinematic-grain" aria-hidden="true" />
    <div className="hero-header-copy">
      <span className="eyebrow">The Starlight Lantern Meadow</span>
      <h1>Where the sun never sets on the trails we walked</h1>
      <p>Tap any floating silk lantern to visit their sanctuary, or release a new light into the twilight.</p>
    </div>
    <div className="sky-lantern-stage meadow-camera-drift" aria-label="Memorial lanterns floating in the meadow">
      {lanterns.map((item, idx) => {
        const depthClass = item.id === activeLanternId || item.id === risingLanternId
          ? "depth-near"
          : idx % 3 === 0 ? "depth-near" : idx % 3 === 1 ? "depth-mid" : "depth-far";
        const pos = isMobile ? MOBILE_SAFE_SLOTS[idx % MOBILE_SAFE_SLOTS.length] : {
          x: Math.max(16, Math.min(84, item.sky_x || 50)),
          y: Math.max(24, Math.min(72, item.sky_y || 45)),
        };
        const active = item.id === activeLanternId;
        return <button key={item.id} type="button" onClick={() => onSelectLantern(item)}
          aria-label={`Visit ${item.name}'s sanctuary`}
          className={`sky-lantern ${depthClass} ${active ? "active" : ""} ${item.id === risingLanternId ? "rising" : ""}`}
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, "--dur": `${6.8 + (idx % 4) * 1.1}s`, "--delay": `${-(idx * 1.35)}s` } as React.CSSProperties}>
          <span className="lantern-float">
            <span className="lantern-aura" />
            <svg className="lantern-svg" viewBox="0 0 64 84" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <radialGradient id={`silk-${item.id}`} cx="50%" cy="62%" r="55%">
                  <stop offset="0%" stopColor="#FFFDF7"/><stop offset="45%" stopColor="#FFD496"/><stop offset="85%" stopColor="#D99148"/><stop offset="100%" stopColor="#9E5E24"/>
                </radialGradient>
                <radialGradient id={`core-${item.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF"/><stop offset="60%" stopColor="#FFE4B5" stopOpacity=".85"/><stop offset="100%" stopColor="#FFAE42" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <path d="M18 10 Q32 7 46 10 L54 38 Q56 54 44 70 L20 70 Q8 54 10 38 Z" fill={`url(#silk-${item.id})`}/>
              <path d="M24 10 Q21 40 24 70 M40 10 Q43 40 40 70" stroke="rgba(120,65,18,.28)" strokeWidth=".9"/>
              <path d="M15 24 Q32 28 49 24 M11 42 Q32 47 53 42 M14 58 Q32 62 50 58" stroke="rgba(120,65,18,.35)" strokeWidth="1"/>
              <circle cx="32" cy="54" r="13" fill={`url(#core-${item.id})`}/>
              <ellipse cx="32" cy="9" rx="14" ry="2.5" fill="#5A3818"/><rect x="22" y="70" width="20" height="3.5" rx="1.5" fill="#4A2D12"/>
            </svg>
          </span>
          <span className="lantern-name">{item.name}</span>
        </button>;
      })}
    </div>
    <div className="horizon-footer">
      <div className="horizon-controls">
        <button type="button" className="btn-gold" onClick={onOpenReleaseModal}>+ Release a Lantern</button>
        <a href="#garden" className="btn-outline-light">Walk Into the Garden ↓</a>
      </div>
      <svg className="meadow-svg" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,95 Q360,35 740,85 T1440,65 L1440,160 L0,160 Z" fill="#0B0E17" opacity=".82"/>
        <path d="M0,120 Q480,75 960,115 T1440,95 L1440,160 L0,160 Z" fill="#080A11"/>
      </svg>
    </div>
  </section>;
}
