import FileServerAxiosInstance from "../../lib/FileServerAxiosInstance";

const uploadImage = async (formData) => {
    return await FileServerAxiosInstance.post(`/files/v1/upload/uploadImage?token=${localStorage.wt}`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export default uploadImage;