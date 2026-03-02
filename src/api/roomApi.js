import axiosInstance from "./axiosConfig";

// PUBLIC - Get rooms by hotel
export const getRoomsByHotel = (hotelId) =>
    axiosInstance.get(`/api/rooms/hotel/${hotelId}`);

// ADMIN - Create room
export const createRoom = (hotelId, data) =>
    axiosInstance.post(`/api/rooms/${hotelId}`, data);

// ADMIN - Update room
export const updateRoom = (id, data) =>
    axiosInstance.put(`/api/rooms/${id}`, data);

// ADMIN - Delete room
export const deleteRoom = (id) =>
    axiosInstance.delete(`/api/rooms/${id}`);