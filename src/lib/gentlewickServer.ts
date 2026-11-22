import { createServerFn } from "@tanstack/react-start";

type Environment='golden-meadows'|'moonlit-garden'|'crystal-falls'|'eternal-woods'|'rainbow-bridge';
type CreateInput={slug:string;name:string;dates:string;scent:string;photo_url:string|null;story:string;quote:string;sky_x:number;sky_y:number;environment:Environment};
type UpdateInput={lanternId:string;editToken:string;name:string;dates:string;scent:string;photo_url:string|null;story:string;quote:string};

function adminConfig(){
 const url=process.env.VITE_SUPABASE_URL;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key) throw new Error("Gentlewick cloud backend is not configured.");
 return {url:url.replace(/\/$/,""),key};
}
async function adminRequest<T>(path:string,init:RequestInit={}):Promise<T>{
 const cfg=adminConfig();
 const response=await fetch(`${cfg.url}/rest/v1/${path}`,{...init,headers:{apikey:cfg.key,Authorization:`Bearer ${cfg.key}`,"Content-Type":"application/json",...(init.headers||{})}});
 if(!response.ok) throw new Error(await response.text()||`Backend error ${response.status}`);
 return response.json() as Promise<T>;
}
function safeString(value:unknown,max:number,field:string){if(typeof value!=="string"||value.length>max)throw new Error(`Invalid ${field}`);return value.trim();}
export const fetchPublicLanterns=createServerFn({method:"GET"}).handler(async()=>{
 if(!process.env.VITE_SUPABASE_URL||!process.env.VITE_SUPABASE_ANON_KEY) return [];
 const url=process.env.VITE_SUPABASE_URL.replace(/\/$/,"");
 const key=process.env.VITE_SUPABASE_ANON_KEY;
 const res=await fetch(`${url}/rest/v1/lanterns?select=*,whispers(*)&order=created_at.desc`,{headers:{apikey:key,Authorization:`Bearer ${key}`}});
 if(!res.ok) throw new Error("Could not load sanctuary lanterns.");
 return await res.json();
});
export const createSecureLantern=createServerFn({method:"POST"}).validator((data:CreateInput)=>data).handler(async({data})=>{
 const name=safeString(data.name,60,"name"); if(!name)throw new Error("A name is required.");
 const dates=safeString(data.dates,120,"dates"),scent=safeString(data.scent,100,"scent");
 const story=safeString(data.story,2000,"story"),quote=safeString(data.quote,280,"quote");
 const slugBase=name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,48)||"companion";
 const slug=`${slugBase}-${crypto.randomUUID().slice(0,8)}`;
 const {url,key}=adminConfig();
 const res=await fetch(`${url}/rest/v1/rpc/create_lantern_with_environment`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({p_slug:slug,p_name:name,p_dates:dates,p_scent:scent,p_photo_url:data.photo_url,p_story:story,p_quote:quote,p_sky_x:Math.floor(18+Math.random()*64),p_sky_y:Math.floor(28+Math.random()*40),p_environment:data.environment})});
 if(!res.ok)throw new Error(await res.text()||"Memorial creation failed.");
 const result=await res.json();
 return {lantern:{...result.lantern,whispers:[]},editToken:result.editToken};
});
export const updateSecureLantern=createServerFn({method:"POST"}).validator((data:UpdateInput)=>data).handler(async({data})=>{
 const token=safeString(data.editToken,80,"owner token"); if(!token)throw new Error("Owner token required.");
 const secrets=await adminRequest<{edit_token:string}[]>(`lantern_secrets?lantern_id=eq.${encodeURIComponent(data.lanternId)}&select=edit_token`);
 if(!secrets[0]||secrets[0].edit_token!==token)throw new Error("Unauthorized: invalid owner token.");
 const update={name:safeString(data.name,60,"name"),dates:safeString(data.dates,120,"dates"),scent:safeString(data.scent,100,"scent"),photo_url:data.photo_url,story:safeString(data.story,2000,"story"),quote:safeString(data.quote,280,"quote")};
 const rows=await adminRequest<any[]>(`lanterns?id=eq.${encodeURIComponent(data.lanternId)}&select=*`,{method:"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify(update)});
 if(!rows[0])throw new Error("Memorial not found.");
 return rows[0];
});

type LightInput={lanternId:string};
export const lightSharedLantern=createServerFn({method:"POST"}).validator((data:LightInput)=>data).handler(async({data})=>{
 const id=safeString(data.lanternId,64,"lantern id");
 if(!/^[0-9a-f-]{36}$/i.test(id))throw new Error("Invalid memorial.");
 const count=await adminRequest<number>("rpc/light_shared_lantern",{method:"POST",body:JSON.stringify({p_lantern_id:id})});
 return {count};
});

type ReportInput={
 target_url:string; item_type:string; reason:string; explanation:string;
 reporter_name:string; reporter_email:string; good_faith:boolean; website?:string;
};
const reportReasons=['animal_cruelty','harassment_hate_threats','private_data_doxxing','copyright_privacy','spam_scam','suspected_csam','other_illegal'];
const reportItems=['memorial_text','photo','condolence','other'];
async function reportLimiterHash(value:string){const bytes=new TextEncoder().encode(value.trim().toLowerCase());const digest=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');}
export const submitContentReport=createServerFn({method:'POST'}).validator((data:ReportInput)=>data).handler(async({data})=>{
 const honeypot=String(data.website||'').trim();
 if(honeypot) return {accepted:true,receipt:'GW-accepted'};
 const urlText=safeString(data.target_url,2048,'report URL');
 let parsed:URL;
 try{parsed=new URL(urlText);}catch{throw new Error('Enter a valid link to the content.');}
 if(parsed.protocol!=='https:'||!['gentlewick.com','www.gentlewick.com'].includes(parsed.hostname.toLowerCase())) throw new Error('Reports must link to content on Gentlewick.com.');
 if(!reportItems.includes(data.item_type))throw new Error('Choose the type of content being reported.');
 if(!reportReasons.includes(data.reason))throw new Error('Choose a reason for your report.');
 const explanation=safeString(data.explanation,4000,'explanation');
 if(explanation.length<10)throw new Error('Please explain your concern in a little more detail.');
 const csam=data.reason==='suspected_csam';
 const name=safeString(data.reporter_name||'',200,'name');
 const email=safeString(data.reporter_email||'',320,'email');
 if(!csam&&!name)throw new Error('Your full name is required for this report.');
 if(!csam&&!/^\S+@\S+\.\S+$/.test(email))throw new Error('Enter a valid email address.');
 if(email&&!/^\S+@\S+\.\S+$/.test(email))throw new Error('Enter a valid email address.');
 if(data.good_faith!==true)throw new Error('Please confirm the good-faith declaration.');
 const limiterKey=email? `email:${email.toLowerCase()}` : `anonymous-target:${parsed.pathname.toLowerCase()}`;
 const limiterHash=await reportLimiterHash(limiterKey);
 const allowed=await adminRequest<boolean>('rpc/consume_content_report_rate_limit',{method:'POST',body:JSON.stringify({p_limiter_hash:limiterHash,p_limit:3,p_window_seconds:3600})});
 if(!allowed)throw new Error('You have submitted too many reports recently. Please try again in an hour.');
 const rows=await adminRequest<{id:string;created_at:string}[]>('content_reports?select=id,created_at',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({target_url:parsed.toString(),item_type:data.item_type,reason:data.reason,explanation,reporter_name:name||null,reporter_email:email||null,good_faith:true})});
 if(!rows[0])throw new Error('The report could not be saved. Please try again.');
 return {accepted:true,receipt:'GW-'+rows[0].id.slice(0,8).toUpperCase(),created_at:rows[0].created_at};
});
