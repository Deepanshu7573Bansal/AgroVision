import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import "../styles/detect.css";
import { useNavigate } from "react-router-dom";

export default function DetectDisease() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [model, setModel] = useState("ResNet-50");
  const [share, setShare] = useState(true);
  const [result, setResult] = useState(null);
  const nav = useNavigate();

  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    setFile(uploaded);
    setPreview(URL.createObjectURL(uploaded));
  };

  const handleAnalyze = async () => {
    if (!file) return alert("Please upload an image first.");

    try {
      const form = new FormData();
      form.append("image", file);
      form.append("model", model);
      form.append("share", share);

      const res = await API.post("/predictions/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data.prediction);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please sign in first");
        nav("/signin");
      } else {
        alert(err.response?.data?.message || "Prediction failed");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="detect-page">
        <h1>Disease Detection</h1>
        <p className="detect-sub">
          Upload a tomato leaf image to detect plant diseases using AI.
        </p>

        <div className="detect-top-grid">
          {/* Upload Card */}
          <div className="upload-card">
            <h3>Upload Image</h3>
            <p className="card-sub">Click the box to upload</p>

            <div
              className="upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "100%", borderRadius: "14px" }}
                />
              ) : (
                <>
                  <div className="upload-icon">⬆️</div>
                  <p className="upload-text">Click to upload</p>
                  <p className="upload-sub">JPG, PNG, WebP allowed</p>
                </>
              )}
            </div>
          </div>

          {/* Results Card */}
          <div className="results-card">
            <h3>Detection Results</h3>
            <p className="card-sub">Your analysis will appear here</p>

            <div className="results-box">
              {result ? (
                <>
                  <img
                    src={result.imageUrl}
                    alt="Result"
                    style={{ width: "100%", borderRadius: "14px" }}
                  />

                  <h3 style={{ marginTop: "10px" }}>{result.disease}</h3>
                  <p>{result.confidence}% confidence</p>
                </>
              ) : (
                <>
                  <div className="results-icon">🧠</div>
                  <p className="results-title">No Analysis Yet</p>
                  <p className="results-text">
                    Upload an image and click Analyze Image.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="detect-bottom">
          <div className="model-section">
            <h3>Select Model</h3>

            <div className="model-grid">
              {["ResNet-50", "EfficientNet-B0", "DenseNet-121", "MobileNetV2"].map(
                (m) => (
                  <div
                    key={m}
                    className={`model-card ${model === m ? "model-active" : ""}`}
                    onClick={() => setModel(m)}
                  >
                    <div className="model-icon">🧬</div>
                    <div>
                      <p className="model-name">{m}</p>
                      <p className="model-desc">AI model for leaf disease detection</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Share Toggle */}
            <div className="share-toggle-row">
              <div>
                <p className="step-title">Share to Community</p>
                <p className="step-text">
                  Allow your predictions to appear publicly.
                </p>
              </div>

              <div
                className={`toggle-switch ${share ? "on" : ""}`}
                onClick={() => setShare(!share)}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>

            {/* Analyze btn */}
            <button className="analyze-btn" onClick={handleAnalyze}>
              Analyze Image
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
