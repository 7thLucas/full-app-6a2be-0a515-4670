import { Link, useParams } from "react-router";
import { ArrowLeft, Star, ShoppingBag, Tag, AlertCircle, ExternalLink } from "lucide-react";
import { useShop } from "~/lib/automate/store/shop-store";
import { useConfigurables } from "~/modules/configurables";
import { PRODUCT_CATEGORY_LABELS } from "~/lib/automate/models";
import { MOCK_PRODUCTS } from "~/lib/automate/models/mock-products";

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            fill={i <= Math.round(rating) ? "#F59E0B" : "none"}
            className={i <= Math.round(rating) ? "text-[#F59E0B]" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="text-[#1A1A2E] font-bold text-sm">{rating.toFixed(1)}</span>
      <span className="text-[#6B7280] text-xs">({reviewCount.toLocaleString()} reviews)</span>
    </div>
  );
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-[#F59E0B]/15 text-[#92400E] border border-[#F59E0B]/30",
  New: "bg-green-50 text-green-700 border border-green-200",
};

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { config, loading: cfgLoading } = useConfigurables();

  const currency = (!cfgLoading && config?.currency) || "$";
  const showRatings = cfgLoading ? true : config?.showRatings !== false;
  const showBadges = cfgLoading ? true : config?.showBadges !== false;

  // Find product from static data
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6">
        <AlertCircle size={48} className="text-[#6B7280] mb-3" />
        <h2 className="text-[#1A1A2E] font-bold text-lg">Product not found</h2>
        <Link
          to="/app/shop"
          className="mt-4 text-[#F59E0B] font-semibold text-sm"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-full pb-24">
      {/* Hero image with back button overlay */}
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 px-4 pt-12 flex items-center justify-between">
          <Link
            to="/app/shop"
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </Link>
          {showBadges && product.badge && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                BADGE_STYLES[product.badge] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5 space-y-4">
        {/* Category chip */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold px-3 py-1 rounded-full">
            <Tag size={11} />
            {PRODUCT_CATEGORY_LABELS[product.category]}
          </span>
        </div>

        {/* Title & Price */}
        <div>
          <h1 className="text-[#1A1A2E] font-bold text-xl leading-tight">
            {product.name}
          </h1>
          <p className="text-[#F59E0B] font-bold text-3xl mt-2">
            {currency}
            {product.price.toFixed(2)}
          </p>
        </div>

        {/* Rating */}
        {showRatings && (
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        )}

        {/* Description */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-[#1A1A2E] font-semibold text-sm mb-2">
            About this product
          </h3>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Affiliate disclaimer */}
        <p className="text-[#6B7280] text-[11px] text-center">
          * This is an affiliate link. Tapping Buy Now opens an external store.
        </p>
      </div>

      {/* Buy Now — sticky bottom button */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-lg mx-auto px-4 pb-3 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/95 pt-3">
        <button
          onClick={handleBuyNow}
          className="w-full bg-[#F59E0B] text-[#1A1A2E] font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
        >
          <ShoppingBag size={20} strokeWidth={2.5} />
          Buy Now
          <ExternalLink size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
