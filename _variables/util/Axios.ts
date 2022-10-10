import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    // timeout: 30000,
});

export default Axios

//https://stackoverflow.com/questions/63064393/getting-axios-error-connect-etimedout-when-making-high-volume-of-calls