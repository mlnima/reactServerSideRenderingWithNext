import AxiosInstance from "../lib/AxiosInstance";

export const dashboardAPIRequestCreateFile = async (fileName:string, filePath:string)=>{
    return await AxiosInstance.post('/expressServer/files/admin-newFile',{fileName, filePath,token: localStorage.wt})
}

export const dashboardAPIRequestCreateFileOrFolder = async (data:{})=>{
    return await AxiosInstance.post('/expressServer/files/admin-newFolder',{data,token: localStorage.wt})
}

export const dashboardAPIRequestCreateFolder = async (folderName:string,folderPath:string)=>{
    return await AxiosInstance.post('/expressServer/files/admin-newFolder',{folderName,folderPath,token: localStorage.wt})
}

export const dashboardAPIRequestDeleteFile = async (filePath:string)=>{
    return await AxiosInstance.post('/api/dashboard/file/delete/file',{filePath,token: localStorage.wt})
}

export const dashboardAPIRequestReadPath = async (path:string)=>{
    return await AxiosInstance.post('/api/dashboard/file/readPath',{path,token: localStorage.wt})
}

export const dashboardAPIRequestReadTranslationFile = async (path:string)=>{
    return await AxiosInstance.get('/api/dashboard/file/translationFile',{
        params:{
            path
        }
    })
}

export const dashboardAPIRequestUpdateTranslationFile = async (path:string, data:{})=>{
    return await AxiosInstance.put('/api/dashboard/file/translationFile',{path, data,token: localStorage.wt})
}

export const dashboardAPIRequestUploadFile = async (file:FormData)=>{
    return await AxiosInstance.post('/api/dashboard/file/upload/file',file)
}

