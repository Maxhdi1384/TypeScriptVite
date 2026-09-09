import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "./useCart";

import "./Navbar.css";

interface NavbarProps {
  onSearch: (query: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { cartCount } = useCart();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(query)}`
    );

    onSearch(query);
  }

  return (
    <nav className="navbar-custom">
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        Shop<span>.</span>
      </div>

      <form
        className="navbar-search"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <button type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>

      <div className="navbar-actions">
        <button>
          <i className="bi bi-heart"></i>
        </button>

        <button
          className="cart-button"
          onClick={() => navigate("/cart")}
        >
          <i className="bi bi-cart3"></i>

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </button>

        <button>
          <i className="bi bi-person"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;