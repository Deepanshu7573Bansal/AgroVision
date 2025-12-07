import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [predictions, setPredictions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    API.get(`/predictions/user/${user.id}`).then((res) => {
      setPredictions(res.data.predictions);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Welcome back, {user?.name}!</h1>

        {/* TOP CARDS */}
        <div className="dash-cards-row">

          {/* START DETECTION */}
          <div className="dash-card">
            <p className="dash-card-title">Quick Actions</p>
            <button
              className="start-btn"
              onClick={() => navigate("/detect")}
            >
              Start Detection →
            </button>
          </div>

          {/* TOTAL PREDICTIONS */}
          <div className="dash-card">
            <p className="dash-card-title">Total Predictions</p>
            <p className="dash-card-main">{predictions.length}</p>
          </div>

          {/* COMMUNITY BUTTON */}
          <div className="dash-card">
            <p className="dash-card-title">Community</p>
            <button
              className="secondary-btn"
              onClick={() => navigate("/community")}
            >
              Visit Forum →
            </button>
          </div>

        </div>

        {/* BOTTOM GRID */}
        <div className="dash-bottom-grid">

          {/* LEFT: RECENT PREDICTIONS */}
          <div className="recent-box">
            <h2>Your Recent Predictions</h2>

            <div className="prediction-list">
              {predictions.map((p) => (
                <div key={p._id} className="prediction-item">
                  <div className="prediction-left">
                    <img
                      src={p.imageUrl}
                      alt="leaf"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <p className="pred-disease">{p.disease}</p>
                      <p className="pred-meta">{p.confidence}% confidence</p>
                    </div>
                  </div>

                  <p className="pred-date">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: HOW TO USE */}
          <div className="getstarted-box">
            <h2 className="how-title">How To Use</h2>

            <div className="how-steps">

              <div className="how-row">
                <div className="how-number">1</div>
                <div className="how-content">
                  <p className="how-main">Upload Image</p>
                  <p className="how-sub">Choose a clear tomato leaf photo.</p>
                </div>
              </div>

              <div className="how-row">
                <div className="how-number">2</div>
                <div className="how-content">
                  <p className="how-main">Select Model</p>
                  <p className="how-sub">Pick your preferred AI model.</p>
                </div>
              </div>

              <div className="how-row">
                <div className="how-number">3</div>
                <div className="how-content">
                  <p className="how-main">Analyze Leaf</p>
                  <p className="how-sub">AI identifies disease instantly.</p>
                </div>
              </div>

              <div className="how-row">
                <div className="how-number">4</div>
                <div className="how-content">
                  <p className="how-main">View Results</p>
                  <p className="how-sub">See prediction & confidence score.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
