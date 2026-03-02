import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../api/authApi";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // ⭐ add this

function Navbar() {

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const res = await getCurrentUser();
      console.log("ROLE 👉", res.data.role);
      setRole(res.data.role);
    } catch {
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await axiosInstance.post("/api/auth/logout");
    setRole(null);
    navigate("/")
  };

  if (loading) return null;

  return (
    <div className="navbar">

      <h3 className="logo">StayFinder</h3>

      <div className="menu">

        {!role && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}

        {role === "ROLE_USER" && (
          <>
            <Link to="/booking-history" className="nav-link">My Bookings</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}

      </div>

    </div>
  );
}

export default Navbar;