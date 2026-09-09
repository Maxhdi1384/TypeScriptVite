import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import type { Product } from "../types/Product";

import Hero from "../components/Home/Hero";
import ProductSection from "../components/Home/ProductSection";
import CategorySection from "../components/Home/CategorySection";
import SpecialOffer from "../components/Home/SpecialOffer";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Newsletter from "../components/Home/Newsletter";

import "./Home.css";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <div className="home-loading">Loading…</div>;
  }

  if (error) {
    return <div className="home-error">{error}</div>;
  }

  return (
    <main>
      <Hero products={products.slice(0, 5)} />

      <ProductSection products={products} />

      <CategorySection />

      {products.length > 5 && (
        <SpecialOffer product={products[5]} />
      )}

      <WhyChooseUs />

      <Newsletter />
    </main>
  );
}

export default Home;