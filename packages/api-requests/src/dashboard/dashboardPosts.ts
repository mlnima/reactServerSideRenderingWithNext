import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestBulkActionOnPosts = async (ids: string[], status:string)=>{
    return await AxiosInstance.post('/api/admin/posts/postsBulkAction',{ids, status,token: localStorage.wt})
}

export const dashboardAPIRequestCheckAndRemoveDeletedVideos = async ()=>{
    return await AxiosInstance.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`)
}


export const dashboardAPIRequestCreateNewPost = async (postData:{})=>{
    return await AxiosInstance.post('/api/admin/posts/createNewPost',{postData,token: localStorage.wt})
}

export const dashboardAPIRequestExportPosts = async (data:{})=>{
    return await AxiosInstance.post('/api/admin/posts/exportPosts',{data,token: localStorage.wt})
}


export const dashboardAPIRequestGeneratePermaLinkForPosts = async (type:string)=>{
    return await AxiosInstance.get(`/api/admin/posts/generatePermaLinkForPosts?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
}

export const dashboardAPIRequestGetPost  = async (_id:string)=>{
    return await AxiosInstance.get(`/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`)
}


export const dashboardAPIRequestGetPosts = async (queriesData:string)=>{
    return await AxiosInstance.get(`/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`)
}

export const dashboardAPIRequestPostDataScrappers = async (urlToScrap:string)=>{
    return await AxiosInstance.post('/api/admin/posts/postDataScrappers',{urlToScrap,token: localStorage.wt})
};

export const dashboardAPIRequestFindAnotherSimilarSourceLink = async (postId:string,relatedBy?:string,page?:number)=>{
    return await AxiosInstance.get(
        `/api/admin/posts/findAnotherSimilarSourceLink?postId=${
            postId
        }${
            relatedBy ? `&relatedBy=${relatedBy}`:''
        }${
            page ? `&page=${page}`:''
        }`
    )
};

export const dashboardAPIRequestScrapYoutubeInfo = async (url:string)=>{
    return await AxiosInstance.post('/api/admin/scrapper/scrapYoutubeInfo',{url,token: localStorage.wt})
}


export const dashboardAPIRequestUpdatePost = async (postData:{})=>{
    return await AxiosInstance.post('/api/admin/posts/updatePost',{postData,token: localStorage.wt})
}