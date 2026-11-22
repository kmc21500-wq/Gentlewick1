import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Flame } from "@/components/flame";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Gentlewick — The Starlight Lantern Meadow" }] }),
  component: Home,
});

function Home() {
  const [lit, setLit] = useState(false);
  return <Shell><main className="sanctuary-home">
    <section className="sanctuary-hero">
      <div className="sanctuary-stars" aria-hidden="true" />
      <div className="sanctuary-firefly firefly-one" /><div className="sanctuary-firefly firefly-two" /><div className="sanctuary-firefly firefly-three" />
      <div className="sanctuary-hero-copy">
        <p className="sanctuary-eyebrow">A place where love keeps growing</p>
        <h1>The Starlight<br/>Lantern Meadow</h1>
        <p className="sanctuary-subtitle">Where the sun never sets on the trails we walked.</p>
        <p className="sanctuary-intro">For every paw, wing, and little soul that made our world brighter — their light has a place here.</p>
        <div className="sanctuary-actions"><Link to="/create" className="sanctuary-button sanctuary-button-gold">✦ Release a Lantern</Link><a href="#garden" className="sanctuary-button sanctuary-button-outline">Walk into the garden ↓</a></div>
        <p className="sanctuary-light-note" aria-live="polite">✧ {lit ? "A little light is glowing beside you." : "You can stay a while. There is no rush."}</p>
      </div>
      <Landscape />
      <div className="sanctuary-hero-bottom" aria-hidden="true">Take a breath <span /></div>
    </section>
    <section id="garden" className="sanctuary-garden">
      <div className="sanctuary-section-heading"><span className="sanctuary-overline">A living sanctuary</span><h2>Love doesn't disappear.<br/><em>It finds somewhere to bloom.</em></h2><p>Memories are not still. They run through the grass, rest in the sunlight, and flutter among the flowers.</p></div>
      <div className="sanctuary-garden-art" role="img" aria-label="A peaceful twilight meadow with glowing lanterns, rolling hills, and wildflowers"><div className="garden-moon"/><div className="garden-hill garden-hill-back"/><div className="garden-hill garden-hill-front"/><div className="garden-lantern lantern-a"/><div className="garden-lantern lantern-b"/><div className="garden-lantern lantern-c"/><span className="garden-flower flower-a">✿</span><span className="garden-flower flower-b">✾</span><span className="garden-flower flower-c">✿</span><span className="garden-flower flower-d">✾</span></div>
      <div className="sanctuary-garden-caption"><p>Every memory is its own light.<br/>Every love belongs.</p><Link to="/memorials" className="sanctuary-text-link">Explore the sanctuary ↗</Link></div>
    </section>
    <section className="sanctuary-ways"><div className="sanctuary-section-heading sanctuary-heading-compact"><span className="sanctuary-overline">Whenever you need</span><h2>Small ways to feel close.</h2></div><div className="sanctuary-ways-grid">
      <article className="sanctuary-way-card"><div className="sanctuary-way-icon">✧</div><h3>Keep their light</h3><p>Create a little lantern with their name, their story, and the love that remains.</p><Link to="/create" className="sanctuary-text-link">Create a lantern ↗</Link></article>
      <article className="sanctuary-way-card"><div className="sanctuary-way-icon">❀</div><h3>Visit when you wish</h3><p>A gentle place to return to. No dates to remember and no words you have to find.</p><Link to="/memorials" className="sanctuary-text-link">Visit your memories ↗</Link></article>
      <article className="sanctuary-way-card"><div className="sanctuary-way-icon">♡</div><h3>Share the love</h3><p>Keep a remembrance close or share its words with someone who understands.</p><Link to="/about" className="sanctuary-text-link">About Gentlewick ↗</Link></article>
    </div></section>
    <section className="sanctuary-last-light"><div className="sanctuary-last-light-glow"/><div className="sanctuary-last-light-content"><Flame lit={lit} size="lg"/><span className="sanctuary-overline">A moment for them</span><h2>{lit ? "Your little light is glowing." : "If you want, light a little lantern."}</h2><p>{lit ? "Stay as long as you need. The night can be gentle." : "No name needed. No story to tell. Just a moment of warmth."}</p><button className="sanctuary-button sanctuary-button-gold" type="button" onClick={()=>setLit(true)} disabled={lit}>{lit ? "Lantern glowing" : "Light a lantern"}</button><Link to="/create" className="sanctuary-quiet-link">Make a lantern in their name</Link></div></section>
  </main></Shell>;
}

function Landscape() {
  return <svg className="sanctuary-landscape" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#090e1d"/><stop offset=".5" stopColor="#19243a"/><stop offset=".78" stopColor="#59404a"/><stop offset="1" stopColor="#b47b58"/></linearGradient><radialGradient id="glow"><stop stopColor="#d7a174" stopOpacity=".6"/><stop offset="1" stopColor="#a56e67" stopOpacity="0"/></radialGradient></defs><rect width="1440" height="620" fill="url(#sky)"/><rect width="1440" height="620" fill="url(#glow)"/><g fill="#f5e6ce" opacity=".72"><circle cx="136" cy="96" r="2"/><circle cx="245" cy="58" r="1"/><circle cx="356" cy="130" r="1.5"/><circle cx="474" cy="70" r="1"/><circle cx="616" cy="118" r="1.5"/><circle cx="764" cy="55" r="1.5"/><circle cx="915" cy="102" r="1"/><circle cx="1044" cy="63" r="2"/><circle cx="1168" cy="130" r="1"/><circle cx="1304" cy="83" r="1.5"/></g><circle cx="1080" cy="140" r="44" fill="#f2dfbd" opacity=".8"/><path d="M0 400Q180 310 360 390T700 382T1050 370T1440 355V620H0Z" fill="#263847"/><path d="M0 460Q170 385 380 450T760 430T1110 440T1440 405V620H0Z" fill="#20352e"/><path d="M0 520Q220 445 440 500T850 490T1250 500T1440 470V620H0Z" fill="#111e1a"/><g stroke="#a4ad84" strokeWidth="2" opacity=".45" fill="none"><path d="M150 620Q170 500 126 450M174 620Q188 520 220 465M250 620Q235 500 260 440M410 620Q435 510 400 460M490 620Q505 500 540 460M650 620Q635 510 680 455M800 620Q825 520 795 440M950 620Q935 520 980 465M1120 620Q1140 510 1105 455M1290 620Q1310 510 1280 455"/></g></svg>;
}
