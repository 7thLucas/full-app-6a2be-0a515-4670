/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  tagline?: string;
  currency?: string;
  distanceUnit?: "km" | "miles";
  volumeUnit?: "litres" | "gallons";
  maintenanceTabLabel?: string;
  fuelTabLabel?: string;
  shopTabLabel?: string;
  shopSectionTitle?: string;
  shopSectionSubtitle?: string;
  showRatings?: boolean;
  showBadges?: boolean;
  affiliateRefTag?: string;
  maintenanceReminderEnabled?: boolean;
  oilChangeIntervalKm?: number;
  welcomeMessage?: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "AutoMate",
  logoUrl: "FILL_LOGO_URL_HERE",
  brandColor: {
    primary: "#1E3A5F",
    secondary: "#F8F9FA",
    accent: "#F59E0B",
  },
  tagline: "Your Complete Car Companion",
  currency: "$",
  distanceUnit: "km",
  volumeUnit: "litres",
  maintenanceTabLabel: "Maintenance",
  fuelTabLabel: "Fuel",
  shopTabLabel: "Shop",
  shopSectionTitle: "Car Accessories Shop",
  shopSectionSubtitle: "Top picks for every driver — tap to buy",
  showRatings: true,
  showBadges: true,
  affiliateRefTag: "automate",
  maintenanceReminderEnabled: true,
  oilChangeIntervalKm: 5000,
  welcomeMessage: "Welcome to AutoMate",
};
