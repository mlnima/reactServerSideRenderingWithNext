import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestBackupMetas  = async (data:any)=>{
    return await AxiosInstance.post(`/api/admin/backups/metas`,{
        token:localStorage.wt,
        ...data
    },{
        responseType:'blob'
    })
}