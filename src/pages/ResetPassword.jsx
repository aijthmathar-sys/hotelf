import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../api/forgotPasswordApi";

function ResetPassword() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const email = state?.email;

  const handleReset = async () => {
    try {
      await resetPassword(email, password);
      alert("Password Reset Successful ✅");
      navigate("/login");
    } catch {
      alert("Failed ❌");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;