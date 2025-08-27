// ------------------------------ Persistence API -----------------------------
export const LS = {
  DATA: "algoforge_data_v1", // sheets
  PROG: "algoforge_progress_v1", // { [id]: { status, lastSolvedAt } }
  ACT:  "algoforge_activity_v1", // { yyyy-mm-dd: count }
  UI:   "algoforge_ui_v1", // local UI prefs
};
