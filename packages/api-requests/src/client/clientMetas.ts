import AxiosInstance from "../lib/AxiosInstance";

interface IGetMetasCurrentQuery{
    sort?:string,
    keyword?:string,
    startWith?:string,
    size?:string,
    page?:string,
    lang?:string,
}

export const  clientAPIRequestGetMetaSuggestion = async (type: string, startWith: string) => {
    return await AxiosInstance.get(`/api/v1/post/edit/metaSuggestion`,{
        params:{
            startWith,
            type
        }
    })
}


export const  clientAPIRequestResetMetaImage = async (_id: string) => {
    const body = {
        _id,
        token: localStorage.wt
    };
    return await AxiosInstance.post('/api/v1/meta/resetMetaImage', body)
}

export const  getMeta = async (_id: string) => {
    return await AxiosInstance.get('/api/v1/meta', {
        params:{
            _id
        }
    })
}




interface IGetTagsQuery{
    sort?:string,
    keyword?:string,
    startWith?:string,
    size?:string,
    page?:string,
    lang?:string,
}

