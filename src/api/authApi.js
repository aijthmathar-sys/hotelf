import axiosInstance  from "./axiosConfig";

export const loginUser =(data)=>
    axiosInstance.post("/api/auth/login",data);

export const registerUser=(data)=>
    axiosInstance.post("/api/auth/register",data);
export const getCurrentUser=()=>
    axiosInstance.get("api/auth/me")