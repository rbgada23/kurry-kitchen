import axios from "axios";
import { SERVER_URL } from "./../utils/constants";

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
