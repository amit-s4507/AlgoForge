import { getPastDates } from "../utils/helpers";

export function Last7({ activity }){
  const last7 = getPastDates(7);
  const m = Math.max(...last7.map(d=>activity[d]||0), 1);
  return (
    <div className="flex items-end gap-1">
      {last7.map(d=>{ const v=activity[d]||0; const h=Math.round((v/m)*16)+4; return <div key={d} className="w-1.5 rounded-sm bg-emerald-400/70" style={{height:h}} title={`${d}: ${v}`}/>; })}
    </div>
  );
}
