import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Product } from "../../types/Product";
import { useCart } from "../useCart";
import { useToast } from "../useToast";

import "./Hero.css";

interface HeroProps {
  products: Product[];
}

function Hero({ products }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (products.length <= 1) return;

    const interval = setInterval(() => {
      setDirection("next");

      setCurrentIndex((current) => {
        return (current + 1) % products.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) {
    return null;
  }

  const product = products[currentIndex];

  function nextSlide() {
    setDirection("next");

    setCurrentIndex((current) => {
      return (current + 1) % products.length;
    });
  }

  function previousSlide() {
    setDirection("prev");

    setCurrentIndex((current) => {
      return current === 0
        ? products.length - 1
        : current - 1;
    });
  }

  function handleAddToCart() {
    addToCart(product);
    showToast("Added to Cart");
  }

  function handleViewDetails() {
    navigate(`/products/${product.id}`);
  }

  return (
    <section className="hero">

      <div
        className={`hero-content slide-${direction}`}
        key={`content-${product.id}`}
      >

        <span className="hero-category">
          {product.category}
        </span>

        <h1>
          {product.title}
        </h1>

        <p>
          {product.description}
        </p>

        <div className="hero-price">
          ${product.price}
        </div>

        <div className="hero-rating">

          <i className="bi bi-star-fill"></i>

          <span>
            {product.rating.toFixed(1)}
          </span>

        </div>

        <div className="hero-buttons">

          <button
            className="hero-primary-btn"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart3"></i>
            Add to Cart
          </button>

          <button
            className="hero-secondary-btn"
            onClick={handleViewDetails}
          >
            View Details
            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

      </div>


      <div
        className={`hero-image slide-${direction}`}
        key={`image-${product.id}`}
      >

        <div className="hero-glow"></div>

        <img
          src={product.images[0]}
          alt={product.title}
        />

      </div>


      <button
        className="hero-arrow hero-arrow-left"
        onClick={previousSlide}
      >
        <i className="bi bi-chevron-left"></i>
      </button>


      <button
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
      >
        <i className="bi bi-chevron-right"></i>
      </button>


      <div className="hero-dots">

        {products.map((item, index) => (
          <button
            key={item.id}
            className={
              index === currentIndex
                ? "hero-dot active"
                : "hero-dot"
            }
            onClick={() => {
              setDirection(
                index > currentIndex
                  ? "next"
                  : "prev"
              );

              setCurrentIndex(index);
            }}
          />
        ))}

      </div>

    </section>
  );
}

export default Hero;