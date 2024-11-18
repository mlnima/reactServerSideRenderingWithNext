import axios from 'axios';

const createAxiosInstance = () => {

    const instance = axios.create({
        baseURL:process.env.NEXT_PUBLIC_API_SERVER_URL,
    });

    instance.interceptors.request.use(
        (config) => {
            if (typeof window !== 'undefined') {
                const jwt = localStorage.getItem('wt');
                if (jwt) {
                    config.headers.Authorization = `Bearer ${jwt}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

// Default AxiosInstance
const AxiosInstance = createAxiosInstance();

// Function to get AxiosInstance with custom base URL
export const getAxiosInstance = () => {
    return AxiosInstance;
};

export default AxiosInstance;
