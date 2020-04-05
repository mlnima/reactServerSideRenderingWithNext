import axios from 'axios'

export const readPath = (path)=>{
    let body = {
        path,
        token: localStorage.wt
    };
    return axios.post(window.location.origin +'/api/v1/settings/fileManagerControllers-readPath',body)
};


export const deleteFile = (filePath)=>{
    let body = {
        filePath,
        token: localStorage.wt
    };
    return axios.post(window.location.origin +'/server/files/admin-deleteFile',body)
};

export const actionOnFiles = (_what,clickedItems,_do,pathTo)=>{
    let body = {
        _what,
        clickedItems,
        _do,
        pathTo,
        token: localStorage.wt
    };
    return axios.post(window.location.origin +'/server/files/admin-actionOnFiles',body)
};

export const newFolder = (folderName,folderPath)=>{

    let body = {
        folderName,
        folderPath,
        token: localStorage.wt
    };
    return axios.post(window.location.origin +'/server/files/admin-newFolder',body)
};
export const newFile = (fileName,filePath)=>{

    let body = {
        fileName,
        filePath,
        token: localStorage.wt
    };
    return axios.post(window.location.origin +'/server/files/admin-newFile',body)
};