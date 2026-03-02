import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyOtp } from "../api/forgotPasswordApi";

function VerifyOtp() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const email = state?.email;

  const handleVerify = async () => {
    try {
      await verifyOtp(email, otp);
      alert("OTP Verified ✅");
      navigate("/reset-password", { state: { email } });
    } catch {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>

      <input
        placeholder="Enter OTP"
        onChange={(e)=>setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
}

export default VerifyOtp;