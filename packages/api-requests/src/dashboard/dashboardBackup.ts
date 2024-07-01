import AxiosInstance from "../lib/AxiosInstance";

interface IProps{
    metaType : string,
    fields:string[],
    limit:number
}
export const dashboardAPIRequestBackupMetas = async ({ metaType, fields, limit }:IProps) => {
    return await AxiosInstance.get(`/api/dashboard/backups/metas`, {
        responseType: 'blob',
        params: {
            metaType,
            fields,
            limit
        },
    });
};