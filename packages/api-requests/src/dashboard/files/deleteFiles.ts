import AxiosInstance from "../../lib/AxiosInstance";

const deleteFiles = async (ids) => {
    const params = new URLSearchParams({ids: ids.join(',')});
    return await AxiosInstance.delete('/files/admin/fileManager/deleteFile', {
            params,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.wt}`,
            },
        }
    )
}

export default deleteFiles;


