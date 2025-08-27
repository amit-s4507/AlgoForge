import { useReducer } from "react";
import { persistence } from "../utils/persistence";
import { LS } from "../utils/constants";
import { SEED_SHEETS } from "../data/seedData";

// ------------------------------- App State ----------------------------------
export const initialState = () => {
  const loadedUI = persistence.load(LS.UI, { 
    admin: false, 
    selectedSheetId: SEED_SHEETS[0].id, 
    filters: { q: "", diffs: [], tags: [], status: [] } 
  });
  
  return {
    sheets: persistence.load(LS.DATA, SEED_SHEETS),
    progress: persistence.load(LS.PROG, {}),
    activity: persistence.load(LS.ACT, {}),
    ui: {
      ...loadedUI,
      filters: {
        q: loadedUI.filters?.q || "",
        diffs: new Set(loadedUI.filters?.diffs || []),
        tags: new Set(loadedUI.filters?.tags || []),
        status: new Set(loadedUI.filters?.status || [])
      }
    }
  };
};

export function reducer(state, action){
  switch(action.type){
    case "ui:set": return { ...state, ui: { ...state.ui, ...action.payload } };
    case "ui:filters": return { ...state, ui: { ...state.ui, filters: { ...state.ui.filters, ...action.payload } } };
    case "sheet:add": return { ...state, sheets: [...state.sheets, action.payload] };
    case "section:add":{
      const { sheetId, section } = action.payload;
      return { ...state, sheets: state.sheets.map(s => s.id===sheetId ? { ...s, sections:[...s.sections, section] } : s) };
    }
    case "problem:add":{
      const { sheetId, sectionId, problem } = action.payload;
      return { ...state, sheets: state.sheets.map(s => s.id===sheetId ? { ...s, sections: s.sections.map(sec => sec.id===sectionId ? { ...sec, items:[problem, ...sec.items] } : sec) } : s) };
    }
    case "progress:set": return { ...state, progress: { ...state.progress, ...action.payload } };
    case "activity:set": return { ...state, activity: { ...state.activity, ...action.payload } };
    case "persist":{
      persistence.save(LS.DATA, state.sheets);
      persistence.save(LS.PROG, state.progress);
      persistence.save(LS.ACT, state.activity);
      // Convert Sets to Arrays for serialization
      const uiToSave = {
        ...state.ui,
        filters: {
          ...state.ui.filters,
          diffs: Array.from(state.ui.filters.diffs || []),
          tags: Array.from(state.ui.filters.tags || []),
          status: Array.from(state.ui.filters.status || [])
        }
      };
      persistence.save(LS.UI, uiToSave);
      return state;
    }
    default: return state;
  }
}

export function useAppReducer() {
  return useReducer(reducer, undefined, initialState);
}
