import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestBulkActionOnPosts = async (ids, status)=>{
    return await AxiosInstance.post('/api/admin/posts/postsBulkAction',{ids, status,token: localStorage.wt})
}

export const dashboardAPIRequestCheckAndRemoveDeletedVideos = async ()=>{
    return await AxiosInstance.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`)
}


export const dashboardAPIRequestCreateNewPost = async (postData)=>{
    return await AxiosInstance.post('/api/admin/posts/createNewPost',{postData,token: localStorage.wt})
}

export const dashboardAPIRequestExportPosts = async (data)=>{
    return await AxiosInstance.post('/api/admin/posts/exportPosts',{data,token: localStorage.wt})
}


export const dashboardAPIRequestGeneratePermaLinkForPosts = async (type)=>{
    return await AxiosInstance.get(`/api/admin/posts/generatePermaLinkForPosts?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
}

export const dashboardAPIRequestGetPost  = async (_id:string)=>{
    return await AxiosInstance.get(`/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`)
}


export const dashboardAPIRequestGetPosts = async (queriesData)=>{
    return await AxiosInstance.get(`/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestPostDataScrappers = async (urlToScrap)=>{

    return await AxiosInstance.post('/api/admin/posts/postDataScrappers',{urlToScrap,token: localStorage.wt})

};

export const dashboardAPIRequestScrapYoutubeInfo = async (url)=>{
    return await AxiosInstance.post('/api/admin/scrapper/scrapYoutubeInfo',{url,token: localStorage.wt})
}


export const dashboardAPIRequestUpdatePost = async (postData)=>{
    return await AxiosInstance.post('/api/admin/posts/updatePost',{postData,token: localStorage.wt})
}