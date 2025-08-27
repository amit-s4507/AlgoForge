// ------------------------------- Utilities ----------------------------------
export const todayKey = () => new Date().toISOString().slice(0,10);
export const pct = (a,b) => (b ? Math.round((a/b)*100) : 0);
export const classNames = (...xs) => xs.filter(Boolean).join(" ");

export function getPastDates(days = 365){
  const now = new Date();
  const out = [];
  for(let i=days-1;i>=0;i--){ 
    const d = new Date(now); 
    d.setDate(now.getDate()-i); 
    out.push(d.toISOString().slice(0,10)); 
  }
  return out;
}

export function levelForCount(c){ if(!c) return 0; if(c>=5) return 4; if(c>=3) return 3; if(c>=2) return 2; return 1; }
export function heatColor(level){ return ["bg-white/5","bg-emerald-500/25","bg-emerald-500/50","bg-emerald-500/75","bg-emerald-500"][level] || "bg-white/5"; }
export function computeStreak(activity){ 
  let s=0; 
  for(let i=0;i<365;i++){ 
    const d=new Date(); 
    d.setDate(d.getDate()-i); 
    const k=d.toISOString().slice(0,10); 
    if((activity[k]||0)>0) s++; 
    else break; 
  } 
  return s; 
}

export function toggleSet(dispatch, ui, key, value){
  const current = new Set(ui.filters[key] || []);
  if(current.has(value)) current.delete(value); else current.add(value);
  dispatch({ type:"ui:filters", payload: { [key]: current } });
}

export function slug(s){ 
  if (!s || typeof s !== 'string') return ''; 
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); 
}
