import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <span className="newsletter-subtitle">
          Stay Updated
        </span>

        <h2>Get the Latest Offers</h2>

        <p>
          Subscribe to our newsletter and be the first to know
          about new products and exclusive deals.
        </p>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >
          <div className="newsletter-input-wrapper">
            <i className="bi bi-envelope"></i>

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <button type="submit">
            Subscribe
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        {submitted && (
          <span className="newsletter-success">
            Thanks for subscribing!
          </span>
        )}
      </div>
    </section>
  );
}

export default Newsletter;