import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestGetPage = async (pageName) => {
    return await AxiosInstance.get(`/api/v1/pages/getPage?pageName=${pageName}`);
}
