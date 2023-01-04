import axios from "axios";

const AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
    });

export default AxiosInstance;
