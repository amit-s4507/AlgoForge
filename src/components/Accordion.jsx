import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { classNames } from "../utils/helpers";

export function Accordion({ title, right, children }){
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={()=>setOpen(o=>!o)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-white/5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-tight text-gray-100">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {right}
          <ChevronDown className={classNames("h-4 w-4 text-gray-400 transition", open?"rotate-0":"-rotate-180")} />
        </div>
      </button>
      {open && <div className="pt-0">{children}</div>}
    </div>
  );
}
