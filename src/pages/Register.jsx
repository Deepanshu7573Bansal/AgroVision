import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });

      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to dashboard
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account 🌱</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        {/* SIGN IN LINK */}
        <p className="go-signin">
          Already have an account?{" "}
          <span onClick={() => nav("/signin")} className="signin-link">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
