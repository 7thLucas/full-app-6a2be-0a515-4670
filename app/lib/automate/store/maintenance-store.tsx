import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Vehicle, ServiceRecord } from "../models";
import {
  loadVehicles,
  saveVehicles,
  loadServiceRecords,
  saveServiceRecords,
  generateId,
} from "../utils/storage";

// ─── State ────────────────────────────────────────────────────────────────────

interface MaintenanceState {
  vehicles: Vehicle[];
  serviceRecords: ServiceRecord[];
  loading: boolean;
  error: string | null;
}

// ─── Events ───────────────────────────────────────────────────────────────────

type MaintenanceAction =
  | { type: "LOAD" }
  | { type: "LOADED"; vehicles: Vehicle[]; serviceRecords: ServiceRecord[] }
  | { type: "ADD_VEHICLE"; vehicle: Omit<Vehicle, "id"> }
  | { type: "UPDATE_VEHICLE"; vehicle: Vehicle }
  | { type: "DELETE_VEHICLE"; vehicleId: string }
  | { type: "ADD_SERVICE_RECORD"; record: Omit<ServiceRecord, "id"> }
  | { type: "DELETE_SERVICE_RECORD"; recordId: string }
  | { type: "ERROR"; message: string };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(
  state: MaintenanceState,
  action: MaintenanceAction
): MaintenanceState {
  switch (action.type) {
    case "LOAD":
      return { ...state, loading: true, error: null };
    case "LOADED":
      return {
        ...state,
        loading: false,
        vehicles: action.vehicles,
        serviceRecords: action.serviceRecords,
      };
    case "ADD_VEHICLE": {
      const newVehicle: Vehicle = { ...action.vehicle, id: generateId() };
      const vehicles = [...state.vehicles, newVehicle];
      saveVehicles(vehicles);
      return { ...state, vehicles };
    }
    case "UPDATE_VEHICLE": {
      const vehicles = state.vehicles.map((v) =>
        v.id === action.vehicle.id ? action.vehicle : v
      );
      saveVehicles(vehicles);
      return { ...state, vehicles };
    }
    case "DELETE_VEHICLE": {
      const vehicles = state.vehicles.filter((v) => v.id !== action.vehicleId);
      const serviceRecords = state.serviceRecords.filter(
        (r) => r.vehicleId !== action.vehicleId
      );
      saveVehicles(vehicles);
      saveServiceRecords(serviceRecords);
      return { ...state, vehicles, serviceRecords };
    }
    case "ADD_SERVICE_RECORD": {
      const newRecord: ServiceRecord = {
        ...action.record,
        id: generateId(),
      };
      const serviceRecords = [...state.serviceRecords, newRecord];
      saveServiceRecords(serviceRecords);
      return { ...state, serviceRecords };
    }
    case "DELETE_SERVICE_RECORD": {
      const serviceRecords = state.serviceRecords.filter(
        (r) => r.id !== action.recordId
      );
      saveServiceRecords(serviceRecords);
      return { ...state, serviceRecords };
    }
    case "ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface MaintenanceContextValue {
  state: MaintenanceState;
  dispatch: React.Dispatch<MaintenanceAction>;
}

const MaintenanceContext = createContext<MaintenanceContextValue | null>(null);

export function MaintenanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    vehicles: [],
    serviceRecords: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOAD" });
    const vehicles = loadVehicles();
    const serviceRecords = loadServiceRecords();
    dispatch({ type: "LOADED", vehicles, serviceRecords });
  }, []);

  return (
    <MaintenanceContext.Provider value={{ state, dispatch }}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const ctx = useContext(MaintenanceContext);
  if (!ctx) throw new Error("useMaintenance must be inside MaintenanceProvider");
  return ctx;
}
