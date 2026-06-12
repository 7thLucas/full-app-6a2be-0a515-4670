# AutoMate — Car Companion & Accessories Shop

## Overview
AutoMate is a Flutter mobile application (iOS & Android) that serves as a complete car companion. It combines vehicle maintenance tracking, fuel consumption logging, and an affiliate product shop into a single, cohesive app.

## Users
Car owners who want to track their vehicle maintenance history, monitor fuel efficiency, and discover car accessories and products through an affiliate shop.

## Brand & Tone
- Name: AutoMate
- Tone: Practical, reliable, clean, and modern
- Audience: Car enthusiasts and everyday drivers alike

## Core Modules

### 1. Vehicle Maintenance Tracking
Helps users keep a detailed log of all service records for their vehicles.

**Models:**
- `Vehicle`: id, make, model, year, licensePlate, color
- `ServiceRecord`: id, vehicleId, serviceType (enum: oilChange, tyrRotation, brakeCheck, battery, airFilter, other), date, mileage, notes, cost

**Features:**
- Vehicle list screen — tap to view service history
- Add/edit vehicle screen
- Service history list per vehicle (sorted by date desc)
- Add/edit service record with date picker, mileage, cost, notes
- Upcoming maintenance reminder card (e.g., "Oil change due at X km")
- Delete vehicle / delete service record with confirmation

**BLoC:**
- `MaintenanceBloc` with events: LoadVehicles, AddVehicle, UpdateVehicle, DeleteVehicle, LoadServiceRecords, AddServiceRecord, DeleteServiceRecord
- States: MaintenanceLoading, MaintenanceLoaded, MaintenanceError

### 2. Fuel Tracking
Tracks fuel fill-ups and computes efficiency statistics.

**Model:**
- `FuelEntry`: id, vehicleId, date, fuelAmount (litres), mileage, costPerUnit, totalCost, notes
- `FuelStats`: computed — avgEfficiency (km/L), totalSpend, entries count

**Features:**
- Fuel log list (all entries, newest first)
- Add fuel fill-up: date, litres, odometer reading, cost
- Auto-calculate km/L from consecutive entries
- Stats card at top: average efficiency, monthly cost, total fill-ups
- Simple bar/line chart for monthly fuel spend (use fl_chart)

**BLoC:**
- `FuelBloc` with events: LoadFuelEntries, AddFuelEntry, DeleteFuelEntry, CalculateStats
- States: FuelLoading, FuelLoaded (with List<FuelEntry> + FuelStats), FuelError

### 3. Affiliate Products E-Commerce Shop
A static/mock product catalog with affiliate links.

**Models:**
- `Product`: id, name, description, price, category (enum), imageUrl, affiliateUrl, rating, reviewCount, badge (optional: "Best Seller", "New")
- `ProductCategory`: carCare, electronics, interior, performance, exterior, safety

**Static mock products (12 products, 2 per category):**
- Car Care: "Premium Microfibre Wash Kit" ($24.99, 4.7 stars), "Ceramic Coating Spray" ($39.99, 4.5 stars)
- Electronics: "Dash Cam 4K Ultra HD" ($79.99, 4.6 stars), "Bluetooth FM Transmitter" ($19.99, 4.3 stars)
- Interior: "Universal Seat Covers Set" ($45.99, 4.4 stars), "Car Phone Mount Magnetic" ($14.99, 4.8 stars)
- Performance: "Cold Air Intake Filter" ($59.99, 4.5 stars), "Oil Catch Can Kit" ($34.99, 4.2 stars)
- Exterior: "Carbon Fibre Mirror Covers" ($29.99, 4.3 stars), "LED Strip Underglow Kit" ($49.99, 4.4 stars)
- Safety: "First Aid & Emergency Kit" ($32.99, 4.9 stars), "Tyre Inflator Portable" ($54.99, 4.7 stars)

For imageUrl: use picsum.photos placeholder URLs (e.g. https://picsum.photos/seed/product1/400/300)
For affiliateUrl: use https://affiliate.example.com/product/{id}?ref=automate&source=app

**Features:**
- Product list page: grid layout (2 columns), category filter chips at top
- Product card: image, name, price, star rating
- Product detail page: full image, description, price, rating, category badge, "Buy Now" button
- "Buy Now" opens the affiliateUrl via url_launcher (launchUrl in external browser)
- Category filter persists in BLoC state

**BLoC:**
- `ShopBloc` with events: LoadProducts, FilterByCategory, ClearFilter, SelectProduct
- States: ShopLoading, ShopLoaded (with products list + selectedCategory), ShopError

## Navigation
Bottom navigation bar with 3 tabs:
1. Maintenance (wrench icon) → VehicleListPage
2. Fuel (local_gas_station icon) → FuelLogPage
3. Shop (shopping_bag icon) → ProductListPage

## Strategic Principles
- All data is stored locally (no backend required)
- Affiliate shop uses static/mock product data only
- App must work fully offline
- Clean, intuitive UX with no unnecessary complexity
