import axios from "axios";


const queryGeneratorForUnCacheRequest = (requestItems)=>{
    let query = '?'
    for(const item in requestItems){
        query += `${item}=${requestItems[item]}`
    }
    return query
}

export const getPosts = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(`http://localhost:3000/api/v1/posts${queryGeneratorForUnCacheRequest(data)}`, body)
};

export const getPost = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post('http://localhost:3000/api/v1/posts/post', body)
};

export const getMeta = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(`http://localhost:3000/api/v1/posts/getMeta?pageNo=${data.pageNo}&type=${data.type}`, body)
};
export const newComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(`http://localhost:3000/api/v1/posts/newComment`, body)
};
export const getComments = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(`http://localhost:3000/api/v1/posts/getComments`, body)
};
export const updateComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(`http://localhost:3000/api/v1/posts/updateComment`, body)
};

export const likeDislikeView = async (id,type) => {
    const body = {
        id,
        type
    };
    return await axios.post('http://localhost:3000/api/v1/posts/likeDislikeView', body)
};


