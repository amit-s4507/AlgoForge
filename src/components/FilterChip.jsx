import { classNames } from "../utils/helpers";

export function FilterChip({ label, active, onToggle }){
  return (
    <button onClick={onToggle} className={classNames("rounded-full border px-3 py-1 text-xs", active?"border-emerald-400 bg-emerald-500/10 text-emerald-300":"border-white/10 text-gray-300 hover:border-white/20")}>{label}</button>
  );
}
