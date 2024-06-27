import AxiosInstance, {getAxiosInstance} from '../lib/AxiosInstance';

const FileServerAxiosInstance = getAxiosInstance('fileServer');



export const clientAPIRequestUploadImage = async (formData: FormData) => {
    return await AxiosInstance.post(`/api/v1/fileManager/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}


export const clientAPIRequestUploadPostImages = async (formData: FormData) => {
    return await AxiosInstance.post(`/api/v1/fileManager/uploadPostImages`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}

export const clientAPIRequestUploadProfileImage = async (formData: FormData) => {
    return await AxiosInstance.post(`/api/v1/fileManager/uploadProfileImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}

interface IDeletePostImage {
    postId: string,
    imageId: string
    thumbnailToReplace?: string
}

export const clientAPIRequestDeletePostImage = async ({postId, imageId, thumbnailToReplace}: IDeletePostImage) => {
    const queries = new URLSearchParams({postId, imageId, thumbnailToReplace}).toString();
    return await AxiosInstance.delete(`/api/v1/fileManager/deletePostImage?${queries}`);
}

interface IDeletePostImages {
    postId?: string
}

export const clientAPIRequestDeletePostImages = async ({postId}: IDeletePostImages) => {
    return await AxiosInstance.delete(`/api/v1/fileManager/deletePostImages?postId=${postId}`);
}


