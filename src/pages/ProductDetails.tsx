import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { getProductById } from "../services/productApi";
import type { Product } from "../types/Product";

import { useCart } from "../components/useCart";
import { useToast } from "../components/useToast";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isLightboxOpen, setIsLightboxOpen] =
    useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("Product ID not found");
        }

        const data = await getProductById(
          Number(id)
        );

        setProduct(data);

        setSelectedImage(
          data.images[0] || data.thumbnail
        );
      } catch (error) {
        console.error(error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // =========================
  // Cart
  // =========================

  function handleAddToCart() {
    if (!product) return;

    addToCart(product);
    showToast("Added to Cart");
  }

  // =========================
  // Lightbox
  // =========================

  function openLightbox() {
    setIsLightboxOpen(true);
  }

  function closeLightbox() {
    setIsLightboxOpen(false);
  }

  function showNextImage() {
    if (!product) return;

    const currentIndex =
      product.images.indexOf(selectedImage);

    const nextIndex =
      currentIndex ===
      product.images.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(
      product.images[nextIndex]
    );
  }

  function showPreviousImage() {
    if (!product) return;

    const currentIndex =
      product.images.indexOf(selectedImage);

    const previousIndex =
      currentIndex === 0
        ? product.images.length - 1
        : currentIndex - 1;

    setSelectedImage(
      product.images[previousIndex]
    );
  }

  // =========================
  // Close Lightbox with Escape
  // =========================

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (!isLightboxOpen || !product) return;

      const currentIndex =
        product.images.indexOf(selectedImage);

      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        const nextIndex =
          currentIndex ===
          product.images.length - 1
            ? 0
            : currentIndex + 1;

        setSelectedImage(
          product.images[nextIndex]
        );
      }

      if (event.key === "ArrowLeft") {
        const previousIndex =
          currentIndex === 0
            ? product.images.length - 1
            : currentIndex - 1;

        setSelectedImage(
          product.images[previousIndex]
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isLightboxOpen,
    selectedImage,
    product,
  ]);

  if (loading) {
    return (
      <div className="product-details-loading">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>Product not found</h2>

        <button
          onClick={() =>
            navigate("/products")
          }
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <main className="product-details-page">

      {/* Back */}

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i>
        Back
      </button>

      <section className="product-details">

        {/* =========================
            Gallery
        ========================= */}

        <div className="product-gallery">

          {/* Main Image */}

          <div
            className="product-details-image"
            onClick={openLightbox}
          >
            <img
              src={selectedImage}
              alt={product.title}
            />

            <div className="image-zoom-icon">
              <i className="bi bi-zoom-in"></i>
            </div>
          </div>

          {/* Thumbnails */}

          <div className="product-thumbnails">

            {product.images.map(
              (image, index) => (
                <button
                  key={index}
                  className={`product-thumbnail ${
                    selectedImage === image
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                >
                  <img
                    src={image}
                    alt={`${product.title} ${
                      index + 1
                    }`}
                  />
                </button>
              )
            )}

          </div>
        </div>

        {/* =========================
            Product Information
        ========================= */}

        <div className="product-details-info">

          <span className="product-details-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <div className="product-details-rating">

            <i className="bi bi-star-fill"></i>

            <span>
              {product.rating.toFixed(1)}
            </span>

          </div>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-price">
            ${product.price}
          </div>

          <div className="product-details-stock">
            <span>In Stock</span>
          </div>

          <button
            className="product-details-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>
      </section>

      {/* =========================
          Lightbox
      ========================= */}

      {isLightboxOpen && (
        <div
          className="lightbox"
          onClick={closeLightbox}
        >

          {/* Close */}

          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close image"
          >
            <i className="bi bi-x-lg"></i>
          </button>

          {/* Previous */}

          <button
            className="lightbox-arrow lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous image"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* Image */}

          <div
            className="lightbox-image-container"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={selectedImage}
              alt={product.title}
              className="lightbox-image"
            />
          </div>

          {/* Next */}

          <button
            className="lightbox-arrow lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next image"
          >
            <i className="bi bi-chevron-right"></i>
          </button>

        </div>
      )}

    </main>
  );
}

export default ProductDetails;