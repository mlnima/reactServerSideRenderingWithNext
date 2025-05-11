import AxiosInstance from '../lib/AxiosInstance';



export const dashboardAPIRequestCheckAndRemoveDeletedVideos = async () => {
    return await AxiosInstance.get(
        `/api/dashboard/posts/checkAndRemoveDeletedVideos`,
    );
};

export const dashboardAPIRequestCreateNewPost = async (postData: {}) => {
    return await AxiosInstance.post('/api/dashboard/post', {
        postData,
        token: localStorage.wt,
    });
};

export const dashboardAPIRequestExportPosts = async (data: {}) => {
    return await AxiosInstance.post('/api/dashboard/posts/export', {
        data,
        token: localStorage.wt,
    });
};

export const dashboardAPIRequestGeneratePermaLinkForPosts = async (
    type: string,
) => {
    return await AxiosInstance.get(
        `/api/dashboard/posts/generatePermaLinkForPosts${type ? `&type=${type}` : ''}`,
    );
};





export const dashboardAPIRequestPostDataScrappers = async (
    urlToScrap: string,
) => {
    return await AxiosInstance.post('/api/dashboard/scrapper/postDataScrappers', {
        urlToScrap
    });
};

export const dashboardAPIRequestFindAnotherSimilarSourceLink = async (
    postId: string,
    relatedBy?: string,
    page?: number,
) => {
    return await AxiosInstance.get(
        `/api/dashboard/scrapper/findAnotherSimilarSourceLink?postId=${postId}${
            relatedBy ? `&relatedBy=${relatedBy}` : ''
        }${page ? `&page=${page}` : ''}`,
    );
};


