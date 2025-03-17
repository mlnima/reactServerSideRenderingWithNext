




export interface IPageSettings{
    title?:string,
    description?:string,
    keywords?:string,
    sidebar:string,
    customStyles?:string,
    translations?:{
        [key: string]:{
            title: string,
            keywords: string,
            description: string,
        }
    }
}