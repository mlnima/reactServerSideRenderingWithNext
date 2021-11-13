import axios from "axios";
import _metaPageQueryGenerator from "./clientVariables/_metaPageQueryGenerator";
import _postPageQueryGenerator from "./clientVariables/_postPageQueryGenerator";

export const getPosts = async (queriesData) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL +`/api/v1/posts/clientGetPosts${queriesData}`)
};

export const getPost = async (data, cache) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/clientGetPost${ _postPageQueryGenerator(data)}` )
};

export const checkRemovedContent = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL  + `/api/v1/posts/checkRemovedContent` , body)
};


export const savePost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL  + `/api/admin/posts/createNewPost`, body)
};

export const userCreateNewPost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL  + `/api/v1/posts/userCreateNewPost`, body)
};

export const getMultipleMeta = async (data,metaType,cache) => {
    const queries = _metaPageQueryGenerator(data,metaType,cache)
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL+ `/api/v1/posts/getMultipleMeta${queries}`)
};


// export const getSingleMeta = async (id,cache) => {
//     return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/getMeta?id=${id}&cache=${cache}`)
// };

// export const updateMeta = async (data) => {
//     const body = {
//         data,
//         token: localStorage.wt
//     };
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/updateMeta`, body)
// };

// export const deleteMeta = async (id) => {
//     const body = {
//         _id:id,
//         token: localStorage.wt
//     };
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/deleteMeta`, body)
// };



export const bulkAction = async (type,status,ids) =>{
    const body = {
        type,
        status,
        ids,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/bulkAction`, body)
}





export const newComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/newComment`, body)
};

export const adminGetComments = async (data, domainName, cache) => {
    const body = {
        ...data,
        cache,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/getComments?onDocument=${data.onDocument || 'adminPage'}`, body)
};

export const getComments = async (data,  cache) => {
    const body = {
        ...data,
        cache,
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/getComments?onDocument=${data.onDocument || 'adminPage'}`, body)
};


export const updateComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/updateComment`, body)
};

export const deleteComments = async (data, domainName) => {
    const body = {
        commentsIds: data,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/deleteComments`, body)
};

export const likeDislikeView = async (id, type) => {
    const body = {
        id,
        type
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/posts/likeDislikeView', body)
};

export const exportPosts = async () => {
    const body = {
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/posts/exportPosts', body)
};


