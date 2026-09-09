import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getProducts,
  searchProducts,
} from "../services/productApi";

import type { Product } from "../types/Product";
import ProductCard from "../components/Home/ProductCard";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  // Scroll to top when entering Products page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load products
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        let data: Product[];

        if (searchQuery) {
          data = await searchProducts(searchQuery);
        } else {
          data = await getProducts();
        }

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="products-loading">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        {error}
      </div>
    );
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <span>
          {searchQuery ? "Search Results" : "Discover"}
        </span>

        <h1>
          {searchQuery
            ? `Results for "${searchQuery}"`
            : "All Products"}
        </h1>

        <p>
          {searchQuery
            ? `${products.length} products found`
            : "Explore our collection and find something you love."}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="products-error">
          No products found.
        </div>
      ) : (
        <div className="products-page-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;