import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      // Store user and token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">

        <h2>Welcome Back 👋</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="go-register">
          Don’t have an account?{" "}
          <span onClick={() => nav("/register")} className="register-link">
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
