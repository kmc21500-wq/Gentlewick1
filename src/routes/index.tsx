import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { type Lantern } from "@/lib/gentlewickApi";
import { fetchPublicLanterns, lightSharedLantern } from "@/lib/gentlewickServer";
import { Shell } from "@/components/shell";
import "@/styles/cinematicLens.css";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({ pet: typeof search.pet === "string" ? search.pet : undefined }),
  loader: async () => {
    try { return { lanterns: await fetchPublicLanterns() as Lantern[] }; }
    catch { return { lanterns: [] as Lantern[] }; }
  },
  head: () => ({ meta: [{ title: "Gentlewick — Where every paw finds paradise" }] }),
  component: Home,
});

function Home() {
  const { lanterns } = Route.useLoaderData();
  const { pet } = Route.useSearch();
  const [atmosphere, setAtmosphere] = useState<"daylight" | "twilight">("daylight");
  const selectedLantern = lanterns.find((lantern) => lantern.slug === pet) ?? null;
  return <Shell><main className={`gw-home gw-entrance gw-${atmosphere}`}>
    <section className="gw-hero" aria-label="Welcome to Gentlewick">
      <div className="gw-hero-image" aria-hidden="true" />
      <div className="gw-hero-shade" aria-hidden="true" />
      <div className="gw-hero-content">
        <p className="gw-brand-mark">GENTLEWICK</p>
        <h1>Where every paw<br/><em>finds paradise.</em></h1>
        <div className="gw-hero-actions">
          <Link to="/memorials" className="gw-primary">Enter the sanctuary</Link>
          <Link to="/create" className="gw-secondary">Remember someone</Link>
        </div>
        <div className="gw-atmosphere" aria-label="Choose sanctuary atmosphere">
          <span>THE ATMOSPHERE</span>
          <button type="button" aria-pressed={atmosphere === "daylight"} onClick={() => setAtmosphere("daylight")}>Daylight</button>
          <button type="button" aria-pressed={atmosphere === "twilight"} onClick={() => setAtmosphere("twilight")}>Twilight</button>
        </div>
      </div>
      <aside className="gw-hero-note" aria-label="A little welcome">
        <span className="gw-note-orb">✦</span>
        <p className="gw-note-label">A sanctuary for their story</p>
        <p className="gw-note-copy">Their love belongs somewhere beautiful. Take a quiet moment, or make a place of your own.</p>
        <Link to="/memorials" className="gw-note-link">Visit the lights <span>↗</span></Link>
      </aside>
      <div className="gw-hero-bottomline"><span>FIVE QUIET WORLDS</span><span className="gw-bottomline-rule"/><span>ONE LOVE THAT NEVER LEAVES</span></div>
      <span className="gw-hero-location">{atmosphere === "daylight" ? "THE GOLDEN MEADOW" : "THE MOONLIT GARDEN"} · A WORLD MADE OF LOVE</span>
      <a href="#worlds" className="gw-scroll-cue" aria-label="Discover the sanctuary"><span/>Discover</a>
    </section>
    <section id="worlds" className="gw-worlds" aria-label="Places within the sanctuary">
      <article className="gw-world gw-world-golden">
        <div className="gw-world-image" aria-hidden="true" />
        <div className="gw-world-copy">
          <p className="gw-eyebrow">01 · In the warmth of the sun</p>
          <h2>The Golden<br/><em>Meadows.</em></h2>
          <Link to="/memorials" className="gw-world-link">Wander here <span>↗</span></Link>
        </div>
      </article>
      <article className="gw-world gw-world-twilight">
        <div className="gw-world-image" aria-hidden="true" />
        <div className="gw-world-copy">
          <p className="gw-eyebrow">02 · Under a quiet sky</p>
          <h2>The Moonlit<br/><em>Garden.</em></h2>
          <Link to="/memorials" className="gw-world-link">Wander here <span>↗</span></Link>
        </div>
      </article>
    </section>
    <section className="gw-destinations" aria-label="Sanctuary destinations">
      <article className="gw-destination gw-destination-falls"><div className="gw-destination-photo" aria-hidden="true"/><div><p>03 · Where water rests</p><h2>Crystal Falls</h2><Link to="/memorials" search={{ environment: "crystal-falls" }}>Find a quiet place <span>↗</span></Link></div></article>
      <article className="gw-destination gw-destination-woods"><div className="gw-destination-photo" aria-hidden="true"/><div><p>04 · Paths that go on forever</p><h2>Eternal Woods</h2><Link to="/memorials" search={{ environment: "eternal-woods" }}>Follow the path <span>↗</span></Link></div></article>
      <article className="gw-destination gw-destination-bridge"><div className="gw-destination-photo" aria-hidden="true"/><div><p>05 · A promise of reunion</p><h2>Rainbow Bridge</h2><Link to="/memorials" search={{ environment: "rainbow-bridge" }}>Remember together <span>↗</span></Link></div></article>
    </section>
    <section className="gw-remembrance">
      <div className="gw-remembrance-photo" role="img" aria-label="Sunlight falling through a peaceful woodland"/>
      <div className="gw-remembrance-copy">
        <p className="gw-eyebrow gw-eyebrow-dark">A place to keep their light</p>
        <h2>Love leaves<br/>a lasting light.</h2>
        <p>A free, beautiful place for their photographs, their story, and all the love that never leaves.</p>
        <Link to="/create" className="gw-text-link">Create a memorial <span>↗</span></Link>
      </div>
    </section>
    <section className="gw-quiet-cta">
      <p>For every wag, every purr, every little life that changed ours.</p>
      <Link to="/memorials" className="gw-text-link">Visit the sanctuary <span>↗</span></Link>
    </section>
    {selectedLantern ? <SharedLanternDialog lantern={selectedLantern} /> : null}
  </main></Shell>;
}

function SharedLanternDialog({ lantern }: { lantern: Lantern }) {
  const [message,setMessage]=useState("");
  const [author,setAuthor]=useState("");
  const [status,setStatus]=useState("");
  const [busy,setBusy]=useState(false);
  const [candleCount,setCandleCount]=useState(lantern.candle_count||0);
  const [candleLit,setCandleLit]=useState(false);
  const [candleBusy,setCandleBusy]=useState(false);
  async function lightCandle(){if(candleBusy||candleLit)return;setCandleBusy(true);try{const result=await lightSharedLantern({data:{lanternId:lantern.id}});setCandleCount(result.count);setCandleLit(true);}catch{setStatus("We couldn’t light the candle just now. Please try again.");}finally{setCandleBusy(false);}}
  async function submit(event:React.FormEvent){event.preventDefault();if(!message.trim())return;setBusy(true);setStatus("");try{await addWhisperBlessing(lantern.id,message,author||undefined);setMessage("");setStatus("Your blessing has been left.");window.location.reload();}catch(error){setStatus(error instanceof Error?error.message:"Could not leave blessing.");}finally{setBusy(false);}}
  return <div className="shared-lantern-backdrop"><article className="shared-lantern-dialog" role="dialog" aria-modal="true" aria-labelledby="shared-lantern-title"><button className="shared-lantern-close" onClick={()=>window.location.assign(window.location.pathname)} aria-label="Close memorial">×</button><p className="sanctuary-overline">A lantern in the sanctuary</p><p className="shared-lantern-environment">{({ "golden-meadows":"The Golden Meadows", "moonlit-garden":"The Moonlit Garden", "crystal-falls":"Crystal Falls", "eternal-woods":"The Eternal Woods", "rainbow-bridge":"Rainbow Bridge" } as Record<string,string>)[lantern.environment] || "Their sanctuary"}</p>{lantern.photo_url?<img className="shared-lantern-photo" src={lantern.photo_url} alt={lantern.name}/>:<div className="shared-lantern-placeholder">✦</div>}<h2 id="shared-lantern-title">{lantern.name}</h2><p className="shared-lantern-dates">{lantern.dates}</p>{lantern.story?<p className="shared-lantern-story">{lantern.story}</p>:null}{lantern.quote?<blockquote>{lantern.quote}</blockquote>:null}<div className="shared-lantern-candle"><button type="button" onClick={()=>void lightCandle()} disabled={candleBusy||candleLit}>{candleLit?"Candle lit · Your love is here":candleBusy?"Lighting…":"Light a candle"}</button><p>{candleCount} {candleCount===1?"light":"lights"} kept here</p></div><div className="shared-lantern-whispers"><h3>Whispered blessings</h3>{(lantern.whispers||[]).length?(lantern.whispers||[]).slice(0,8).map(w=><p key={w.id} className="shared-whisper">“{w.message}”<small>— {w.author}</small></p>):<p className="shared-whisper-empty">Be the first to leave a gentle word.</p>}</div><form onSubmit={submit} className="shared-whisper-form"><label>Leave a blessing<textarea maxLength={180} value={message} onChange={e=>setMessage(e.target.value)} placeholder="A little love, left here…" required/></label><label>Your name (optional)<input maxLength={60} value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Kindled in the Garden"/></label><button disabled={busy||!message.trim()}>{busy?"Leaving your blessing…":"Leave a whispered blessing"}</button></form><div className="shared-lantern-share-actions"><button className="shared-lantern-share" onClick={()=>void shareMemorialLink(lantern)}>Share this lantern</button><button className="shared-lantern-share" onClick={()=>downloadLanternCard(lantern)}>Save remembrance card</button></div>{status?<p role="status" className="shared-lantern-status">{status}</p>:null}</article></div>;
}


function downloadLanternCard(lantern: Lantern) {
  const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 630;
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  const themes: Record<string,[string,string,string]> = {"golden-meadows":["#263a2b","#d8b875","#f5ead3"],"moonlit-garden":["#101c30","#8199c3","#f0e8d9"],"crystal-falls":["#142e38","#71b7c8","#edf6f4"],"eternal-woods":["#17261d","#8b9a72","#e7e9dc"],"rainbow-bridge":["#443a56","#d3a3be","#fff0df"]};
  const colors=themes[lantern.environment]||themes["golden-meadows"];
  const grad=ctx.createLinearGradient(0,0,1200,630);grad.addColorStop(0,colors[0]);grad.addColorStop(1,colors[1]);ctx.fillStyle=grad;ctx.fillRect(0,0,1200,630);
  ctx.fillStyle="rgba(255,255,255,.045)";ctx.beginPath();ctx.arc(970,170,210,0,Math.PI*2);ctx.fill();ctx.strokeStyle="rgba(255,255,255,.25)";ctx.lineWidth=2;ctx.strokeRect(42,42,1116,546);
  ctx.textAlign="center";ctx.fillStyle=colors[2];ctx.font="500 24px Georgia";ctx.fillText("G E N T L E W I C K",600,130);ctx.font="italic 30px Georgia";ctx.fillText("A light kept in love",600,195);
  ctx.fillStyle="#f7d99b";ctx.shadowColor="#f7d99b";ctx.shadowBlur=34;ctx.beginPath();ctx.ellipse(600,285,20,42,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle=colors[2];ctx.font="52px Georgia";ctx.fillText(lantern.name,600,390);ctx.font="24px Georgia";ctx.fillStyle="rgba(255,255,255,.82)";ctx.fillText(lantern.dates||"Forever remembered",600,440);ctx.font="italic 24px Georgia";ctx.fillText("Where every paw finds paradise.",600,520);
  const link=document.createElement("a");link.download=lantern.name.replace(/[^a-z0-9-]/gi,"-")+"-gentlewick.png";link.href=canvas.toDataURL("image/png");link.click();
}
