import FileServerAxiosInstance from "../../lib/FileServerAxiosInstance";

const uploadImage = async (formData) => {
    return await FileServerAxiosInstance.post(`/files/v1/upload/uploadImage`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    })
}

export default uploadImage;