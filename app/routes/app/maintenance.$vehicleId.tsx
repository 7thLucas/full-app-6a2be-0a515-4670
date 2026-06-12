import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Car,
  Calendar,
  Gauge,
  DollarSign,
  FileText,
  Wrench,
  AlertCircle,
} from "lucide-react";
import { useMaintenance } from "~/lib/automate/store/maintenance-store";
import { useConfigurables } from "~/modules/configurables";
import type { ServiceRecord } from "~/lib/automate/models";
import { SERVICE_TYPE_LABELS } from "~/lib/automate/models";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  oilChange: <span className="text-amber-500">🛢️</span>,
  tyreRotation: <span>🔄</span>,
  brakeCheck: <span>🛑</span>,
  battery: <span>🔋</span>,
  airFilter: <span>💨</span>,
  other: <Wrench size={16} className="text-gray-400" />,
};

function ServiceRecordCard({
  record,
  onDelete,
  currency,
  distanceUnit,
}: {
  record: ServiceRecord;
  onDelete: (id: string) => void;
  currency: string;
  distanceUnit: string;
}) {
  const [confirm, setConfirm] = useState(false);
  const date = new Date(record.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center text-lg flex-shrink-0">
          {SERVICE_ICONS[record.serviceType] ?? SERVICE_ICONS.other}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-bold text-[#1A1A2E] text-sm leading-tight">
              {SERVICE_TYPE_LABELS[record.serviceType]}
            </h4>
            <span className="font-bold text-[#F59E0B] text-sm flex-shrink-0">
              {currency}{record.cost.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Gauge size={11} />
              {record.mileage.toLocaleString()} {distanceUnit}
            </span>
          </div>
          {record.notes && (
            <p className="text-xs text-[#6B7280] mt-2 bg-gray-50 rounded-lg px-2 py-1.5">
              {record.notes}
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
              onClick={() => onDelete(record.id)}
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

export default function VehicleServiceHistoryPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useMaintenance();
  const { config, loading: cfgLoading } = useConfigurables();

  const currency = (!cfgLoading && config?.currency) || "$";
  const distanceUnit = (!cfgLoading && config?.distanceUnit) || "km";

  const vehicle = state.vehicles.find((v) => v.id === vehicleId);
  const records = state.serviceRecords
    .filter((r) => r.vehicleId === vehicleId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!vehicle) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6">
        <AlertCircle size={48} className="text-[#6B7280] mb-3" />
        <h2 className="text-[#1A1A2E] font-bold text-lg">Vehicle not found</h2>
        <Link to="/app/maintenance" className="mt-4 text-[#F59E0B] font-semibold text-sm">
          Back to Vehicles
        </Link>
      </div>
    );
  }

  const handleDeleteRecord = (recordId: string) => {
    dispatch({ type: "DELETE_SERVICE_RECORD", recordId });
  };

  // Last oil change for reminder
  const lastOilChange = records.find((r) => r.serviceType === "oilChange");
  const oilInterval = (!cfgLoading && config?.oilChangeIntervalKm) || 5000;
  const reminderEnabled = !cfgLoading && config?.maintenanceReminderEnabled !== false;

  const showOilReminder =
    reminderEnabled &&
    lastOilChange &&
    lastOilChange.mileage + oilInterval > lastOilChange.mileage;

  const nextOilKm = lastOilChange
    ? lastOilChange.mileage + oilInterval
    : null;

  return (
    <div className="min-h-full">
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center gap-3 mb-4">
          <Link
            to="/app/maintenance"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase">
              Service History
            </p>
            <h1 className="text-white text-xl font-bold leading-tight">
              {vehicle.make} {vehicle.model}
            </h1>
          </div>
        </div>

        {/* Vehicle summary pill */}
        <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5">
          <Car size={16} className="text-white/70" />
          <span className="text-white text-sm font-medium">
            {vehicle.year} · {vehicle.licensePlate} · {vehicle.color}
          </span>
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        {/* Oil change reminder */}
        {showOilReminder && nextOilKm && (
          <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-2xl">🛢️</span>
            <div>
              <p className="text-[#1A1A2E] font-semibold text-sm">
                Oil Change Due
              </p>
              <p className="text-[#6B7280] text-xs mt-0.5">
                Next oil change recommended at{" "}
                <strong>{nextOilKm.toLocaleString()} {distanceUnit}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Stats strip */}
        {records.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-[#1E3A5F]">{records.length}</p>
              <p className="text-[#6B7280] text-xs">Total Services</p>
            </div>
            <div className="bg-white rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-[#F59E0B]">
                {currency}{records.reduce((s, r) => s + r.cost, 0).toFixed(0)}
              </p>
              <p className="text-[#6B7280] text-xs">Total Spent</p>
            </div>
          </div>
        )}

        {/* Records */}
        {records.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center mx-auto mb-3">
              <FileText size={28} className="text-[#1E3A5F]/40" />
            </div>
            <p className="text-[#1A1A2E] font-semibold">No service records</p>
            <p className="text-[#6B7280] text-sm mt-1">
              Log your first service to get started
            </p>
          </div>
        ) : (
          records.map((record) => (
            <ServiceRecordCard
              key={record.id}
              record={record}
              onDelete={handleDeleteRecord}
              currency={currency}
              distanceUnit={distanceUnit}
            />
          ))
        )}
      </div>

      {/* FAB */}
      <Link
        to={`/app/maintenance/${vehicleId}/add-service`}
        className="fixed bottom-[80px] right-4 w-14 h-14 bg-[#F59E0B] rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <Plus size={26} className="text-[#1A1A2E]" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
