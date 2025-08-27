﻿﻿﻿﻿﻿﻿import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, Settings, LogOut, CalendarDays, Filter, Tags, Layers, PencilLine, FolderPlus, X, Upload, Download, User, BookOpen, Target } from "lucide-react";

// Import components
import { Card } from "./components/Card";
import { ProgressRow } from "./components/ProgressRow";
import { Last7 } from "./components/Last7";
import { Accordion } from "./components/Accordion";
import { ProblemRow } from "./components/ProblemRow";
import { Heatmap } from "./components/Heatmap";
import { FilterChip } from "./components/FilterChip";
import { Modal } from "./components/Modal";
import { DynamicForm } from "./components/DynamicForm";
import { LoginModal } from "./components/LoginModal";
import { UserMenu } from "./components/UserMenu";
import { TopicsView } from "./components/TopicsView";
import { ProfilePage } from "./components/ProfilePage";

// Import hooks and utilities
import { useAppReducer } from "./hooks/useAppReducer";
import { useAuth } from "./contexts/AuthContext";
import { todayKey, pct, classNames, getPastDates, computeStreak, toggleSet, slug } from "./utils/helpers";
import { SCHEMA } from "./data/schema";
import { getAllTopicProblems } from "./data/topicsData";

/**
 * AlgoForge — DSA Sheet UI (Fresh blend, schemadriven, extensible)
 * ---------------------------------------------------------------
 * A clean, modern React + Tailwind frontend for a DSA practice platform that
 * blends patterns from popular sheets without cloning any single one.
 *
 * Core ideas
 * - Schemadriven data model (Sheet  Section  Problem) with a dynamic Form
 *   renderer so future forms/fields can be added without custom code.
 * - Heatmap + progress + search + filters (difficulty, tags, status).
 * - Admin mode for inline content editing (add sheet/section/problem).
 * - LocalStorage persistence with clear dropin points for backend wiring.
 *
 * Hook up to backend (Supabase/Appwrite/Firebase/Nhost/etc.) by replacing
 * load/save functions in the `persistence` block.
 */

export default function AlgoForge(){
  const [state, dispatch] = useAppReducer();
  const { user, isAuthenticated } = useAuth();
  const { sheets, progress, activity, ui } = state;
  const activeSheet = useMemo(()=> sheets.find(s=>s.id===ui.selectedSheetId) || sheets[0], [sheets, ui.selectedSheetId]);

  // Navigation state
  const [currentView, setCurrentView] = useState('sheets'); // 'sheets', 'topics', 'profile'
  const [showProfilePage, setShowProfilePage] = useState(false);

  useEffect(()=>{ dispatch({type:"persist"}); }, [sheets, progress, activity, ui]);

  // ------- Derived metrics (including topics data) -------
  const allItems = useMemo(()=> {
    const sheetItems = sheets.flatMap(s=>s.sections.flatMap(sec=>sec.items));
    const topicItems = getAllTopicProblems();
    return [...sheetItems, ...topicItems];
  }, [sheets]);
  
  const solvedCount = useMemo(()=> Object.values(progress).filter(p=>p.status==="solved").length, [progress]);
  const totalProblems = allItems.length;

  const diffTotals = useMemo(()=>{
    const base={ Easy:{total:0,done:0}, Medium:{total:0,done:0}, Hard:{total:0,done:0} };
    for(const it of allItems){ base[it.difficulty].total++; }
    for(const [pid,p] of Object.entries(progress)){
      const item = allItems.find(x=>x.id===pid); if(!item) continue; if(p.status==="solved") base[item.difficulty].done++;
    }
    return base;
  }, [allItems, progress]);

  // ------- Actions -------
  const markSolved = (problemId)=>{
    const prev = state.progress[problemId];
    const next = { [problemId]: { status: prev?.status === "solved" ? "todo" : "solved", lastSolvedAt: new Date().toISOString() } };
    dispatch({ type:"progress:set", payload: next });
    // heatmap
    const k = todayKey();
    dispatch({ type:"activity:set", payload: { [k]: (activity[k]||0) + (prev?.status === "solved" ? -1 : 1) } });
  };
  const toggleRevision = (problemId)=>{
    const prev = state.progress[problemId] || { status:"todo" };
    dispatch({ type:"progress:set", payload: { [problemId]: { ...prev, status: prev.status === "revise" ? "todo" : "revise" } } });
  };

  // ------- Filters -------
  const [localQuery, setLocalQuery] = useState(ui.filters.q);
  useEffect(()=>{ const id = setTimeout(()=>dispatch({type:"ui:filters", payload:{ q: localQuery }}), 200); return ()=>clearTimeout(id); }, [localQuery]);

  const filteredSections = useMemo(()=>{
    const q = (ui.filters.q||"").toLowerCase();
    const wantDiff = ui.filters.diffs; const wantTags = ui.filters.tags; const wantStatus = ui.filters.status;
    const hasDiff = wantDiff && wantDiff.size>0; const hasTags = wantTags && wantTags.size>0; const hasStatus = wantStatus && wantStatus.size>0;
    return activeSheet.sections.map(sec=>({
      ...sec,
      items: sec.items.filter(it=>{
        if(q && !it.title.toLowerCase().includes(q)) return false;
        if(hasDiff && !wantDiff.has(it.difficulty)) return false;
        if(hasTags && !it.tags.some(t=>wantTags.has(t))) return false;
        if(hasStatus){
          const st = state.progress[it.id]?.status || "todo";
          if(!wantStatus.has(st)) return false;
        }
        return true;
      })
    }));
  }, [activeSheet, ui.filters, state.progress]);

  // ------- Admin Modals -------
  const [modal, setModal] = useState(null); // {type:'problem'|'section'|'sheet', data:{...}}
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Handle profile navigation
  const handleProfileClick = () => {
    setShowProfilePage(true);
  };

  // Handle topics problem toggle
  const handleTopicProblemToggle = (problemId) => {
    markSolved(problemId);
  };

  // If showing profile page, render it
  if (showProfilePage) {
    return (
      <ProfilePage 
        progress={progress} 
        activity={activity} 
        onClose={() => setShowProfilePage(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b10] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0b10]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500"/>
            <div className="text-lg font-semibold tracking-tight">AlgoForge</div>
            <div className="ml-6 hidden items-center gap-4 text-sm text-gray-400 md:flex">
              <button 
                onClick={() => setCurrentView('sheets')}
                className={classNames(
                  "hover:text-white transition-colors",
                  currentView === 'sheets' ? "text-white" : ""
                )}
              >
                Practice
              </button>
              <button 
                onClick={() => setCurrentView('topics')}
                className={classNames(
                  "hover:text-white transition-colors flex items-center gap-1",
                  currentView === 'topics' ? "text-white" : ""
                )}
              >
                <BookOpen className="h-4 w-4" />
                Topics
              </button>
              {isAuthenticated && (
                <button 
                  onClick={handleProfileClick}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Target className="h-4 w-4" />
                  Profile
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:border-white/20">
              <CalendarDays className="mr-2 inline h-4 w-4 text-emerald-300"/>
              Streak {computeStreak(activity)}
            </button>
            <label className="hidden items-center gap-2 text-sm text-gray-300 md:flex">
              <input type="checkbox" className="h-4 w-4" checked={ui.admin} onChange={e=>dispatch({type:"ui:set", payload:{admin:e.target.checked}})} />
              Admin Mode
            </label>
            <button className="rounded-xl border border-white/10 p-2 hover:border-white/20"><Settings className="h-4 w-4"/></button>
            {isAuthenticated ? (
              <UserMenu onProfileClick={handleProfileClick} />
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-300 hover:border-white/20 flex items-center gap-2"
              >
                <User className="h-4 w-4"/>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[320px,1fr]">
        {/* Sidebar */}
        <aside className="space-y-6">
          <Card title="Activity" right={<Last7 activity={activity}/>}>
            <div className="text-sm text-gray-400">{Object.keys(activity).length} day logs  {solvedCount} solved</div>
          </Card>

          <Card title="Progress" right={<span className="text-xs text-gray-400">{pct(solvedCount,totalProblems)}%</span>}>
            <ProgressRow label="Overall" value={pct(solvedCount,totalProblems)} />
            <ProgressRow label={`Easy (${diffTotals.Easy.done}/${diffTotals.Easy.total})`} value={pct(diffTotals.Easy.done,diffTotals.Easy.total)} />
            <ProgressRow label={`Medium (${diffTotals.Medium.done}/${diffTotals.Medium.total})`} value={pct(diffTotals.Medium.done,diffTotals.Medium.total)} />
            <ProgressRow label={`Hard (${diffTotals.Hard.done}/${diffTotals.Hard.total})`} value={pct(diffTotals.Hard.done,diffTotals.Hard.total)} />
          </Card>

          <Card title="Data">
            <div className="flex flex-wrap gap-2 text-xs">
              <button onClick={()=>{ if(confirm("Reset local state? This will clear all your progress and data.")){ localStorage.clear(); window.location.reload(); } }} className="rounded-xl border border-white/10 px-3 py-1.5 hover:border-white/20">Reset</button>
              <button className="rounded-xl border border-white/10 px-3 py-1.5 hover:border-white/20"><Upload className="mr-1 inline h-4 w-4"/>Sync</button>
              <button className="rounded-xl border border-white/10 px-3 py-1.5 hover:border-white/20"><Download className="mr-1 inline h-4 w-4"/>Export</button>
            </div>
          </Card>
        </aside>

        {/* Content */}
        <section className="space-y-6">
          {/* Heatmap */}
          <Card title="Yearly Heatmap">
            <Heatmap days={getPastDates(364)} counts={activity} />
          </Card>

          {/* Conditional View Rendering */}
          {currentView === 'topics' ? (
            <TopicsView 
              progress={progress} 
              onToggleProblem={handleTopicProblemToggle} 
            />
          ) : (
            /* Sheets View */
            <Card noDivider>
              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-4 pb-3 pt-3">
                {sheets.map((s)=>(
                  <button key={s.id} onClick={()=>dispatch({type:"ui:set", payload:{selectedSheetId:s.id}})} className={classNames("rounded-xl px-3 py-1.5 text-sm", ui.selectedSheetId===s.id?"bg-white/10 text-white":"text-gray-400 hover:text-white hover:bg-white/5")}>
                    {s.name}
                  </button>
                ))}
                {ui.admin && (
                  <button onClick={()=>setModal({type:"sheet", data:{}})} className="ml-auto rounded-xl border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:border-white/20"><FolderPlus className="mr-2 inline h-4 w-4"/>New Sheet</button>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-lg">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                  <input value={localQuery} onChange={e=>setLocalQuery(e.target.value)} placeholder="Search problems..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-white/20"/>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <FilterChip label="Easy" active={ui.filters.diffs?.has("Easy")} onToggle={()=>toggleSet(dispatch, ui, "diffs", "Easy")} />
                  <FilterChip label="Medium" active={ui.filters.diffs?.has("Medium")} onToggle={()=>toggleSet(dispatch, ui, "diffs", "Medium")} />
                  <FilterChip label="Hard" active={ui.filters.diffs?.has("Hard")} onToggle={()=>toggleSet(dispatch, ui, "diffs", "Hard")} />
                  <FilterChip label="Solved" active={ui.filters.status?.has("solved")} onToggle={()=>toggleSet(dispatch, ui, "status", "solved")} />
                  <FilterChip label="Revise" active={ui.filters.status?.has("revise")} onToggle={()=>toggleSet(dispatch, ui, "status", "revise")} />
                </div>
              </div>

              {/* Sections */}
              <div className="divide-y divide-white/5">
                {filteredSections.map((sec)=>(
                  <Accordion key={sec.id} title={sec.title} right={ui.admin && (
                    <button onClick={()=>setModal({type:"problem", data:{ sheetId:activeSheet.id, sectionId:sec.id }})} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:border-white/20"><Plus className="mr-1 inline h-4 w-4"/>Add Problem</button>
                  )}>
                    {sec.items.length===0 ? (
                      <div className="p-4 text-sm text-gray-400">No items match filters.</div>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {sec.items.map((it)=>(
                          <ProblemRow key={it.id} item={it} state={state.progress[it.id]?.status||"todo"} onToggleSolved={()=>markSolved(it.id)} onToggleRevision={()=>toggleRevision(it.id)} />
                        ))}
                      </div>
                    )}
                  </Accordion>
                ))}
              </div>

              {ui.admin && (
                <div className="border-t border-white/5 p-4">
                  <button onClick={()=>setModal({type:"section", data:{ sheetId:activeSheet.id }})} className="rounded-xl border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:border-white/20"><Layers className="mr-2 inline h-4 w-4"/>Add Section</button>
                </div>
              )}
            </Card>
          )}
        </section>
      </main>

      {/* Modals */}
      {modal && (
        <Modal onClose={()=>setModal(null)} title={modal.type === 'problem' ? 'Add Problem' : modal.type === 'section' ? 'Add Section' : 'Add Sheet'}>
          <DynamicForm
            schema={SCHEMA[modal.type]}
            onSubmit={(values)=>{
              if(modal.type==='problem'){
                const id = slug(values.title);
                const problem = { 
                  id, 
                  title:values.title, 
                  difficulty:values.difficulty, 
                  tags:(values.tags||[]), 
                  sourceUrl:values.sourceUrl||"", 
                  youtubeUrl:values.youtubeUrl||"",
                  codeforcesUrl:values.codeforcesUrl||"",
                  articleUrl:values.articleUrl||"",
                  note:values.note||"" 
                };
                dispatch({ type:"problem:add", payload:{ sheetId: modal.data.sheetId, sectionId: modal.data.sectionId, problem } });
              } else if(modal.type==='section'){
                const id = slug(values.title);
                dispatch({ type:"section:add", payload:{ sheetId: modal.data.sheetId, section:{ id, title: values.title, items: [] } } });
              } else if(modal.type==='sheet'){
                const id = slug(values.name);
                dispatch({ type:"sheet:add", payload:{ id, name: values.name, sections: [] } });
              }
              setModal(null);
            }}
          />
        </Modal>
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}
