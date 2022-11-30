import AxiosInstance from "../../lib/AxiosInstance";

const resetMetaImage = async (_id: string) => {
    const body = {
        _id,
        token: localStorage.wt
    };
    return await AxiosInstance.post('/api/v1/posts/resetMetaImage', body)
}

export default resetMetaImage;