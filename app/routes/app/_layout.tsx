import { Outlet, NavLink, useLocation } from "react-router";
import { Wrench, Fuel, ShoppingBag } from "lucide-react";
import { MaintenanceProvider } from "~/lib/automate/store/maintenance-store";
import { FuelProvider } from "~/lib/automate/store/fuel-store";
import { ShopProvider } from "~/lib/automate/store/shop-store";
import { useConfigurables } from "~/modules/configurables";

const NAV_ITEMS = [
  {
    to: "/app/maintenance",
    icon: Wrench,
    labelKey: "maintenanceTabLabel" as const,
    defaultLabel: "Maintenance",
  },
  {
    to: "/app/fuel",
    icon: Fuel,
    labelKey: "fuelTabLabel" as const,
    defaultLabel: "Fuel",
  },
  {
    to: "/app/shop",
    icon: ShoppingBag,
    labelKey: "shopTabLabel" as const,
    defaultLabel: "Shop",
  },
];

function BottomNav() {
  const { config, loading } = useConfigurables();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-2px_16px_rgba(0,0,0,0.08)] z-50 safe-area-inset-bottom">
      <div className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, labelKey, defaultLabel }) => {
          const isActive = location.pathname.startsWith(to);
          const label = (!loading && config?.[labelKey]) || defaultLabel;
          return (
            <NavLink
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 min-h-[60px] transition-colors"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={
                  isActive ? "text-[#F59E0B]" : "text-[#6B7280]"
                }
              />
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors ${
                  isActive ? "text-[#F59E0B]" : "text-[#6B7280]"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#F59E0B] rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default function AppLayout() {
  return (
    <MaintenanceProvider>
      <FuelProvider>
        <ShopProvider>
          <div className="flex flex-col min-h-screen bg-[#F8F9FA] max-w-lg mx-auto relative">
            <main className="flex-1 overflow-y-auto pb-[72px]">
              <Outlet />
            </main>
            <BottomNav />
          </div>
        </ShopProvider>
      </FuelProvider>
    </MaintenanceProvider>
  );
}
