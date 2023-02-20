import AxiosInstance from "../../lib/AxiosInstance";

const backupMetas  = async (data:any)=>{
   return await AxiosInstance.post(`/api/admin/backups/metas`,{
       token:localStorage.wt,
       ...data
   },{
       responseType:'blob'
   })
}

export default backupMetas;