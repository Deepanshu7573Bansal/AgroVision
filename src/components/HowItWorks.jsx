import "../styles/howitworks.css";

export default function HowItWorks() {
  return (
    <section className="howitworks">
      <h2>How It Works</h2>
      <p className="how-subtext">Get disease results in three simple steps.</p>

      <div className="steps">

        <div className="step">
          <div className="step-number">01</div>
          <h3>Upload Image</h3>
          <p>Take a clear leaf image and upload it for analysis.</p>
        </div>

        <div className="step">
          <div className="step-number">02</div>
          <h3>AI Analysis</h3>
          <p>Our AI scans the image and detects possible diseases.</p>
        </div>

        <div className="step">
          <div className="step-number">03</div>
          <h3>Get Results</h3>
          <p>View disease name, confidence score, and treatment steps.</p>
        </div>

      </div>
    </section>
  );
}
