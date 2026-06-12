import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { FuelEntry, FuelStats } from "../models";
import {
  loadFuelEntries,
  saveFuelEntries,
  generateId,
} from "../utils/storage";
import { computeFuelStats } from "../utils/fuel-stats";

// ─── State ────────────────────────────────────────────────────────────────────

interface FuelState {
  entries: FuelEntry[];
  stats: FuelStats;
  loading: boolean;
  error: string | null;
}

// ─── Events ───────────────────────────────────────────────────────────────────

type FuelAction =
  | { type: "LOAD" }
  | { type: "LOADED"; entries: FuelEntry[] }
  | { type: "ADD_ENTRY"; entry: Omit<FuelEntry, "id"> }
  | { type: "DELETE_ENTRY"; entryId: string }
  | { type: "ERROR"; message: string };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: FuelState, action: FuelAction): FuelState {
  switch (action.type) {
    case "LOAD":
      return { ...state, loading: true, error: null };
    case "LOADED": {
      return {
        ...state,
        loading: false,
        entries: action.entries,
        stats: computeFuelStats(action.entries),
      };
    }
    case "ADD_ENTRY": {
      const newEntry: FuelEntry = { ...action.entry, id: generateId() };
      const entries = [...state.entries, newEntry];
      saveFuelEntries(entries);
      return { ...state, entries, stats: computeFuelStats(entries) };
    }
    case "DELETE_ENTRY": {
      const entries = state.entries.filter((e) => e.id !== action.entryId);
      saveFuelEntries(entries);
      return { ...state, entries, stats: computeFuelStats(entries) };
    }
    case "ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface FuelContextValue {
  state: FuelState;
  dispatch: React.Dispatch<FuelAction>;
}

const FuelContext = createContext<FuelContextValue | null>(null);

export function FuelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    entries: [],
    stats: { avgEfficiency: 0, totalSpend: 0, entryCount: 0, monthlySpend: {} },
    loading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOAD" });
    const entries = loadFuelEntries();
    dispatch({ type: "LOADED", entries });
  }, []);

  return (
    <FuelContext.Provider value={{ state, dispatch }}>
      {children}
    </FuelContext.Provider>
  );
}

export function useFuel() {
  const ctx = useContext(FuelContext);
  if (!ctx) throw new Error("useFuel must be inside FuelProvider");
  return ctx;
}
