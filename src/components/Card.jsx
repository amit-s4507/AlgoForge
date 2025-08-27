import { classNames } from "../utils/helpers";

export function Card({ title, right, noDivider, children }){
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11131a] shadow-xl shadow-black/20">
      {(title || right) && (
        <div className={classNames("flex items-center justify-between px-4 py-3", !noDivider && "border-b border-white/5") }>
          <div className="text-sm font-semibold tracking-tight">{title}</div>
          <div>{right}</div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
