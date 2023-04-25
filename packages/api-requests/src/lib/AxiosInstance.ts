// @ts-nocheck
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
});

// Request interceptor to add JWT to headers if it exists
AxiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            // Check if JWT exists in local storage
            const jwt = localStorage.getItem('wt');
            if (jwt) {
                // Include JWT in Authorization header
                config.headers.Authorization = `Bearer ${jwt}`;
            }
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default AxiosInstance;












// // @ts-nocheck
// import axios from "axios";
//
// const AxiosInstance = axios.create({
//         baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
//     });
//
// export default AxiosInstance;

