import { Link } from "react-router";
import { ShoppingBag, Star, Tag } from "lucide-react";
import { useShop } from "~/lib/automate/store/shop-store";
import { useConfigurables } from "~/modules/configurables";
import {
  PRODUCT_CATEGORY_LABELS,
  type ProductCategory,
} from "~/lib/automate/models";
import type { Product } from "~/lib/automate/models";

const ALL_CATEGORIES = Object.keys(
  PRODUCT_CATEGORY_LABELS
) as ProductCategory[];

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-[#F59E0B] text-[#1A1A2E]",
  New: "bg-[#10B981] text-white",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={10}
          fill={i <= Math.round(rating) ? "#F59E0B" : "none"}
          className={
            i <= Math.round(rating) ? "text-[#F59E0B]" : "text-gray-300"
          }
        />
      ))}
      <span className="text-[#6B7280] text-[10px] ml-1 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ProductCard({
  product,
  currency,
  showRatings,
  showBadges,
}: {
  product: Product;
  currency: string;
  showRatings: boolean;
  showBadges: boolean;
}) {
  return (
    <Link
      to={`/app/shop/${product.id}`}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col active:scale-95 transition-transform"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full aspect-video object-cover"
          loading="lazy"
        />
        {showBadges && product.badge && (
          <span
            className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              BADGE_STYLES[product.badge] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[#1A1A2E] font-semibold text-xs leading-tight line-clamp-2 flex-1">
          {product.name}
        </p>
        {showRatings && (
          <div className="mt-1.5">
            <StarRating rating={product.rating} />
          </div>
        )}
        <p className="text-[#F59E0B] font-bold text-sm mt-1.5">
          {currency}
          {product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  const { state, dispatch } = useShop();
  const { config, loading: cfgLoading } = useConfigurables();

  const currency = (!cfgLoading && config?.currency) || "$";
  const showRatings = cfgLoading ? true : config?.showRatings !== false;
  const showBadges = cfgLoading ? true : config?.showBadges !== false;
  const shopTitle =
    (!cfgLoading && config?.shopSectionTitle) || "Car Accessories Shop";
  const shopSubtitle =
    (!cfgLoading && config?.shopSectionSubtitle) ||
    "Top picks for every driver";

  const selectedCategory = state.selectedCategory;

  const handleCategoryToggle = (cat: ProductCategory) => {
    if (selectedCategory === cat) {
      dispatch({ type: "CLEAR_FILTER" });
    } else {
      dispatch({ type: "FILTER_BY_CATEGORY", category: cat });
    }
  };

  return (
    <div className="min-h-full">
      {/* App Bar */}
      <header className="bg-[#1E3A5F] px-4 pt-12 pb-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-0.5">
              AutoMate
            </p>
            <h1 className="text-white text-2xl font-bold">{shopTitle}</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
            <ShoppingBag size={20} className="text-[#F59E0B]" />
          </div>
        </div>
        <p className="text-white/60 text-sm">{shopSubtitle}</p>
      </header>

      {/* Category Filter Chips */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => dispatch({ type: "CLEAR_FILTER" })}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              !selectedCategory
                ? "bg-[#1E3A5F] text-white"
                : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryToggle(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
              }`}
            >
              {PRODUCT_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 py-4">
        {state.loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-48 animate-pulse"
              />
            ))}
          </div>
        ) : state.filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Tag size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-[#1A1A2E] font-semibold">No products found</p>
            <button
              onClick={() => dispatch({ type: "CLEAR_FILTER" })}
              className="mt-3 text-[#F59E0B] font-semibold text-sm"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {state.filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                showRatings={showRatings}
                showBadges={showBadges}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
