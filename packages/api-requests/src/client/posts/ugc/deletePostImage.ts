import AxiosInstance from "../../../lib/AxiosInstance";

const deletePostImage = async (deletingData) => {
    return AxiosInstance.post('/api/v1/fileManager/ugc_postImageDelete', deletingData)
}

export default deletePostImage;