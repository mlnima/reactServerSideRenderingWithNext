import axios from "axios";
import _objectToQuery from "./clientVariables/_objectToQuery";
import _metaPageQueryGenerator from "./clientVariables/_metaPageQueryGenerator";

export const getPosts = async (data, domainName,cache,queriesData) => {
    const body = {
        ...data,
        cache
    };
  //?requestFor=${encodeURIComponent(queriesData)}
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL +`/api/v1/posts/clientGetPosts?requestFor=${encodeURIComponent(queriesData)}`, body)
};

export const getPost = async (data, domainName, cache) => {
    const body = {
        ...data,
        cache
    };
    return await axios.post(domainName + `/api/v1/posts/clientGetPost?id=${ data._id }` , body)
};
export const checkRemovedContent = async (data) => {

    const body = {
        ...data,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + `/api/v1/posts/checkRemovedContent` , body)
};

export const updatePost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/updatePost`, body)
};

export const savePost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/createNewPost`, body)
};

export const userCreateNewPost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/userCreateNewPost`, body)
};

export const getMultipleMeta = async (data,metaType,cache) => {
    const queries = _metaPageQueryGenerator(data,metaType,cache)
    return await axios.get(process.env.REACT_APP_PRODUCTION_URL + `/api/v1/posts/getMultipleMeta${queries}`)
};

export const getSingleMeta = async (id,cache) => {
    return await axios.get(process.env.REACT_APP_PRODUCTION_URL + `/api/v1/posts/getSingleMeta?id=${ encodeURIComponent(id) }&cache=${cache}`)
};


export const updateMeta = async (data,  domainName) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/updateMeta`, body)
};





export const deleteMeta = async (id, domainName) => {
    const body = {
        _id:id,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/deleteMeta`, body)
};



export const bulkAction = async (domainName,type,status,ids) =>{
    const body = {
        type,
        status,
        ids,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/bulkAction`, body)
}





export const newComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + `/api/v1/posts/newComment`, body)
};

export const adminGetComments = async (data, domainName, cache) => {
    const body = {
        ...data,
        cache,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/getComments?onDocument=${data.onDocument || 'adminPage'}`, body)
};

export const getComments = async (data, domainName, cache) => {
    const body = {
        ...data,
        cache,
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + `/api/v1/posts/getComments?onDocument=${data.onDocument || 'adminPage'}`, body)
};


export const updateComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + `/api/admin/posts/updateComment`, body)
};

export const deleteComments = async (data, domainName) => {
    const body = {
        commentsIds: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/posts/deleteComments`, body)
};

export const likeDislikeView = async (id, type) => {
    const body = {
        id,
        type
    };
    return await axios.post(window.location.origin + '/api/v1/posts/likeDislikeView', body)
};

export const exportPosts = async () => {
    const body = {
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/admin/posts/exportPosts', body)
};


