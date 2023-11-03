// @ts-nocheck
import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (useUrl?: string): AxiosInstance => {
    const baseURL = useUrl === 'fileServer' ?  process.env.NEXT_PUBLIC_FILE_SERVER_URL : process.env.NEXT_PUBLIC_API_SERVER_URL
    const instance = axios.create({
        baseURL,
    });

    instance.interceptors.request.use(
        (config) => {
            if (typeof window !== 'undefined') {
                const jwt = localStorage.getItem('wt');
                if (jwt) {
                    config?.headers?.Authorization = `Bearer ${jwt}`;
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
export const getAxiosInstance = (useUrl?: string): AxiosInstance => {
    if (useUrl) {
        return createAxiosInstance(useUrl);
    }

    return AxiosInstance;
};

export default AxiosInstance;
