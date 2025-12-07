import "../styles/navbar.css";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  // Update user state when localStorage changes (after login)
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LEFT: LOGO */}
      <div className="nav-left">
        <div className="">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        <h2 className="logo-text">AgroVision</h2>
      </div>

      {/* CENTER LINKS (ONLY SHOW WHEN LOGGED IN) */}
      {user && (
        <div className="nav-center">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            📈 Dashboard
          </Link>
          <Link to="/detect" className={isActive("/detect")}>
            🧪 Detect Disease
          </Link>
          <Link to="/community" className={isActive("/community")}>
            👥 Community
          </Link>
          <Link to="/bot" className={isActive("/bot")}>
            🤖 AgriCure Bot
          </Link>
        </div>
      )}

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* IF NOT LOGGED IN → Show Sign In + Register */}
        {!user && (
          <>
            <Link to="/signin" className="auth-small">Sign In</Link>
            <Link to="/register" className="auth-small">Register</Link>
          </>
        )}

        {/* PROFILE ICON (Logged-in users only) */}
        {user && (
          <>
            <Link to="/profile" className="avatar-circle">
              {user.name?.charAt(0)}
              {user.name?.charAt(1)}
            </Link>
            <button className="logout-link" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
