import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-city-backend.herokuapp.com",
});

export default axiosInstance;
