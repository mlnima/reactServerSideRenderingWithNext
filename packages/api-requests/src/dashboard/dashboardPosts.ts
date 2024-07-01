import AxiosInstance from '../lib/AxiosInstance';

export const dashboardAPIRequestBulkActionOnPosts = async (
    ids: string[],
    status: string,
) => {
    return await AxiosInstance.patch('/api/dashboard/posts', {
        ids,
        status,
        token: localStorage.wt,
    });
};

export const dashboardAPIRequestCheckAndRemoveDeletedVideos = async () => {
    return await AxiosInstance.get(
        `/dashboard/posts/checkAndRemoveDeletedVideos`,
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

export const dashboardAPIRequestGetPost = async (_id: string) => {
    return await AxiosInstance.get(
        `/api/dashboard/post?_id=${_id}`,
    );
};

export const dashboardAPIRequestGetPosts = async (queriesData: string) => {
    return await AxiosInstance.get(
        `/api/dashboard/posts${queriesData}`,
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

export const dashboardAPIRequestScrapYoutubeInfo = async (url: string) => {
    return await AxiosInstance.post('/api/dashboard/scrapper/scrapYoutubeInfo', {
        url,
        token: localStorage.wt,
    });
};

export const dashboardAPIRequestUpdatePost = async (postData: {}) => {
    return await AxiosInstance.put('/dashboard/post', {
        postData
    });
};
