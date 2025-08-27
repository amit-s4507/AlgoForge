import { X } from "lucide-react";

export function Modal({ title, onClose, children }){
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-black/60 p-3">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0f1117] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="text-sm font-semibold tracking-tight">{title}</div>
          <button onClick={onClose} className="rounded-xl border border-white/10 p-1.5 hover:border-white/20"><X className="h-4 w-4"/></button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
