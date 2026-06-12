// LocalStorage utility for AutoMate data persistence

const KEYS = {
  VEHICLES: "automate:vehicles",
  SERVICE_RECORDS: "automate:service_records",
  FUEL_ENTRIES: "automate:fuel_entries",
} as const;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded — silent fail
  }
}

import type { Vehicle, ServiceRecord, FuelEntry } from "../models";

// Vehicles
export function loadVehicles(): Vehicle[] {
  return safeGet<Vehicle[]>(KEYS.VEHICLES, []);
}

export function saveVehicles(vehicles: Vehicle[]): void {
  safeSet(KEYS.VEHICLES, vehicles);
}

// Service Records
export function loadServiceRecords(): ServiceRecord[] {
  return safeGet<ServiceRecord[]>(KEYS.SERVICE_RECORDS, []);
}

export function saveServiceRecords(records: ServiceRecord[]): void {
  safeSet(KEYS.SERVICE_RECORDS, records);
}

// Fuel Entries
export function loadFuelEntries(): FuelEntry[] {
  return safeGet<FuelEntry[]>(KEYS.FUEL_ENTRIES, []);
}

export function saveFuelEntries(entries: FuelEntry[]): void {
  safeSet(KEYS.FUEL_ENTRIES, entries);
}

// UUID-like id generator (no external dep)
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
