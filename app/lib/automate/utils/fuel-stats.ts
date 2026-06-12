import type { FuelEntry, FuelStats } from "../models";

export function computeFuelStats(entries: FuelEntry[]): FuelStats {
  if (entries.length === 0) {
    return { avgEfficiency: 0, totalSpend: 0, entryCount: 0, monthlySpend: {} };
  }

  const totalSpend = entries.reduce((sum, e) => sum + e.totalCost, 0);

  // Compute efficiency: km driven / litres used between consecutive entries
  // Sorted ascending by mileage
  const sorted = [...entries].sort((a, b) => a.mileage - b.mileage);
  const efficiencies: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const kmDriven = sorted[i].mileage - sorted[i - 1].mileage;
    const litresUsed = sorted[i - 1].fuelAmount;
    if (kmDriven > 0 && litresUsed > 0) {
      efficiencies.push(kmDriven / litresUsed);
    }
  }
  const avgEfficiency =
    efficiencies.length > 0
      ? efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length
      : 0;

  // Monthly spend
  const monthlySpend: Record<string, number> = {};
  for (const entry of entries) {
    const month = entry.date.slice(0, 7); // "2024-01"
    monthlySpend[month] = (monthlySpend[month] ?? 0) + entry.totalCost;
  }

  return {
    avgEfficiency: Math.round(avgEfficiency * 10) / 10,
    totalSpend: Math.round(totalSpend * 100) / 100,
    entryCount: entries.length,
    monthlySpend,
  };
}
