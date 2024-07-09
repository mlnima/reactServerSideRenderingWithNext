import AxiosInstance from '../lib/AxiosInstance';


// export const clientAPIRequestUploadImage = async (formData: FormData) => {
//     return await AxiosInstance.post(`/api/v1/fileManager/uploadImage`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.wt}`,
//         },
//     })
// }


export const clientAPIRequestUploadPostImages = async (formData: FormData) => {
    return await AxiosInstance.post(`/api/v1/file/upload/postImages`, formData, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: `Bearer ${localStorage.wt}`,
        // },
    })
}

export const clientAPIRequestUploadProfileImage = async (formData: FormData) => {
    return await AxiosInstance.patch(`/api/v1/file/upload/profileImage`, formData, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
    })
}

interface IDeletePostImage {
    postId: string,
    imageId: string
    thumbnailToReplace?: string
}

export const clientAPIRequestDeletePostImage = async ({postId, imageId, thumbnailToReplace}: IDeletePostImage) => {
    const queries = new URLSearchParams({postId, imageId, thumbnailToReplace}).toString();
    return await AxiosInstance.delete(`/api/v1/file/delete/postImage?${queries}`);
}

interface IDeletePostImages {
    postId?: string
}

export const clientAPIRequestDeletePostImages = async (_id:string) => {
    return await AxiosInstance.delete(`/api/v1/file/delete/postImages`,{
        params:{
            _id
        }
    });
}


