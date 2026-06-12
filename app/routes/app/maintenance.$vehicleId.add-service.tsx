import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Wrench, AlertCircle } from "lucide-react";
import { useMaintenance } from "~/lib/automate/store/maintenance-store";
import { useConfigurables } from "~/modules/configurables";
import { SERVICE_TYPE_LABELS } from "~/lib/automate/models";
import type { ServiceType } from "~/lib/automate/models";

const SERVICE_TYPES: ServiceType[] = [
  "oilChange",
  "tyreRotation",
  "brakeCheck",
  "battery",
  "airFilter",
  "other",
];

export default function AddServicePage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useMaintenance();
  const { config, loading: cfgLoading } = useConfigurables();

  const currency = (!cfgLoading && config?.currency) || "$";
  const distanceUnit = (!cfgLoading && config?.distanceUnit) || "km";

  const vehicle = state.vehicles.find((v) => v.id === vehicleId);

  const [form, setForm] = useState({
    serviceType: "oilChange" as ServiceType,
    date: new Date().toISOString().slice(0, 10),
    mileage: "",
    cost: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = "Date is required";
    const m = parseFloat(form.mileage);
    if (!form.mileage || isNaN(m) || m < 0)
      e.mileage = "Enter a valid mileage";
    const c = parseFloat(form.cost);
    if (!form.cost || isNaN(c) || c < 0) e.cost = "Enter a valid cost";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    dispatch({
      type: "ADD_SERVICE_RECORD",
      record: {
        vehicleId: vehicleId!,
        serviceType: form.serviceType,
        date: form.date,
        mileage: parseFloat(form.mileage),
        cost: parseFloat(form.cost),
        notes: form.notes.trim(),
      },
    });
    navigate(`/app/maintenance/${vehicleId}`);
  };

  return (
    <div className="min-h-full">
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <Link
            to={`/app/maintenance/${vehicleId}`}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase">
              {vehicle.make} {vehicle.model}
            </p>
            <h1 className="text-white text-xl font-bold leading-tight">Add Service</h1>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center">
              <Wrench size={18} className="text-[#1E3A5F]" />
            </div>
            <p className="font-semibold text-[#1A1A2E]">Service Details</p>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Service Type
            </label>
            <select
              value={form.serviceType}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  serviceType: e.target.value as ServiceType,
                }))
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            >
              {SERVICE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {SERVICE_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => {
                setForm((f) => ({ ...f, date: e.target.value }));
                setErrors((err) => ({ ...err, date: "" }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] ${
                errors.date ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Mileage */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Odometer Reading ({distanceUnit})
            </label>
            <input
              type="number"
              placeholder={`e.g. 45000 ${distanceUnit}`}
              value={form.mileage}
              onChange={(e) => {
                setForm((f) => ({ ...f, mileage: e.target.value }));
                setErrors((err) => ({ ...err, mileage: "" }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] ${
                errors.mileage ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.mileage && (
              <p className="text-red-500 text-xs mt-1">{errors.mileage}</p>
            )}
          </div>

          {/* Cost */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Cost ({currency})
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 49.99"
              value={form.cost}
              onChange={(e) => {
                setForm((f) => ({ ...f, cost: e.target.value }));
                setErrors((err) => ({ ...err, cost: "" }));
              }}
              className={`w-full px-4 py-3 rounded-xl border text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] ${
                errors.cost ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.cost && (
              <p className="text-red-500 text-xs mt-1">{errors.cost}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#F59E0B] text-[#1A1A2E] font-bold py-4 rounded-2xl text-base active:scale-95 transition-transform"
        >
          Save Service Record
        </button>
      </form>
    </div>
  );
}
