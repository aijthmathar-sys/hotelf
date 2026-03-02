import axiosInstance from "./axiosConfig";

// CREATE RAZORPAY ORDER
export const createPaymentOrder = (bookingId, amount) =>
    axiosInstance.post("/api/payment/create-order", null, {
        params: {
            bookingId,
            amount
        }
    });

// VERIFY PAYMENT
export const verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature) =>
    axiosInstance.post("/api/payment/verify", null, {
        params: {
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        }
    });