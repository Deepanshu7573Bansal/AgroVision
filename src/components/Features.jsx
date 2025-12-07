import "../styles/features.css";

export default function Features() {
  return (
    <section className="features">
      <h2>Everything you need to protect your crops</h2>
      <p className="features-subtext">
        Powerful tools designed to diagnose tomato plant diseases early.
      </p>

      <div className="features-grid">

        <div className="feature-card">
          <div className="feature-icon">⬆️</div>
          <h3>Easy Upload</h3>
          <p>Upload a clear leaf image and start analysis instantly.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>AI-Powered Analysis</h3>
          <p>Industry-leading AI model detects diseases accurately.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Community Forum</h3>
          <p>Connect with experts and other farmers.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Secure & Private</h3>
          <p>Your images and crop data are always safe.</p>
        </div>

      </div>
    </section>
  );
}
