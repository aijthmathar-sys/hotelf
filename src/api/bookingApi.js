import axiosInstance from "./axiosConfig";

// CREATE BOOKING
export const createBooking = (data) =>
    
  axiosInstance.post("/api/bookings", data);

// CANCEL BOOKING
export const cancelBooking = (id) =>
    axiosInstance.put(`/api/bookings/${id}/cancel`);

// GET MY BOOKINGS
export const getMyBookings = () =>
    axiosInstance.get("/api/bookings/my");