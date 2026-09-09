import "./WhyChooseUs.css";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "bi-lightning-charge-fill",
    title: "Fast Delivery",
    description: "Get your orders delivered quickly and safely.",
  },
  {
    icon: "bi-shield-check",
    title: "Secure Payment",
    description: "Your payment information is always protected.",
  },
  {
    icon: "bi-arrow-repeat",
    title: "Easy Returns",
    description: "Simple and hassle-free returns whenever you need.",
  },
  {
    icon: "bi-headset",
    title: "24/7 Support",
    description: "Our support team is here whenever you need help.",
  },
];

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-header">
        <span className="why-subtitle">Our Benefits</span>

        <h2>Why Choose Us?</h2>

        <p>
          Everything you need for a better and easier shopping experience.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feature) => (
          <article className="why-card" key={feature.title}>
            <div className="why-icon">
              <i className={`bi ${feature.icon}`}></i>
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;