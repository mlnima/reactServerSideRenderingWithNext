import AxiosInstance from "../../../lib/AxiosInstance";

const UploadPostImages = async (uploadData) => {
    return AxiosInstance.post('/api/v1/fileManager/ugc_postImagesUpload', uploadData)
}

export default UploadPostImages;