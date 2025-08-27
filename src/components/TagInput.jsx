import { useState } from "react";
import { Tags } from "lucide-react";

export function TagInput({ value, onChange, placeholder }){
  const [input, setInput] = useState("");
  const add = () => { const v=input.trim(); if(!v) return; onChange([...(value||[]), v]); setInput(""); };
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-2">
      <div className="flex flex-wrap gap-2">
        {(value||[]).map((t,i)=>(
          <span key={i} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs">
            <Tags className="h-3 w-3"/>{t}
            <button onClick={()=>onChange(value.filter((_,idx)=>idx!==i))} className="ml-1 text-gray-400 hover:text-white">×</button>
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); add(); } }} placeholder={placeholder} className="flex-1 rounded-lg border border-white/10 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"/>
        <button type="button" onClick={add} className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:border-white/20">Add</button>
      </div>
    </div>
  );
}
