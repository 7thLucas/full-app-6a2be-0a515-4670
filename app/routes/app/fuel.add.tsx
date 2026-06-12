import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Fuel } from "lucide-react";
import { useFuel } from "~/lib/automate/store/fuel-store";
import { useConfigurables } from "~/modules/configurables";

export default function AddFuelEntryPage() {
  const navigate = useNavigate();
  const { dispatch } = useFuel();
  const { config, loading: cfgLoading } = useConfigurables();

  const currency = (!cfgLoading && config?.currency) || "$";
  const distanceUnit = (!cfgLoading && config?.distanceUnit) || "km";
  const volumeUnit = (!cfgLoading && config?.volumeUnit) || "litres";
  const volLabel = volumeUnit === "litres" ? "L" : "gal";

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    fuelAmount: "",
    mileage: "",
    costPerUnit: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalCost =
    parseFloat(form.fuelAmount) * parseFloat(form.costPerUnit) || 0;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = "Date is required";
    const fa = parseFloat(form.fuelAmount);
    if (!form.fuelAmount || isNaN(fa) || fa <= 0)
      e.fuelAmount = `Enter a valid amount`;
    const m = parseFloat(form.mileage);
    if (!form.mileage || isNaN(m) || m < 0)
      e.mileage = "Enter a valid mileage";
    const cpu = parseFloat(form.costPerUnit);
    if (!form.costPerUnit || isNaN(cpu) || cpu <= 0)
      e.costPerUnit = "Enter a valid price";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const fuelAmount = parseFloat(form.fuelAmount);
    const costPerUnit = parseFloat(form.costPerUnit);
    dispatch({
      type: "ADD_ENTRY",
      entry: {
        vehicleId: "default",
        date: form.date,
        fuelAmount,
        mileage: parseFloat(form.mileage),
        costPerUnit,
        totalCost: fuelAmount * costPerUnit,
        notes: form.notes.trim(),
      },
    });
    navigate("/app/fuel");
  };

  const inputClass = (key: string) =>
    `w-full px-4 py-3 rounded-xl border text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition ${
      errors[key] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <div className="min-h-full">
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <Link
            to="/app/fuel"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase">
              New Entry
            </p>
            <h1 className="text-white text-xl font-bold leading-tight">Log Fill-up</h1>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
              <Fuel size={18} className="text-[#F59E0B]" />
            </div>
            <p className="font-semibold text-[#1A1A2E]">Fill-up Details</p>
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
              className={inputClass("date")}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Fuel Amount */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Fuel Amount ({volumeUnit})
            </label>
            <input
              type="number"
              step="0.01"
              placeholder={`e.g. 45.5 ${volLabel}`}
              value={form.fuelAmount}
              onChange={(e) => {
                setForm((f) => ({ ...f, fuelAmount: e.target.value }));
                setErrors((err) => ({ ...err, fuelAmount: "" }));
              }}
              className={inputClass("fuelAmount")}
            />
            {errors.fuelAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.fuelAmount}</p>
            )}
          </div>

          {/* Odometer */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Odometer ({distanceUnit})
            </label>
            <input
              type="number"
              placeholder={`e.g. 52000 ${distanceUnit}`}
              value={form.mileage}
              onChange={(e) => {
                setForm((f) => ({ ...f, mileage: e.target.value }));
                setErrors((err) => ({ ...err, mileage: "" }));
              }}
              className={inputClass("mileage")}
            />
            {errors.mileage && (
              <p className="text-red-500 text-xs mt-1">{errors.mileage}</p>
            )}
          </div>

          {/* Price per unit */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Price per {volLabel} ({currency})
            </label>
            <input
              type="number"
              step="0.001"
              placeholder={`e.g. 1.899`}
              value={form.costPerUnit}
              onChange={(e) => {
                setForm((f) => ({ ...f, costPerUnit: e.target.value }));
                setErrors((err) => ({ ...err, costPerUnit: "" }));
              }}
              className={inputClass("costPerUnit")}
            />
            {errors.costPerUnit && (
              <p className="text-red-500 text-xs mt-1">{errors.costPerUnit}</p>
            )}
          </div>

          {/* Total cost preview */}
          {totalCost > 0 && (
            <div className="bg-[#F59E0B]/10 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-[#6B7280] text-sm font-medium">
                Total Cost
              </span>
              <span className="text-[#F59E0B] font-bold text-lg">
                {currency}{totalCost.toFixed(2)}
              </span>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Notes (optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Premium fuel, Shell station"
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
          Save Fill-up
        </button>
      </form>
    </div>
  );
}
