import axios from "axios";

const AxiosInstance = axios.create({
    //@ts-ignore
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
    // baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL
});

export default AxiosInstance;
