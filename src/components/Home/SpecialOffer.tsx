import type { Product } from "../../types/Product";
import "./SpecialOffer.css";

interface SpecialOfferProps {
  product: Product;
}

function SpecialOffer({ product }: SpecialOfferProps) {
  const oldPrice = product.price * 1.25;

  return (
    <section className="special-offer">
      <div className="offer-content">
        <span className="offer-label">Limited Time Offer</span>

        <h2>Special Offer</h2>

        <p className="offer-description">
          Get this amazing product today with a special discount.
          Don't miss your chance!
        </p>

        <div className="offer-price">
          <span className="old-price">
            ${oldPrice.toFixed(2)}
          </span>

          <span className="new-price">
            ${product.price.toFixed(2)}
          </span>

          <span className="discount">
            20% OFF
          </span>
        </div>

        <button className="offer-button">
          Shop Now
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>

      <div className="offer-product">
        <div className="offer-glow"></div>

        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
    </section>
  );
}

export default SpecialOffer;