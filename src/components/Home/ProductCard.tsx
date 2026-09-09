import { useNavigate } from "react-router-dom";

import type { Product } from "../../types/Product";

import { useCart } from "../useCart";
import { useToast } from "../useToast";
import { useFavorite } from "../useFavorite";

import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorite();

  const favorite = isFavorite(product.id);

  function handleProductClick() {
    navigate(`/products/${product.id}`);
  }

  function handleAddToCart(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();

    addToCart(product);

    showToast("Added to Cart");
  }

  function handleFavoriteClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();

    toggleFavorite(product);

    if (favorite) {
      showToast("Removed from Favorites");
    } else {
      showToast("Added to Favorites");
    }
  }

  return (
    <article
      className="product-card"
      onClick={handleProductClick}
    >
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.title}
        />

        <button
          className={`favorite-btn ${
            favorite ? "active" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <i
            className={
              favorite
                ? "bi bi-heart-fill"
                : "bi bi-heart"
            }
          ></i>
        </button>

        <span className="product-category">
          {product.category}
        </span>
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>

        <div className="product-rating">
          <i className="bi bi-star-fill"></i>

          <span>
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="product-bottom">
          <div className="product-price">
            ${product.price}
          </div>

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;