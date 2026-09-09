import { createContext } from "react";

import type { Product } from "../types/Product";

export interface FavoriteContextType {
  favoriteItems: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  favoriteCount: number;
}

export const FavoriteContext =
  createContext<FavoriteContextType | undefined>(
    undefined
  );