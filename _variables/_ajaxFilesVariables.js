import axios from 'axios'

export const readPath = path => {
    let body = {
        path,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/readPath', body)
};

export const readFile = path => {
    let body = {
        path,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/readFile', body)
};

export const readTranslationsFile = path => {
    let body = {
        path,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/readTranslationsFile', body)
};
export const updateTranslationsFile = (path, data) => {
    let body = {
        path,
        data,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/updateTranslationsFile', body)
};


export const deleteFile = filePath => {
    let body = {
        filePath,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/deleteFile', body)
};


export const actionOnFiles = (_what, clickedItems, _do, pathTo) => {
    let body = {
        _what,
        clickedItems,
        _do,
        pathTo,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/server/files/admin-actionOnFiles', body)
};

export const newFolder = (folderName, folderPath) => {

    let body = {
        folderName,
        folderPath,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/server/files/admin-newFolder', body)
};

export const newFile = (fileName, filePath) => {
    let body = {
        fileName,
        filePath,
        token: localStorage.wt
    };
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/server/files/admin-newFile', body)
};