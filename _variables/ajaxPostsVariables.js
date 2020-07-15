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
    const fetchUrl = cache ? `/api/v1/posts${ queryGeneratorForUnCacheRequest(data) }` : `/api/v1/posts${ queryGeneratorForUnCacheRequest(data) }&date=${ Date.now() }`
    const body = {
        ...data,
    };
    return await axios.post(domainName + fetchUrl, body, {
        headers: {
            'cache-control': 'no-cache',
        },
    })
};

export const getPost = async (data, cache, domainName, idOrTitleForUnCacheRequest) => {
    const cacheHandler = cache ? '' : `&time=${ Date.now() }`
    const body = {
        ...data,
    };
    return await axios.post(domainName + `/api/v1/posts/post?id=${ idOrTitleForUnCacheRequest }` + cacheHandler, body)
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
    return await axios.post(domainName + `/api/v1/posts/getMeta?pageNo=${ data.page }&type=${ data.type }&keyword=${ data.keyword }&startWith=${ data.startWith }`, body)
};
export const deleteMeta = async (id, domainName) => {
    const body = {
        _id:id,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/deleteMeta`, body)
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

export const deleteComments = async (data, domainName) => {
    const body = {
        commentsIds: data,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/deleteComments`, body)
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
    return await axios.post(window.location.origin + '/api/v1/posts/export', body)
};


