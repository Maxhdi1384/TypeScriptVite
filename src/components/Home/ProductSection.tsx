import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import "./ProductSection.css";

interface ProductSectionProps {
  products: Product[];
}

function ProductSection({ products }: ProductSectionProps) {
  const navigate = useNavigate();

  const visibleProducts = products.slice(0, 8);

  return (
    <section className="products-section">
      <div className="section-title">
        <div>
          <span className="section-subtitle">Discover</span>
          <h2>Trending Products</h2>
        </div>

        {products.length > 8 && (
          <button onClick={() => navigate("/products")}>
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        )}
      </div>

      <div className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;