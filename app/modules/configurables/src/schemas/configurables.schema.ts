/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
      minLength: 1,
      maxLength: 100,
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary (Navy)",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent (Amber Gold)",
        },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "App Tagline",
      maxLength: 120,
    },
    {
      fieldName: "currency",
      type: "string",
      required: false,
      label: "Currency Symbol",
      maxLength: 5,
    },
    {
      fieldName: "distanceUnit",
      type: "enum",
      required: false,
      label: "Distance Unit",
      options: ["km", "miles"],
    },
    {
      fieldName: "volumeUnit",
      type: "enum",
      required: false,
      label: "Volume Unit",
      options: ["litres", "gallons"],
    },
    {
      fieldName: "maintenanceTabLabel",
      type: "string",
      required: false,
      label: "Maintenance Tab Label",
      maxLength: 30,
    },
    {
      fieldName: "fuelTabLabel",
      type: "string",
      required: false,
      label: "Fuel Tab Label",
      maxLength: 30,
    },
    {
      fieldName: "shopTabLabel",
      type: "string",
      required: false,
      label: "Shop Tab Label",
      maxLength: 30,
    },
    {
      fieldName: "shopSectionTitle",
      type: "string",
      required: false,
      label: "Shop Section Title",
      maxLength: 60,
    },
    {
      fieldName: "shopSectionSubtitle",
      type: "string",
      required: false,
      label: "Shop Section Subtitle",
      maxLength: 120,
    },
    {
      fieldName: "showRatings",
      type: "boolean",
      required: false,
      label: "Show Product Ratings",
    },
    {
      fieldName: "showBadges",
      type: "boolean",
      required: false,
      label: "Show Product Badges (Best Seller / New)",
    },
    {
      fieldName: "affiliateRefTag",
      type: "string",
      required: false,
      label: "Affiliate Ref Tag",
      maxLength: 50,
    },
    {
      fieldName: "maintenanceReminderEnabled",
      type: "boolean",
      required: false,
      label: "Show Maintenance Reminders",
    },
    {
      fieldName: "oilChangeIntervalKm",
      type: "number",
      required: false,
      label: "Oil Change Interval (km)",
      min: 1000,
      max: 20000,
    },
    {
      fieldName: "welcomeMessage",
      type: "string",
      required: false,
      label: "Welcome Message",
      maxLength: 100,
    },
  ],
};