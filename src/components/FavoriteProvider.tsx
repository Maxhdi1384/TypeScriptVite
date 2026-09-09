import {
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/Product";

import { FavoriteContext } from "./FavoriteContext";

interface FavoriteProviderProps {
  children: ReactNode;
}

function FavoriteProvider({
  children,
}: FavoriteProviderProps) {
  const [favoriteItems, setFavoriteItems] =
    useState<Product[]>([]);

  function addToFavorites(product: Product) {
    setFavoriteItems((currentItems) => {
      const alreadyFavorite = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyFavorite) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }

  function removeFromFavorites(productId: number) {
    setFavoriteItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  }

  function toggleFavorite(product: Product) {
    setFavoriteItems((currentItems) => {
      const alreadyFavorite = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyFavorite) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  }

  function isFavorite(productId: number) {
    return favoriteItems.some(
      (item) => item.id === productId
    );
  }

  function clearFavorites() {
    setFavoriteItems([]);
  }

  const favoriteCount = favoriteItems.length;

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoriteCount,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;