import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../api/authApi";
import "./Login.css"; // ⭐ add this

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      await loginUser({
        email,
        password
      });

      await new Promise(resolve => setTimeout(resolve, 200));

      const res = await getCurrentUser();
      const role = res.data.role;

      console.log("ROLE 👉", role);

      alert("Login Success ✅");

      if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/home");
      }

      window.location.reload();

    } catch (err) {
      alert("Login Failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          <p
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;