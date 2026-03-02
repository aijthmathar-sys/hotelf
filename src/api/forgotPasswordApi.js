import axiosInstance from "./axiosConfig";

// SEND OTP
export const sendOtp = (email) =>
  axiosInstance.post(`/api/auth/forgot-password?email=${email}`);

// VERIFY OTP
export const verifyOtp = (email, otp) =>
  axiosInstance.post(`/api/auth/verify-otp?email=${email}&otp=${otp}`);

// RESET PASSWORD
export const resetPassword = (email, password) =>
  axiosInstance.post(`/api/auth/reset-password?email=${email}&newPassword=${password}`);