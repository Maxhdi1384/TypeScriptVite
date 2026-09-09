import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            Shop<span>.</span>
          </div>

          <p>
            Discover quality products, great deals, and a better
            shopping experience.
          </p>

          <div className="footer-socials">
            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>

            <a href="#">
              <i className="bi bi-twitter-x"></i>
            </a>

            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>

            <a href="#">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>

          <a href="#">All Products</a>
          <a href="#">Categories</a>
          <a href="#">New Arrivals</a>
          <a href="#">Special Offers</a>
        </div>

        <div className="footer-column">
          <h3>Support</h3>

          <a href="#">Contact Us</a>
          <a href="#">FAQs</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        <div className="footer-column">
          <h3>Company</h3>

          <a href="#">About Us</a>
          <a href="#">Our Story</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Shop. All rights reserved.</p>

        <div className="footer-payment">
          <span>Secure payments</span>

          <i className="bi bi-credit-card"></i>
          <i className="bi bi-wallet2"></i>
          <i className="bi bi-shield-check"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;