import { useState } from "react";
import { registerUser } from "../api/authApi";
import "./Register.css"; // ⭐ add this

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({
        name,
        email,
        password
      });

      alert("Register Success ✅");

    } catch (err) {
      alert("Register Failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          className="register-input"
        />

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="register-input"
        />

        <button
          onClick={handleRegister}
          className="register-btn"
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;