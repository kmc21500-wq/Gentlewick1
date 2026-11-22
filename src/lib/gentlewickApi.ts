export type Whisper = { id:string; lantern_id:string; message:string; author:string; created_at:string };
export type Environment='golden-meadows'|'moonlit-garden'|'crystal-falls'|'eternal-woods'|'rainbow-bridge';\nexport type Lantern = { id:string; slug:string; name:string; dates:string; scent:string; photo_url:string|null; story:string; quote:string; sky_x:number; sky_y:number; environment:Environment; candle_count:number; created_at:string; whispers?:Whisper[] };

function config() {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export function isSupabaseConfigured() { return Boolean(config()); }

async function request<T>(path:string, options:RequestInit = {}):Promise<T> {
  const cfg=config();
  if (!cfg) throw new Error("Gentlewick cloud storage is not configured yet.");
  const response=await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...options,
    headers: { apikey:cfg.key, Authorization:`Bearer ${cfg.key}`, "Content-Type":"application/json", ...(options.headers||{}) },
  });
  if (!response.ok) {
    const detail=await response.text();
    throw new Error(detail || `Supabase request failed (${response.status})`);
  }
  if (response.status===204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function fetchSanctuaryLanterns():Promise<Lantern[]> {
  return request<Lantern[]>("lanterns?select=*,whispers(*)&order=created_at.desc").then(items=>items.map(item=>({...item,whispers:(item.whispers||[]).sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at))})));
}

export async function fetchLanternBySlug(slug:string):Promise<Lantern|null> {
  const rows=await request<Lantern[]>(`lanterns?slug=eq.${encodeURIComponent(slug)}&select=*,whispers(*)&limit=1`);
  return rows[0] ? {...rows[0],whispers:(rows[0].whispers||[]).sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at))} : null;
}

export async function uploadLanternPhoto(file:File):Promise<string> {
  if (!["image/jpeg","image/png","image/webp"].includes(file.type)) throw new Error("Use a JPEG, PNG, or WebP image.");
  if (file.size>5*1024*1024) throw new Error("Photo must be 5 MB or smaller.");
  const cfg=config(); if(!cfg) throw new Error("Cloud storage isn't configured.");
  const ext=file.type==="image/png"?"png":file.type==="image/webp"?"webp":"jpg";
  const path=`${crypto.randomUUID()}.${ext}`;
  const response=await fetch(`${cfg.url}/storage/v1/object/lantern-photos/${path}`,{method:"POST",headers:{apikey:cfg.key,Authorization:`Bearer ${cfg.key}`,"Content-Type":file.type,"x-upsert":"false"},body:file});
  if(!response.ok) throw new Error(await response.text()||"Photo upload failed.");
  return `${cfg.url}/storage/v1/object/public/lantern-photos/${path}`;
}

export async function addWhisperBlessing(lanternId:string,message:string,author="Kindled in the Garden"):Promise<Whisper> {
  const clean=message.trim().slice(0,180); if(!clean) throw new Error("Write a blessing first.");
  const rows=await request<Whisper[]>("whispers?select=*",{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify({lantern_id:lanternId,message:clean,author:author.trim().slice(0,60)||"Kindled in the Garden"})});
  return rows[0];
}

export async function shareMemorialLink(lantern:Lantern) {
  const url=`${window.location.origin}/?pet=${encodeURIComponent(lantern.slug)}`;
  try {
    if(navigator.share) await navigator.share({title:`${lantern.name} — Gentlewick Sanctuary`,text:`Visit ${lantern.name}’s lantern and leave a whispered blessing.`,url});
    else await navigator.clipboard.writeText(url);
  } catch(error) {
    if(error instanceof Error && error.name==="AbortError") return;
    await navigator.clipboard.writeText(url);
  }
}
