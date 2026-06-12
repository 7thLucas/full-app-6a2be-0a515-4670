import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ArrowLeft, Car } from "lucide-react";
import { useMaintenance } from "~/lib/automate/store/maintenance-store";

const COLORS = [
  "White",
  "Black",
  "Silver",
  "Grey",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Other",
];

export default function AddVehiclePage() {
  const navigate = useNavigate();
  const { dispatch } = useMaintenance();

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    licensePlate: "",
    color: "White",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.make.trim()) e.make = "Make is required";
    if (!form.model.trim()) e.model = "Model is required";
    const y = parseInt(form.year);
    if (!form.year || isNaN(y) || y < 1900 || y > new Date().getFullYear() + 1)
      e.year = "Enter a valid year";
    if (!form.licensePlate.trim()) e.licensePlate = "License plate is required";
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
      type: "ADD_VEHICLE",
      vehicle: {
        make: form.make.trim(),
        model: form.model.trim(),
        year: parseInt(form.year),
        licensePlate: form.licensePlate.trim().toUpperCase(),
        color: form.color,
      },
    });
    navigate("/app/maintenance");
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, type = "text") => (
    <div>
      <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => {
          setForm((f) => ({ ...f, [key]: e.target.value }));
          setErrors((err) => ({ ...err, [key]: "" }));
        }}
        className={`w-full px-4 py-3 rounded-xl border text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition ${
          errors[key] ? "border-red-400" : "border-gray-200"
        }`}
      />
      {errors[key] && (
        <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-full">
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <Link
            to="/app/maintenance"
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase">
              New Vehicle
            </p>
            <h1 className="text-white text-xl font-bold leading-tight">Add Vehicle</h1>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center">
              <Car size={20} className="text-[#1E3A5F]" />
            </div>
            <p className="font-semibold text-[#1A1A2E]">Vehicle Details</p>
          </div>

          {field("make", "Make", "e.g. Toyota, Honda, BMW")}
          {field("model", "Model", "e.g. Camry, Civic, 3 Series")}
          {field("year", "Year", "e.g. 2022", "number")}
          {field("licensePlate", "License Plate", "e.g. ABC 123")}

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">
              Color
            </label>
            <select
              value={form.color}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            >
              {COLORS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#F59E0B] text-[#1A1A2E] font-bold py-4 rounded-2xl text-base active:scale-95 transition-transform"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
}
