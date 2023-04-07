// @ts-nocheck
import axios from "axios";

const FileServerAxiosInstance =axios.create({
    baseURL: process.env.NEXT_PUBLIC_FILE_SERVER_URL
});

export default FileServerAxiosInstance;