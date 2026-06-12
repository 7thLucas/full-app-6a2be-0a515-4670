import { useState } from "react";
import { Link } from "react-router";
import {
  Plus,
  Fuel,
  Trash2,
  TrendingUp,
  DollarSign,
  DropletIcon,
  BarChart3,
} from "lucide-react";
import { useFuel } from "~/lib/automate/store/fuel-store";
import { useConfigurables } from "~/modules/configurables";
import type { FuelEntry } from "~/lib/automate/models";

// Simple bar chart using CSS
function MonthlyChart({
  monthlySpend,
  currency,
}: {
  monthlySpend: Record<string, number>;
  currency: string;
}) {
  const entries = Object.entries(monthlySpend)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6); // last 6 months

  if (entries.length === 0) return null;

  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-[#1E3A5F]" />
        <p className="font-semibold text-[#1A1A2E] text-sm">Monthly Spend</p>
      </div>
      <div className="flex items-end gap-2 h-24">
        {entries.map(([month, amount]) => {
          const heightPct = max > 0 ? (amount / max) * 100 : 0;
          const [year, mon] = month.split("-");
          const label = new Date(parseInt(year), parseInt(mon) - 1).toLocaleDateString(
            "en-US",
            { month: "short" }
          );
          return (
            <div
              key={month}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <p className="text-[#1E3A5F] text-[9px] font-bold">
                {currency}{amount.toFixed(0)}
              </p>
              <div className="w-full flex items-end justify-center" style={{ height: "60px" }}>
                <div
                  className="w-full rounded-t-lg bg-[#1E3A5F] transition-all"
                  style={{ height: `${heightPct}%`, minHeight: "4px" }}
                />
              </div>
              <p className="text-[#6B7280] text-[9px]">{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FuelEntryCard({
  entry,
  onDelete,
  currency,
  volumeUnit,
  distanceUnit,
}: {
  entry: FuelEntry;
  onDelete: (id: string) => void;
  currency: string;
  volumeUnit: string;
  distanceUnit: string;
}) {
  const [confirm, setConfirm] = useState(false);
  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 flex items-center justify-center flex-shrink-0">
          <Fuel size={18} className="text-[#F59E0B]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold text-[#1A1A2E] text-sm">{formattedDate}</p>
            <p className="font-bold text-[#F59E0B] text-sm">
              {currency}{entry.totalCost.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-[#6B7280]">
            <span>{entry.fuelAmount.toFixed(1)} {volumeUnit}</span>
            <span>{entry.mileage.toLocaleString()} {distanceUnit}</span>
            <span>{currency}{entry.costPerUnit.toFixed(3)}/{volumeUnit[0]}L</span>
          </div>
          {entry.notes && (
            <p className="text-xs text-[#6B7280] mt-1.5 bg-gray-50 rounded-lg px-2 py-1">
              {entry.notes}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            className="flex items-center gap-1 text-xs text-red-500 font-medium py-1 px-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={12} />
            Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Sure?</span>
            <button
              onClick={() => onDelete(entry.id)}
              className="text-xs text-white bg-red-500 font-semibold py-1 px-3 rounded-lg"
            >
              Delete
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FuelLogPage() {
  const { state, dispatch } = useFuel();
  const { config, loading: cfgLoading } = useConfigurables();

  const currency = (!cfgLoading && config?.currency) || "$";
  const distanceUnit = (!cfgLoading && config?.distanceUnit) || "km";
  const volumeUnit = (!cfgLoading && config?.volumeUnit) || "litres";

  const sortedEntries = [...state.entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (entryId: string) => {
    dispatch({ type: "DELETE_ENTRY", entryId });
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-0.5">
              AutoMate
            </p>
            <h1 className="text-white text-2xl font-bold">Fuel Log</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
            <Fuel size={20} className="text-[#F59E0B]" />
          </div>
        </div>

        {/* Stats strip */}
        {state.entries.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 rounded-xl p-2.5 text-center">
              <p className="text-white font-bold text-base">
                {state.stats.avgEfficiency > 0
                  ? `${state.stats.avgEfficiency}`
                  : "—"}
              </p>
              <p className="text-white/60 text-[10px] mt-0.5">
                km/{volumeUnit === "litres" ? "L" : "gal"}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 text-center">
              <p className="text-white font-bold text-base">
                {currency}{state.stats.totalSpend.toFixed(0)}
              </p>
              <p className="text-white/60 text-[10px] mt-0.5">Total Spend</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 text-center">
              <p className="text-white font-bold text-base">
                {state.stats.entryCount}
              </p>
              <p className="text-white/60 text-[10px] mt-0.5">Fill-ups</p>
            </div>
          </div>
        )}
      </header>

      <div className="px-4 py-4 space-y-3">
        {/* Chart */}
        {Object.keys(state.stats.monthlySpend).length > 0 && (
          <MonthlyChart
            monthlySpend={state.stats.monthlySpend}
            currency={currency}
          />
        )}

        {/* Empty state */}
        {state.loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : sortedEntries.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-4">
              <Fuel size={36} className="text-[#F59E0B]/40" />
            </div>
            <h3 className="text-[#1A1A2E] font-semibold text-lg mb-1">
              No fuel entries yet
            </h3>
            <p className="text-[#6B7280] text-sm mb-6">
              Log your first fill-up to track efficiency
            </p>
            <Link
              to="/app/fuel/add"
              className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#1A1A2E] font-bold px-6 py-3 rounded-xl text-sm"
            >
              <Plus size={16} />
              Add Fill-up
            </Link>
          </div>
        ) : (
          sortedEntries.map((entry) => (
            <FuelEntryCard
              key={entry.id}
              entry={entry}
              onDelete={handleDelete}
              currency={currency}
              volumeUnit={volumeUnit}
              distanceUnit={distanceUnit}
            />
          ))
        )}
      </div>

      {/* FAB */}
      {sortedEntries.length > 0 && (
        <Link
          to="/app/fuel/add"
          className="fixed bottom-[80px] right-4 w-14 h-14 bg-[#F59E0B] rounded-full shadow-lg flex items-center justify-center z-40"
        >
          <Plus size={26} className="text-[#1A1A2E]" strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
