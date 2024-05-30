import AxiosInstance, {getAxiosInstance} from '../lib/AxiosInstance';

const FileServerAxiosInstance = getAxiosInstance('fileServer');



export const clientAPIRequestUploadImage = async (formData: FormData) => {
    return await AxiosInstance.post(`/files/v1/upload/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}


export const clientAPIRequestUploadPostImages = async (formData: FormData) => {
    return await AxiosInstance.post(`/files/v1/upload/uploadPostImages`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}

export const clientAPIRequestUploadProfileImage = async (formData: FormData) => {
    return await AxiosInstance.post(`/files/v1/upload/uploadProfileImage`, formData, {
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
    return await AxiosInstance.delete(`/files/v1/upload/deletePostImage?${queries}`);
}

interface IDeletePostImages {
    postId?: string
}

export const clientAPIRequestDeletePostImages = async ({postId}: IDeletePostImages) => {
    return await AxiosInstance.delete(`/files/v1/upload/deletePostImages?postId=${postId}`);
}


