export function ProgressRow({ label, value }){
  return (
    <div className="mb-3">
      <div className="mb-1 flex items-center justify-between text-xs"><span className="text-gray-300">{label}</span><span className="text-gray-400">{value}%</span></div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{width:`${value}%`}}/></div>
    </div>
  );
}
