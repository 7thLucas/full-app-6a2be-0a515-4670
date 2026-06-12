# AutoMate Design Guidelines

## Color Palette
```
Primary (Deep Navy):      #1E3A5F
Accent (Amber Gold):      #F59E0B
Background (Light Grey):  #F8F9FA
Card Surface:             #FFFFFF
Text Primary (Near Black):#1A1A2E
Text Secondary (Grey):    #6B7280
Error Red:                #EF4444
Success Green:            #10B981
```

## Typography
- Headlines: Bold, navy primary color
- Body: Regular weight, text primary color
- Captions/Labels: Text secondary color, slightly smaller
- Prices: Bold amber accent color
- Use Material Design text theme scaled appropriately for mobile

## Tech Stack
- Flutter (cross-platform iOS & Android)
- Flutter BLoC (flutter_bloc + equatable) for ALL state management
- Feature-based modular architecture

## Architecture
```
lib/
  main.dart
  app.dart              (MaterialApp, theme, routing)
  core/
    theme/              (AppTheme — navy primary, amber accent)
    constants/          (AppColors, AppTextStyles)
    widgets/            (shared: AppBar, Cards, Buttons)
  features/
    maintenance/
      data/             (models: Vehicle, ServiceRecord)
      bloc/             (MaintenanceBloc, events, states)
      repository/       (MaintenanceRepository using Hive)
      ui/               (VehicleListPage, AddVehiclePage, ServiceHistoryPage, AddServicePage)
    fuel/
      data/             (models: FuelEntry, FuelStats)
      bloc/             (FuelBloc, events, states)
      repository/       (FuelRepository using Hive)
      ui/               (FuelLogPage, AddFuelEntryPage, FuelStatsPage)
    shop/
      data/             (models: Product, ProductCategory)
      bloc/             (ShopBloc, events, states)
      repository/       (ShopRepository with static mock data)
      ui/               (ProductListPage, ProductDetailPage, CategoryFilterWidget)
  navigation/
    app_router.dart
    bottom_nav.dart     (3-tab bottom nav)
```

## pubspec.yaml Dependencies
```yaml
dependencies:
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  fl_chart: ^0.65.0
  url_launcher: ^6.2.1
  cached_network_image: ^3.3.0
  uuid: ^4.2.1
```

## Component Design

### Bottom Navigation Bar
- 3 tabs: Maintenance (wrench icon), Fuel (local_gas_station icon), Shop (shopping_bag icon)
- Active tab: amber accent color
- Inactive: grey
- Background: white with subtle shadow

### Cards
- White background, rounded corners (12px radius)
- Subtle shadow (elevation 2)
- Navy text headings, grey secondary text
- Amber accent for prices, ratings, and highlights

### Buttons
- Primary CTA: Amber gold background (#F59E0B), navy text, rounded (8px)
- Secondary: Navy outlined, transparent background
- Destructive: Red background for delete actions

### Forms / Input Fields
- Outlined style with navy border on focus
- Clear labels above fields
- Date pickers use Material date picker dialog
- Dropdown menus for enums (service type, category)

### Product Grid
- 2-column grid with 12px gap
- Product card: image (top, 16:9 aspect), name, price, star rating below
- Category filter chips: horizontal scrollable row at top
- "Best Seller" / "New" badge overlaid top-left of product image in amber

### Charts (fl_chart)
- Bar chart for monthly fuel spend
- Line chart overlay for efficiency trend
- Navy bars, amber accent line
- Minimal axis labels, clean grid lines

### AppBar
- Navy background, white text/icons
- Consistent across all screens
- Back button auto-shown on sub-pages

## Elevation & Spacing
- Page padding: 16px horizontal
- Card gap: 12px
- Section spacing: 24px
- Border radius (cards): 12px
- Border radius (buttons): 8px
- Border radius (chips): 20px (pill shape)

## Icons
- Use Material Icons throughout
- Wrench: Icons.build (or Icons.construction)
- Fuel: Icons.local_gas_station
- Shop: Icons.shopping_bag
- Add: Icons.add (FAB with amber background)
- Delete: Icons.delete_outline
- Edit: Icons.edit_outlined
- Star rating: Icons.star (filled, amber)
