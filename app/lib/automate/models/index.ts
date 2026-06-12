// ─── Vehicle & Maintenance Models ────────────────────────────────────────────

export type ServiceType =
  | "oilChange"
  | "tyreRotation"
  | "brakeCheck"
  | "battery"
  | "airFilter"
  | "other";

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  oilChange: "Oil Change",
  tyreRotation: "Tyre Rotation",
  brakeCheck: "Brake Check",
  battery: "Battery",
  airFilter: "Air Filter",
  other: "Other",
};

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  serviceType: ServiceType;
  date: string; // ISO date string
  mileage: number;
  notes: string;
  cost: number;
}

// ─── Fuel Models ─────────────────────────────────────────────────────────────

export interface FuelEntry {
  id: string;
  vehicleId: string;
  date: string; // ISO date string
  fuelAmount: number; // litres
  mileage: number; // odometer reading
  costPerUnit: number;
  totalCost: number;
  notes: string;
}

export interface FuelStats {
  avgEfficiency: number; // km/L
  totalSpend: number;
  entryCount: number;
  monthlySpend: Record<string, number>; // "2024-01" -> amount
}

// ─── Shop Models ─────────────────────────────────────────────────────────────

export type ProductCategory =
  | "carCare"
  | "electronics"
  | "interior"
  | "performance"
  | "exterior"
  | "safety";

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  carCare: "Car Care",
  electronics: "Electronics",
  interior: "Interior",
  performance: "Performance",
  exterior: "Exterior",
  safety: "Safety",
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  badge?: "Best Seller" | "New";
}
