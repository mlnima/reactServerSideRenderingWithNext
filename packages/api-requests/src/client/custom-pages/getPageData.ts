import AxiosInstance from "../../lib/AxiosInstance";

const getPageData = async (pageName) => {
    return await AxiosInstance.get(`/api/v1/pages/getPageData?pageName=${pageName}`);
}

export default getPageData;