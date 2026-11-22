import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { addWhisperBlessing, shareMemorialLink, type Lantern } from "@/lib/gentlewickApi";
import { fetchPublicLanterns } from "@/lib/gentlewickServer";
import { Flame } from "@/components/flame";
import { Shell } from "@/components/shell";
import "@/styles/cinematicLens.css";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({ pet: typeof search.pet === "string" ? search.pet : undefined }),
  loader: async () => {
    try { return { lanterns: await fetchPublicLanterns() as Lantern[] }; }
    catch { return { lanterns: [] as Lantern[] }; }
  },
  head: () => ({ meta: [{ title: "Gentlewick — The Starlight Lantern Meadow" }] }),
  component: Home,
});

function Home() {
  const { lanterns } = Route.useLoaderData();
  const { pet } = Route.useSearch();
  const selectedLantern = lanterns.find((lantern) => lantern.slug === pet) ?? null;
  const [lit, setLit] = useState(false);
  const [commerceSelection, setCommerceSelection] = useState("");
  const [commerceOpen, setCommerceOpen] = useState(false);
  const [commerceStatus, setCommerceStatus] = useState("");
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
      <Landscape /><div className="cinematic-vignette" aria-hidden="true"/><div className="cinematic-grain" aria-hidden="true"/>
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
    <section id="atelier-section" className="atelier-section">
      <div className="atelier-container">
        <div className="atelier-heading">
          <span className="sanctuary-overline">The Gentlewick Atelier</span>
          <h2>Tangible keepsakes, crafted when you are ready</h2>
          <p>Every digital sanctuary remains free to visit. For families wishing to hold a physical tribute at home, explore keepsakes made to honour a companion’s memory.</p>
        </div>
        <div className="atelier-grid">
          <article className="atelier-card"><div><span className="atelier-tag">Hand-Poured Beeswax &amp; Soy</span><h3 className="atelier-title">Engraved Memorial Candle</h3><p className="atelier-desc">A sanctuary-scented candle in frosted amber glass, personalised with your companion’s name and dates.</p></div><div className="atelier-footer"><span className="atelier-price">€38</span><button type="button" className="atelier-reserve" onClick={()=>{setCommerceSelection("Engraved Memorial Candle (€38)");setCommerceStatus("");setCommerceOpen(true);}}>Reserve Keepsake</button></div></article>
          <article className="atelier-card"><div><span className="atelier-tag">Archival Cotton Hardcover</span><h3 className="atelier-title">Linen-Bound Memory Ledger</h3><p className="atelier-desc">A linen-bound volume for a companion’s story, portrait, and treasured memories.</p></div><div className="atelier-footer"><span className="atelier-price">€65</span><button type="button" className="atelier-reserve" onClick={()=>{setCommerceSelection("Linen-Bound Memory Ledger (€65)");setCommerceStatus("");setCommerceOpen(true);}}>Reserve Keepsake</button></div></article>
          <article className="atelier-card"><div><span className="atelier-tag">310gsm Textured Rag Paper</span><h3 className="atelier-title">Wax-Sealed Heirloom Print</h3><p className="atelier-desc">A fine-art remembrance print, finished with an embossed gold wax seal, ready for framing.</p></div><div className="atelier-footer"><span className="atelier-price">€28</span><button type="button" className="atelier-reserve" onClick={()=>{setCommerceSelection("Wax-Sealed Heirloom Print (€28)");setCommerceStatus("");setCommerceOpen(true);}}>Reserve Keepsake</button></div></article>
        </div>
        <div className="partner-banner"><div><span className="sanctuary-overline">For Veterinary Practices &amp; Pet Crematoriums</span><h3>Gift a quiet sanctuary to grieving families</h3><p>Enquire about providing memorial cards and keepsakes to families in your care.</p></div><button type="button" className="atelier-partner-btn" onClick={()=>{setCommerceSelection("Veterinary / Crematorium Partner Inquiry");setCommerceStatus("");setCommerceOpen(true);}}>Partner Inquiry</button></div>
      </div>
    </section>
    {commerceOpen ? <div className="commerce-backdrop" role="presentation" onClick={(e)=>{if(e.target===e.currentTarget){setCommerceOpen(false);}}}><section className="commerce-modal" role="dialog" aria-modal="true" aria-labelledby="commerce-heading"><button type="button" className="commerce-close" aria-label="Close" onClick={()=>setCommerceOpen(false)}>×</button><span className="sanctuary-overline">Gentlewick Atelier</span><h2 id="commerce-heading">{commerceSelection.includes("Partner") ? "Partner With Gentlewick" : "Reserve Your Keepsake"}</h2><p className="commerce-sub">Send an enquiry to our studio. This opens your email app with your details prepared; the request is not submitted until you send the email.</p><form onSubmit={(e)=>{e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const pet=(fd.get("pet")||"").toString().trim();const person=(fd.get("person")||"").toString().trim();const email=(fd.get("email")||"").toString().trim();const notes=(fd.get("notes")||"").toString().trim();const subject=encodeURIComponent("Gentlewick enquiry: "+commerceSelection);const body=encodeURIComponent("Offering: "+commerceSelection+"\nCompanion: "+(pet||"Not specified")+"\nName / Practice: "+person+"\nReply email: "+email+"\n\nNotes:\n"+(notes||"None"));const href="mailto:hello@gentlewick.ie?subject="+subject+"&body="+body;setCommerceStatus("Your email app should open with this enquiry prepared. Please press Send in your email app to complete it.");window.location.href=href;}}><label>Selected offering<input readOnly value={commerceSelection}/></label><label>Companion’s name (optional)<input name="pet" placeholder="Their name"/></label><label>Your name or practice<input name="person" required placeholder="Your name"/></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"/></label><label>Notes (optional)<textarea name="notes" placeholder="Dates, engraving details, scent, or questions…"/></label><button className="atelier-partner-btn commerce-submit" type="submit">Prepare Email Enquiry</button></form>{commerceStatus ? <p className="commerce-status" role="status">{commerceStatus}<a href={"mailto:hello@gentlewick.ie?subject="+encodeURIComponent("Gentlewick enquiry: "+commerceSelection)}> If your email app didn’t open, tap here.</a></p> : null}<p className="commerce-email-note">Or email us directly: <a href="mailto:hello@gentlewick.ie">hello@gentlewick.ie</a></p></section></div> : null}
    <section className="sanctuary-last-light"><div className="sanctuary-last-light-glow"/><div className="sanctuary-last-light-content"><Flame lit={lit} size="lg"/><span className="sanctuary-overline">A moment for them</span><h2>{lit ? "Your little light is glowing." : "If you want, light a little lantern."}</h2><p>{lit ? "Stay as long as you need. The night can be gentle." : "No name needed. No story to tell. Just a moment of warmth."}</p><button className="sanctuary-button sanctuary-button-gold" type="button" onClick={()=>setLit(true)} disabled={lit}>{lit ? "Lantern glowing" : "Light a lantern"}</button><Link to="/create" className="sanctuary-quiet-link">Make a lantern in their name</Link></div></section>
  {selectedLantern ? <SharedLanternDialog lantern={selectedLantern} /> : null}\n  </main></Shell>;
}

function Landscape() {
  return <svg className="sanctuary-landscape meadow-camera-drift" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#090e1d"/><stop offset=".5" stopColor="#19243a"/><stop offset=".78" stopColor="#59404a"/><stop offset="1" stopColor="#b47b58"/></linearGradient><radialGradient id="glow"><stop stopColor="#d7a174" stopOpacity=".6"/><stop offset="1" stopColor="#a56e67" stopOpacity="0"/></radialGradient></defs><rect width="1440" height="620" fill="url(#sky)"/><rect width="1440" height="620" fill="url(#glow)"/><g fill="#f5e6ce" opacity=".72"><circle cx="136" cy="96" r="2"/><circle cx="245" cy="58" r="1"/><circle cx="356" cy="130" r="1.5"/><circle cx="474" cy="70" r="1"/><circle cx="616" cy="118" r="1.5"/><circle cx="764" cy="55" r="1.5"/><circle cx="915" cy="102" r="1"/><circle cx="1044" cy="63" r="2"/><circle cx="1168" cy="130" r="1"/><circle cx="1304" cy="83" r="1.5"/></g><circle cx="1080" cy="140" r="44" fill="#f2dfbd" opacity=".8"/><path d="M0 400Q180 310 360 390T700 382T1050 370T1440 355V620H0Z" fill="#263847"/><path d="M0 460Q170 385 380 450T760 430T1110 440T1440 405V620H0Z" fill="#20352e"/><path d="M0 520Q220 445 440 500T850 490T1250 500T1440 470V620H0Z" fill="#111e1a"/><g stroke="#a4ad84" strokeWidth="2" opacity=".45" fill="none"><path d="M150 620Q170 500 126 450M174 620Q188 520 220 465M250 620Q235 500 260 440M410 620Q435 510 400 460M490 620Q505 500 540 460M650 620Q635 510 680 455M800 620Q825 520 795 440M950 620Q935 520 980 465M1120 620Q1140 510 1105 455M1290 620Q1310 510 1280 455"/></g></svg>;
}

function SharedLanternDialog({ lantern }: { lantern: Lantern }) {
  const [message,setMessage]=useState("");
  const [author,setAuthor]=useState("");
  const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false);
  async function submit(event:React.FormEvent){event.preventDefault();if(!message.trim())return;setBusy(true);setStatus("");try{await addWhisperBlessing(lantern.id,message,author||undefined);setMessage("");setStatus("Your blessing has been left.");window.location.reload();}catch(error){setStatus(error instanceof Error?error.message:"Could not leave blessing.");}finally{setBusy(false);}}
  return <div className="shared-lantern-backdrop"><article className="shared-lantern-dialog" role="dialog" aria-modal="true" aria-labelledby="shared-lantern-title"><button className="shared-lantern-close" onClick={()=>window.location.assign(window.location.pathname)} aria-label="Close memorial">×</button><p className="sanctuary-overline">A lantern in the sanctuary</p>{lantern.photo_url?<img className="shared-lantern-photo" src={lantern.photo_url} alt={lantern.name}/>:<div className="shared-lantern-placeholder">✦</div>}<h2 id="shared-lantern-title">{lantern.name}</h2><p className="shared-lantern-dates">{lantern.dates}</p>{lantern.story?<p className="shared-lantern-story">{lantern.story}</p>:null}{lantern.quote?<blockquote>{lantern.quote}</blockquote>:null}<div className="shared-lantern-whispers"><h3>Whispered blessings</h3>{(lantern.whispers||[]).length?(lantern.whispers||[]).slice(0,8).map(w=><p key={w.id} className="shared-whisper">“{w.message}”<small>— {w.author}</small></p>):<p className="shared-whisper-empty">Be the first to leave a gentle word.</p>}</div><form onSubmit={submit} className="shared-whisper-form"><label>Leave a blessing<textarea maxLength={180} value={message} onChange={e=>setMessage(e.target.value)} placeholder="A little love, left here…" required/></label><label>Your name (optional)<input maxLength={60} value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Kindled in the Garden"/></label><button disabled={busy||!message.trim()}>{busy?"Leaving your blessing…":"Leave a whispered blessing"}</button></form><button className="shared-lantern-share" onClick={()=>void shareMemorialLink(lantern)}>Share this lantern</button>{status?<p role="status" className="shared-lantern-status">{status}</p>:null}</article></div>;
}
