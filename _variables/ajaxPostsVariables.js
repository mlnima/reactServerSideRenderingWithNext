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

export const getPosts = async (data, domainName,cache,queriesData) => {
  console.log(queriesData)
  console.log('nothing')
    const body = {
        ...data,
        cache
    };
  //?requestFor=${encodeURIComponent(queriesData)}
    return await axios.post(domainName +`/api/v1/posts?requestFor=${encodeURIComponent(queriesData)}`, body)
};

export const getPost = async (data, domainName, cache) => {
    const body = {
        ...data,
        cache
    };
    return await axios.post(domainName + `/api/v1/posts/post?id=${ data._id }` , body)
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

export const getMeta = async (data,  domainName,cache) => {
    const body = {
        ...data,
        cache
    };
    return await axios.post(domainName + `/api/v1/posts/getMeta?pageNo=${ data.page }&type=${ data.type }&keyword=${encodeURIComponent(data.keyword)  }&startWith=${ data.startWith }`, body)
};

export const getSingleMeta = async (id,  domainName,cache) => {
    const body = {
        id,
        cache
    };
    return await axios.post(domainName + `/api/v1/posts/getSingleMeta?id=${ id }`, body)
};


export const updateMeta = async (data,  domainName) => {
    const body = {
        data,
    };
    return await axios.post(domainName + `/api/v1/posts/updateMeta`, body)
};





export const deleteMeta = async (id, domainName) => {
    const body = {
        _id:id,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/deleteMeta`, body)
};



export const bulkAction = async (domainName,type,status,ids) =>{
    const body = {
        type,
        status,
        ids,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/v1/posts/bulkAction`, body)
}





export const newComment = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + `/api/v1/posts/newComment`, body)
};

export const getComments = async (data, domainName, cache) => {
    const body = {
        ...data,
        cache
    };
    return await axios.post(domainName + `/api/v1/posts/getComments?onDocument=${data.onDocument}`, body)
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


