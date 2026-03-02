
import axiosInstance from "./axiosConfig";

export const searchHotels = (city) =>
    axiosInstance.get(`/api/hotels/city/${city}`);

export const getAllHotels = () =>
    axiosInstance.get("/api/hotels");

export const updateHotel =(id,data)=>
    axiosInstance.put(`/api/hotels/${id}`,data);

export const deleteHotel=(id)=>
    axiosInstance.delete(`/api/hotels/${id}`);
export const addHotel=(data)=>
    axiosInstance.post("/api/hotels",data);