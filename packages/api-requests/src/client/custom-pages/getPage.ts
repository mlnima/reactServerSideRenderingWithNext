import AxiosInstance from "../../lib/AxiosInstance";

const getPage = async (pageName) => {
    return await AxiosInstance.get(`/api/v1/pages/getPage?pageName=${pageName}`);
}

export default getPage;