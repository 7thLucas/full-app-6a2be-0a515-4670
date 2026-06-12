import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { Product, ProductCategory } from "../models";
import { MOCK_PRODUCTS } from "../models/mock-products";

// ─── State ────────────────────────────────────────────────────────────────────

interface ShopState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: ProductCategory | null;
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

// ─── Events ───────────────────────────────────────────────────────────────────

type ShopAction =
  | { type: "LOAD_PRODUCTS" }
  | { type: "PRODUCTS_LOADED"; products: Product[] }
  | { type: "FILTER_BY_CATEGORY"; category: ProductCategory }
  | { type: "CLEAR_FILTER" }
  | { type: "SELECT_PRODUCT"; product: Product | null }
  | { type: "ERROR"; message: string };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function applyFilter(
  products: Product[],
  category: ProductCategory | null
): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

function reducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return { ...state, loading: true, error: null };
    case "PRODUCTS_LOADED": {
      return {
        ...state,
        loading: false,
        products: action.products,
        filteredProducts: applyFilter(action.products, state.selectedCategory),
      };
    }
    case "FILTER_BY_CATEGORY": {
      return {
        ...state,
        selectedCategory: action.category,
        filteredProducts: applyFilter(state.products, action.category),
      };
    }
    case "CLEAR_FILTER": {
      return {
        ...state,
        selectedCategory: null,
        filteredProducts: state.products,
      };
    }
    case "SELECT_PRODUCT":
      return { ...state, selectedProduct: action.product };
    case "ERROR":
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface ShopContextValue {
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    filteredProducts: [],
    selectedCategory: null,
    selectedProduct: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "LOAD_PRODUCTS" });
    // Static mock data — no network call needed
    dispatch({ type: "PRODUCTS_LOADED", products: MOCK_PRODUCTS });
  }, []);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be inside ShopProvider");
  return ctx;
}
