import { useState } from "react";
import { sendOtp } from "../api/forgotPasswordApi";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      alert("OTP Sent 📩");
      navigate("/verify-otp", { state: { email } });
    } catch {
      alert("Failed ❌");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <input
        placeholder="Enter Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSendOtp}>
        Send OTP
      </button>
    </div>
  );
}

export default ForgotPassword;