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
    return await AxiosInstance.post('/api/admin/fileManager/deleteFile',{filePath,token: localStorage.wt})
}

export const dashboardAPIRequestReadPath = async (path:string)=>{
    return await AxiosInstance.post('/api/admin/fileManager/readPath',{path,token: localStorage.wt})
}

export const dashboardAPIRequestReadTranslationFile = async (path:string)=>{
    return await AxiosInstance.post('/api/admin/fileManager/readTranslationsFile',{path,token: localStorage.wt})
}

export const dashboardAPIRequestUpdateTranslationFile = async (path:string, data:{})=>{
    return await AxiosInstance.post('/api/admin/fileManager/updateTranslationsFile',{path, data,token: localStorage.wt})
}

export const dashboardAPIRequestUploadFile = async (file:File)=>{
    return await AxiosInstance.post('/api/admin/fileManager/uploadFile',file)
}

//** did not find any usage
// const deleteFiles = async (ids) => {
//     const params = new URLSearchParams({ids: ids.join(',')});
//     return await AxiosInstance.delete('/files/admin/fileManager/deleteFile', {
//             params,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${localStorage.wt}`,
//             },
//         }
//     )
// }