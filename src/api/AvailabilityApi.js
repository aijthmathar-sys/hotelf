import axiosInstance from "./axiosConfig";

// CHECK SINGLE ROOM AVAILABILITY
export const checkRoomAvailability = (roomId, checkIn, checkOut) =>
    axiosInstance.get("/api/availability/room", {
        params: {
            roomId,
            checkIn,
            checkOut
        }
    });

// SEARCH AVAILABLE ROOMS BY CITY
export const searchAvailableRooms = (city, checkIn, checkOut) =>
    axiosInstance.get("/api/availability/search", {
        params: {
            city,
            checkIn,
            checkOut
        }
    });