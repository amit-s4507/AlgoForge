import { levelForCount, heatColor, classNames } from "../utils/helpers";

export function Heatmap({ days, counts }){
  const weeks=[]; for(let i=0;i<days.length;i+=7) weeks.push(days.slice(i,i+7));
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {weeks.map((wk,i)=>(
          <div key={i} className="flex flex-col gap-1">
            {wk.map(d=>{ const level=levelForCount(counts[d]); return <div key={d} className={classNames("h-3 w-3 rounded-sm", heatColor(level))} title={`${d}  ${counts[d]||0} solved`}/>; })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400"><span>Less</span>{[0,1,2,3,4].map(l=>(<div key={l} className={classNames("h-3 w-3 rounded-sm", heatColor(l))}/>))}<span>More</span></div>
    </div>
  );
}
