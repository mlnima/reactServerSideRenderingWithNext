import axios from "axios";

const Axios = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
   baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL
});

export default Axios;
