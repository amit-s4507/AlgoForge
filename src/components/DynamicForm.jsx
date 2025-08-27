import { useState } from "react";
import { TagInput } from "./TagInput";

export function DynamicForm({ schema, onSubmit }){
  const [form, setForm] = useState(()=>Object.fromEntries(schema.map(f=>[f.key, f.default || (f.type==="tags"?[]:"")])));
  return (
    <form onSubmit={e=>{ e.preventDefault(); onSubmit(form); }} className="space-y-4">
      {schema.map(field=> (
        <div key={field.key} className="space-y-1">
          <label className="text-xs text-gray-300">{field.label}</label>
          {field.type === "text" && (
            <input required={field.required} placeholder={field.placeholder} value={form[field.key]||""} onChange={e=>setForm({...form,[field.key]:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"/>
          )}
          {field.type === "url" && (
            <input type="url" placeholder={field.placeholder} value={form[field.key]||""} onChange={e=>setForm({...form,[field.key]:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"/>
          )}
          {field.type === "textarea" && (
            <textarea placeholder={field.placeholder} value={form[field.key]||""} onChange={e=>setForm({...form,[field.key]:e.target.value})} className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"/>
          )}
          {field.type === "select" && (
            <select required={field.required} value={form[field.key]||field.options[0]} onChange={e=>setForm({...form,[field.key]:e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/20">
              {field.options.map(opt=> <option key={opt} value={opt}>{opt}</option>)}
            </select>
          )}
          {field.type === "tags" && (
            <TagInput value={form[field.key]||[]} placeholder={field.placeholder} onChange={(v)=>setForm({...form,[field.key]:v})} />
          )}
        </div>
      ))}
      <div className="flex justify-end gap-2 pt-2">
        <button type="submit" className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">Save</button>
      </div>
    </form>
  );
}
