import { useNavigate } from "react-router-dom";

import { useCart } from "../components/useCart";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <i className="bi bi-cart3"></i>
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to
            your cart yet.
          </p>

          <button
            className="cart-shop-button"
            onClick={() => navigate("/products")}
          >
            Start Shopping
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <span>Shopping Cart</span>

        <h1>Your Cart</h1>

        <p>
          {cartItems.length}{" "}
          {cartItems.length === 1
            ? "product"
            : "products"}{" "}
          in your cart
        </p>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article
              className="cart-item"
              key={item.product.id}
            >
              <div
                className="cart-item-image"
                onClick={() =>
                  navigate(
                    `/products/${item.product.id}`
                  )
                }
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                />
              </div>

              <div className="cart-item-info">
                <span className="cart-item-category">
                  {item.product.category}
                </span>

                <h2
                  onClick={() =>
                    navigate(
                      `/products/${item.product.id}`
                    )
                  }
                >
                  {item.product.title}
                </h2>

                <span className="cart-item-price">
                  ${item.product.price}
                </span>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item.product.id
                      )
                    }
                  >
                    <i className="bi bi-dash"></i>
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.product.id
                      )
                    }
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>

                <strong>
                  $
                  {(
                    item.product.price *
                    item.quantity
                  ).toFixed(2)}
                </strong>

                <button
                  className="remove-item"
                  onClick={() =>
                    removeFromCart(
                      item.product.id
                    )
                  }
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </article>
          ))}

          <button
            className="clear-cart-button"
            onClick={clearCart}
          >
            <i className="bi bi-trash3"></i>
            Clear Cart
          </button>
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <span className="free-shipping">
              Free
            </span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>
          </div>

          <button className="checkout-button">
            Proceed to Checkout
            <i className="bi bi-arrow-right"></i>
          </button>

          <button
            className="continue-shopping"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;