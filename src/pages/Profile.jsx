import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (!user) return;

    API.get(`/predictions/user/${user.id}`).then((res) => {
      setPredictions(res.data.predictions);
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-banner"></div>

          <div className="profile-main">
            <div className="avatar-large">
              {user?.name?.charAt(0)}
              {user?.name?.charAt(1)}
            </div>

            <div>
              <h2>{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>

          <div className="profile-stats-row">
            <div className="profile-stat">
              <p className="stat-number">{predictions.length}</p>
              <p className="stat-label">Predictions</p>
            </div>
          </div>
        </div>

        <div className="profile-body">
          <h3>My Predictions</h3>

          <div className="profile-pred-grid">
            {predictions.map((p) => (
              <div key={p._id} className="profile-pred-card">
                <img
                  src={p.imageUrl}
                  alt=""
                  className="profile-pred-image"
                />

                <div className="profile-pred-bottom">
                  <span className="confidence-badge">
                    {p.confidence}% confidence
                  </span>

                  <p className="pred-disease">{p.disease}</p>

                  <p className="pred-time">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
