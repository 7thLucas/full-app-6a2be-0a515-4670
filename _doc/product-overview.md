# AutoMate — Car Companion & Accessories Shop

## What It Is
AutoMate is a cross-platform Flutter mobile application (iOS & Android) built with BLoC state management. It serves as a complete car companion — combining vehicle maintenance tracking, fuel consumption logging, and an affiliate-powered car accessories e-commerce module in a single, cohesive app.

## Core Modules

### 1. Vehicle Maintenance Tracking (Existing)
- Log service records: oil changes, brake checks, tire rotations, battery replacements, and more
- Schedule upcoming maintenance with reminders and alerts
- Full service history per vehicle
- Multi-vehicle support

### 2. Fuel Tracking (Existing)
- Log every fuel fill-up with mileage, fuel volume, and cost
- Auto-calculate fuel efficiency (km/L or mpg)
- Visual trend charts for consumption and spending over time
- Monthly fuel cost summaries and analytics

### 3. Affiliate Products E-Commerce Module (New)
- Browse curated car accessories via an in-app storefront
- Product catalog with categories, images, descriptions, pricing, and ratings
- "Buy Now" deep-links with affiliate tracking parameters
- Commission attribution: app owner earns 3–8% commission on every qualifying user purchase
- No inventory held — purely affiliate-driven commerce (zero logistics overhead)
- Product categories: car care products, electronics & gadgets, seat & interior accessories, performance parts, exterior styling, emergency & safety kits
- Compatible with Amazon Associates, Shopee Affiliate, Lazada Affiliate, or any cost-per-sale affiliate network

## Business Model
- **Free to users** — no subscription, no in-app purchases required
- **Revenue via affiliate commissions** — app owner earns a percentage of every qualifying purchase users complete through affiliate links
- High-intent audience: users who actively track vehicle maintenance are the highest-converting buyers for car accessories — trust is already built within the app context

## Target Users
- **Primary**: Car owners who actively manage vehicle maintenance and fuel costs
- **Secondary**: DIY car enthusiasts who handle their own service schedules
- **Secondary**: Value-conscious shoppers seeking trusted, contextual car accessory recommendations

## Technology Stack
- **Framework**: Flutter (cross-platform iOS & Android)
- **State Management**: Flutter BLoC (Business Logic Component pattern)
- **Architecture**: Feature-based modular structure — maintenance module, fuel module, shop/affiliate module each independently scoped
- **Affiliate Integration**: Deep-link URLs with tracking parameters routed through affiliate networks

## Positioning
"The only car app that earns while your users maintain their vehicles."

The maintenance and fuel tracking modules create daily-use habits and genuine trust. The affiliate shop is the natural, friction-free monetisation layer — recommending products users already need, at exactly the moment they are thinking about their car.

## Brand Tone
Practical, trustworthy, modern. Premium enough for serious car owners; approachable enough for everyday use. Clean, mobile-first UI with automotive-inspired visual language.

## Strategic Principles
1. **Earn without selling** — users get free utility; revenue flows from affiliate attribution, invisible to the user experience
2. **Contextual commerce** — accessory recommendations can be tied to logged maintenance events (e.g., promote oil brands after an oil change is logged)
3. **Single car companion** — one app handles all vehicle management, reducing churn to competing apps
4. **Modular growth** — each BLoC module is independently extensible; new features don't break existing ones
