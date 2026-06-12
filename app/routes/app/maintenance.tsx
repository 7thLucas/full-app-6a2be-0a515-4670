import { useState } from "react";
import { Link } from "react-router";
import { Plus, Car, ChevronRight, Trash2, Bell, Wrench } from "lucide-react";
import { useMaintenance } from "~/lib/automate/store/maintenance-store";
import { useConfigurables } from "~/modules/configurables";
import type { Vehicle } from "~/lib/automate/models";

function VehicleCard({
  vehicle,
  recordCount,
  onDelete,
}: {
  vehicle: Vehicle;
  recordCount: number;
  onDelete: (id: string) => void;
}) {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Link to={`/app/maintenance/${vehicle.id}`} className="block p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center flex-shrink-0">
            <Car size={22} className="text-[#1E3A5F]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1A1A2E] text-base leading-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-[#6B7280] text-sm mt-0.5">
              {vehicle.licensePlate}
              {vehicle.color ? ` · ${vehicle.color}` : ""}
            </p>
            <p className="text-[#6B7280] text-xs mt-1">
              {recordCount} service record{recordCount !== 1 ? "s" : ""}
            </p>
          </div>
          <ChevronRight size={18} className="text-[#6B7280] flex-shrink-0" />
        </div>
      </Link>
      <div className="border-t border-gray-100 px-4 py-2 flex justify-end gap-2">
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            className="flex items-center gap-1 text-xs text-red-500 font-medium py-1 px-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Are you sure?</span>
            <button
              onClick={() => onDelete(vehicle.id)}
              className="text-xs text-white bg-red-500 font-semibold py-1 px-3 rounded-lg"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="text-xs text-[#6B7280] py-1 px-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReminderBanner({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-2xl p-4 flex items-start gap-3">
      <Bell size={20} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-[#1A1A2E] font-semibold text-sm">
          Maintenance Reminder
        </p>
        <p className="text-[#6B7280] text-xs mt-0.5">
          Add your vehicles to track service history and get reminders.
        </p>
      </div>
    </div>
  );
}

export default function MaintenancePage() {
  const { state, dispatch } = useMaintenance();
  const { config, loading } = useConfigurables();

  const reminderEnabled =
    loading || config?.maintenanceReminderEnabled !== false;

  const getRecordCount = (vehicleId: string) =>
    state.serviceRecords.filter((r) => r.vehicleId === vehicleId).length;

  const handleDelete = (vehicleId: string) => {
    dispatch({ type: "DELETE_VEHICLE", vehicleId });
  };

  return (
    <div className="min-h-full">
      {/* App Bar */}
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-0.5">
              AutoMate
            </p>
            <h1 className="text-white text-2xl font-bold">My Vehicles</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
            <Wrench size={20} className="text-[#F59E0B]" />
          </div>
        </div>
      </header>

      <div className="px-4 py-5 space-y-4">
        {/* Reminder banner for empty state */}
        {state.vehicles.length === 0 && (
          <ReminderBanner enabled={reminderEnabled} />
        )}

        {/* Vehicle list */}
        {state.loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : state.vehicles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center mx-auto mb-4">
              <Car size={36} className="text-[#1E3A5F]/40" />
            </div>
            <h3 className="text-[#1A1A2E] font-semibold text-lg mb-1">
              No vehicles yet
            </h3>
            <p className="text-[#6B7280] text-sm mb-6">
              Add your first vehicle to start tracking maintenance
            </p>
            <Link
              to="/app/maintenance/add"
              className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#1A1A2E] font-bold px-6 py-3 rounded-xl text-sm"
            >
              <Plus size={16} />
              Add Vehicle
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {state.vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                recordCount={getRecordCount(vehicle.id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      {state.vehicles.length > 0 && (
        <Link
          to="/app/maintenance/add"
          className="fixed bottom-[80px] right-4 w-14 h-14 bg-[#F59E0B] rounded-full shadow-lg flex items-center justify-center z-40"
        >
          <Plus size={26} className="text-[#1A1A2E]" strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
