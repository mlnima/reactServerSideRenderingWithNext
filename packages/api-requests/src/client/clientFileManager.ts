import { getAxiosInstance } from '../lib/AxiosInstance';

const FileServerAxiosInstance = getAxiosInstance('fileServer');

export const clientAPIRequestUploadImage = async (formData) => {
    return await FileServerAxiosInstance.post(`/files/v1/upload/uploadImage`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}
