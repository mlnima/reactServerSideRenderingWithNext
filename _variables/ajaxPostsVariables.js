import axios from "axios";

const queryGeneratorForUnCacheRequest = (requestItems) => {
    let query = '?'
    for (const item in requestItems) {
        query += `${ item }=${ requestItems[item] }`
    }
    return query
}

const cacheQueryGenerator = cache => {
    return !cache ? Date.now() : ''
}

export const getPosts = async (data, cache, domainName) => {

    const body = {
        ...data,
    };
    return await axios.post(domainName + `/api/v1/posts${ queryGeneratorForUnCacheRequest(data)  }`, body, {
        headers: {
            'cache-control': 'no-cache',
        },
    })
    // return await axios.post(domainName +`/api/v1/posts`, body)
};

export const getPost = async (data, cache, domainName) => {
    const body = {
        ...data,
    };
    return await axios.post(domainName + '/api/v1/posts/post', body)
};

export const updatePost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/updatePost`, body)
};

export const savePost = async (data, domainName) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/createNewPost`, body)
};

export const getMeta = async (data, cache, domainName) => {
    const body = {
        ...data,
    };
    return await axios.post(domainName + `/api/v1/posts/getMeta?pageNo=${ data.pageNo }&type=${ data.type }`, body)
};

export const newComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + `/api/v1/posts/newComment`, body)
};

export const getComments = async (data, cache, domainName) => {
    const body = {
        ...data,
    };
    return await axios.post(domainName + `/api/v1/posts/getComments`, body)
};

export const updateComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + `/api/v1/posts/updateComment`, body)
};

export const likeDislikeView = async (id, type) => {
    const body = {
        id,
        type
    };
    return await axios.post(window.location.origin + '/api/v1/posts/likeDislikeView', body)
};


