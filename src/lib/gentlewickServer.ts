import { createServerFn } from "@tanstack/react-start";

type Environment='golden-meadows'|'moonlit-garden'|'crystal-falls'|'eternal-woods'|'rainbow-bridge';\ntype CreateInput={slug:string;name:string;dates:string;scent:string;photo_url:string|null;story:string;quote:string;sky_x:number;sky_y:number;environment:Environment};
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
 const res=await fetch(`${url}/rest/v1/rpc/create_lantern_with_environment`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({p_slug:slug,p_name:name,p_dates:dates,p_scent:scent,p_photo_url:data.photo_url,p_story:story,p_quote:quote,p_sky_x:Math.floor(18+Math.random()*64),p_sky_y:Math.floor(28+Math.random()*40),p_environment:data.environment}});
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
