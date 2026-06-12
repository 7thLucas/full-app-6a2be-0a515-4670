import type { Product } from "./index";

export const MOCK_PRODUCTS: Product[] = [
  // Car Care
  {
    id: "prod-001",
    name: "Premium Microfibre Wash Kit",
    description:
      "Complete car wash kit with ultra-soft microfibre cloths, wash mitt, and detailing towels. Leaves a streak-free, showroom finish on all paint types.",
    price: 24.99,
    category: "carCare",
    imageUrl: "https://picsum.photos/seed/carcare1/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-001?ref=automate&source=app",
    rating: 4.7,
    reviewCount: 1243,
    badge: "Best Seller",
  },
  {
    id: "prod-002",
    name: "Ceramic Coating Spray",
    description:
      "Professional-grade ceramic spray coating that provides long-lasting hydrophobic protection. Easy to apply and provides up to 12 months of shine and protection.",
    price: 39.99,
    category: "carCare",
    imageUrl: "https://picsum.photos/seed/carcare2/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-002?ref=automate&source=app",
    rating: 4.5,
    reviewCount: 876,
  },
  // Electronics
  {
    id: "prod-003",
    name: "Dash Cam 4K Ultra HD",
    description:
      "Crystal-clear 4K resolution dash camera with night vision, GPS logging, and a 170-degree wide-angle lens. Includes 64GB storage card and parking mode.",
    price: 79.99,
    category: "electronics",
    imageUrl: "https://picsum.photos/seed/elec1/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-003?ref=automate&source=app",
    rating: 4.6,
    reviewCount: 2104,
    badge: "Best Seller",
  },
  {
    id: "prod-004",
    name: "Bluetooth FM Transmitter",
    description:
      "Universal car Bluetooth FM transmitter with USB-C charging, hands-free calling, and crystal-clear audio streaming. Compatible with all vehicles.",
    price: 19.99,
    category: "electronics",
    imageUrl: "https://picsum.photos/seed/elec2/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-004?ref=automate&source=app",
    rating: 4.3,
    reviewCount: 3456,
  },
  // Interior
  {
    id: "prod-005",
    name: "Universal Seat Covers Set",
    description:
      "Premium leatherette seat covers with memory foam padding. Universal fit for most car models. Easy installation, waterproof, and machine washable.",
    price: 45.99,
    category: "interior",
    imageUrl: "https://picsum.photos/seed/interior1/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-005?ref=automate&source=app",
    rating: 4.4,
    reviewCount: 987,
  },
  {
    id: "prod-006",
    name: "Car Phone Mount Magnetic",
    description:
      "Strong magnetic phone mount with a 360-degree rotation ball joint. Dashboard or windshield mount included. Compatible with all smartphone sizes.",
    price: 14.99,
    category: "interior",
    imageUrl: "https://picsum.photos/seed/interior2/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-006?ref=automate&source=app",
    rating: 4.8,
    reviewCount: 5621,
    badge: "Best Seller",
  },
  // Performance
  {
    id: "prod-007",
    name: "Cold Air Intake Filter",
    description:
      "High-flow cold air intake filter that increases horsepower and torque. Reusable, washable design with a heat shield. Fits most 4-cylinder engines.",
    price: 59.99,
    category: "performance",
    imageUrl: "https://picsum.photos/seed/perf1/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-007?ref=automate&source=app",
    rating: 4.5,
    reviewCount: 432,
  },
  {
    id: "prod-008",
    name: "Oil Catch Can Kit",
    description:
      "Billet aluminium oil catch can with integrated filter. Prevents oil blow-by from reaching the intake manifold, keeping your engine cleaner for longer.",
    price: 34.99,
    category: "performance",
    imageUrl: "https://picsum.photos/seed/perf2/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-008?ref=automate&source=app",
    rating: 4.2,
    reviewCount: 218,
    badge: "New",
  },
  // Exterior
  {
    id: "prod-009",
    name: "Carbon Fibre Mirror Covers",
    description:
      "Real carbon fibre mirror covers that give your car a sporty, premium look. Lightweight, UV-resistant, and fits most modern vehicles without modification.",
    price: 29.99,
    category: "exterior",
    imageUrl: "https://picsum.photos/seed/ext1/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-009?ref=automate&source=app",
    rating: 4.3,
    reviewCount: 654,
  },
  {
    id: "prod-010",
    name: "LED Strip Underglow Kit",
    description:
      "Multi-color RGB underglow LED kit with app control via Bluetooth. Includes 4 strips for full vehicle coverage, music-sync mode, and weatherproof coating.",
    price: 49.99,
    category: "exterior",
    imageUrl: "https://picsum.photos/seed/ext2/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-010?ref=automate&source=app",
    rating: 4.4,
    reviewCount: 789,
    badge: "New",
  },
  // Safety
  {
    id: "prod-011",
    name: "First Aid & Emergency Kit",
    description:
      "Comprehensive 72-piece car emergency kit including first aid supplies, reflective triangles, jump leads, torch, and a multipurpose tool. ISO certified.",
    price: 32.99,
    category: "safety",
    imageUrl: "https://picsum.photos/seed/safety1/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-011?ref=automate&source=app",
    rating: 4.9,
    reviewCount: 3201,
    badge: "Best Seller",
  },
  {
    id: "prod-012",
    name: "Tyre Inflator Portable",
    description:
      "Compact digital tyre inflator with auto-shutoff at preset pressure. Plugs into 12V car socket. Includes adapters for bikes, inflatables, and sports balls.",
    price: 54.99,
    category: "safety",
    imageUrl: "https://picsum.photos/seed/safety2/400/300",
    affiliateUrl:
      "https://affiliate.example.com/product/prod-012?ref=automate&source=app",
    rating: 4.7,
    reviewCount: 1876,
  },
];
