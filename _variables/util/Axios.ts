import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    // timeout: 30000,
});

export default Axios