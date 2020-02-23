import axios from "axios";

export const getPosts = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post('http://localhost:3000/api/v1/posts', body)
};

export const getPost = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post('http://localhost:3000/api/v1/posts/post', body)
};
