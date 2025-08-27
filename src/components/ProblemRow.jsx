import { CheckCircle2, Circle, PencilLine, Youtube, ExternalLink, FileText } from "lucide-react";
import { classNames } from "../utils/helpers";

export function ProblemRow({ item, state, onToggleSolved, onToggleRevision }){
  const solved = state === "solved"; const revise = state === "revise";
  return (
    <div className="flex items-center gap-3 px-3 py-3 hover:bg-white/5">
      <button onClick={onToggleSolved} className={classNames("grid h-6 w-6 place-items-center rounded-md border", solved?"border-emerald-500/60 bg-emerald-500/10":"border-white/10 bg-white/0")}>{solved? <CheckCircle2 className="h-4 w-4 text-emerald-400"/> : <Circle className="h-4 w-4 text-gray-400"/>}</button>
      <div className="flex-1 text-sm">
        <div className="font-medium text-gray-100">{item.title}</div>
        <div className="text-xs text-gray-400">{item.difficulty}  {item.tags.join(", ")}</div>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1">
          <ExternalLink className="h-3 w-3"/>Open
        </a>
        {item.youtubeUrl && (
          <a href={item.youtubeUrl} target="_blank" rel="noreferrer" className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1">
            <Youtube className="h-3 w-3"/>Video
          </a>
        )}
        {item.codeforcesUrl && (
          <a href={item.codeforcesUrl} target="_blank" rel="noreferrer" className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1">
            <ExternalLink className="h-3 w-3"/>CF
          </a>
        )}
        {item.articleUrl && (
          <a href={item.articleUrl} target="_blank" rel="noreferrer" className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1">
            <FileText className="h-3 w-3"/>Article
          </a>
        )}
        <button onClick={onToggleRevision} title="Mark for revision" className={classNames("rounded-md px-2 py-1 text-xs hover:bg-white/10", revise && "text-yellow-300")}>Revise</button>
        <button className="rounded-md px-2 py-1 text-xs hover:bg-white/10"><PencilLine className="h-4 w-4"/></button>
      </div>
    </div>
  );
}
