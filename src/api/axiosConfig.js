import axios from "axios";

const axiosInstance= axios.create({
    baseURL:"http://localhost:9090",
    withCredentials:true
});

export default axiosInstance;