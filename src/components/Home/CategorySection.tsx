import { useEffect, useState } from "react";
import "./CategorySection.css";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const categoryIcons: Record<string, string> = {
  smartphones: "bi-phone-fill",
  laptops: "bi-laptop-fill",
  fragrances: "bi-droplet-fill",
  skincare: "bi-heart-fill",
  groceries: "bi-cart-fill",
  furniture: "bi-house-door-fill",
  automotive: "bi-car-front-fill",
  lighting: "bi-lightbulb-fill",
};

function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Category error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="category-section">
        <div className="category-loading">
          Loading categories...
        </div>
      </section>
    );
  }

  const selectedCategories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "furniture",
    "automotive",
    "lighting",
  ];

  const visibleCategories = selectedCategories
    .map((slug) =>
      categories.find((category) => category.slug === slug)
    )
    .filter((category): category is Category => category !== undefined);

  return (
    <section className="category-section">
      <div className="category-header">
        <div>
          <span className="category-subtitle">
            Explore
          </span>

          <h2>Shop by Category</h2>

          <p>
            Find exactly what you are looking for.
          </p>
        </div>
      </div>

      <div className="category-grid">
        {visibleCategories.map((category) => (
          <button
            className="category-card"
            key={category.slug}
          >
            <div className="category-icon">
              <i
                className={`bi ${
                  categoryIcons[category.slug]
                }`}
              ></i>
            </div>

            <div className="category-info">
              <h3>{category.name}</h3>

              <span>
                Explore products
              </span>
            </div>

            <i className="bi bi-arrow-up-right category-arrow"></i>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;