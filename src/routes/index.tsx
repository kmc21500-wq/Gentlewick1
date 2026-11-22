import { createFileRoute, Link } from "@tanstack/react-router";
import { type Lantern } from "@/lib/gentlewickApi";
import { fetchPublicLanterns } from "@/lib/gentlewickServer";
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
  const selectedLantern = lanterns.find((lantern) => lantern.slug === pet) ?? null;
  return <Shell><main className="gw-home">
    <section className="gw-hero" aria-label="Welcome to Gentlewick">
      <div className="gw-hero-image" aria-hidden="true" />
      <div className="gw-hero-shade" aria-hidden="true" />
      <div className="gw-hero-content">
        <p className="gw-eyebrow">A world made of love</p>
        <h1>Where every paw<br/><em>finds paradise.</em></h1>
        <p className="gw-hero-copy">A beautiful place to remember the ones who made our world brighter.</p>
        <div className="gw-hero-actions">
          <Link to="/create" className="gw-primary">Create a memorial</Link>
          <Link to="/memorials" className="gw-secondary">Enter the sanctuary</Link>
        </div>
      </div>
      <span className="gw-hero-location">THE GOLDEN MEADOW · GENTLEWICK</span>
      <a href="#remember" className="gw-scroll-cue" aria-label="Scroll to remembrance"><span/>Discover</a>
    </section>
    <section id="remember" className="gw-remembrance">
      <div className="gw-remembrance-photo" role="img" aria-label="A peaceful woodland meadow in warm afternoon light"/>
      <div className="gw-remembrance-copy">
        <p className="gw-eyebrow gw-eyebrow-dark">A place to return to</p>
        <h2>They deserve a world<br/>as beautiful as our love.</h2>
        <p>Create a free, lasting place for their name, photographs, and story. Visit whenever your heart needs to.</p>
        <Link to="/create" className="gw-text-link">Create their sanctuary <span>↗</span></Link>
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
  async function submit(event:React.FormEvent){event.preventDefault();if(!message.trim())return;setBusy(true);setStatus("");try{await addWhisperBlessing(lantern.id,message,author||undefined);setMessage("");setStatus("Your blessing has been left.");window.location.reload();}catch(error){setStatus(error instanceof Error?error.message:"Could not leave blessing.");}finally{setBusy(false);}}
  return <div className="shared-lantern-backdrop"><article className="shared-lantern-dialog" role="dialog" aria-modal="true" aria-labelledby="shared-lantern-title"><button className="shared-lantern-close" onClick={()=>window.location.assign(window.location.pathname)} aria-label="Close memorial">×</button><p className="sanctuary-overline">A lantern in the sanctuary</p>{lantern.photo_url?<img className="shared-lantern-photo" src={lantern.photo_url} alt={lantern.name}/>:<div className="shared-lantern-placeholder">✦</div>}<h2 id="shared-lantern-title">{lantern.name}</h2><p className="shared-lantern-dates">{lantern.dates}</p>{lantern.story?<p className="shared-lantern-story">{lantern.story}</p>:null}{lantern.quote?<blockquote>{lantern.quote}</blockquote>:null}<div className="shared-lantern-whispers"><h3>Whispered blessings</h3>{(lantern.whispers||[]).length?(lantern.whispers||[]).slice(0,8).map(w=><p key={w.id} className="shared-whisper">“{w.message}”<small>— {w.author}</small></p>):<p className="shared-whisper-empty">Be the first to leave a gentle word.</p>}</div><form onSubmit={submit} className="shared-whisper-form"><label>Leave a blessing<textarea maxLength={180} value={message} onChange={e=>setMessage(e.target.value)} placeholder="A little love, left here…" required/></label><label>Your name (optional)<input maxLength={60} value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Kindled in the Garden"/></label><button disabled={busy||!message.trim()}>{busy?"Leaving your blessing…":"Leave a whispered blessing"}</button></form><button className="shared-lantern-share" onClick={()=>void shareMemorialLink(lantern)}>Share this lantern</button>{status?<p role="status" className="shared-lantern-status">{status}</p>:null}</article></div>;
}
