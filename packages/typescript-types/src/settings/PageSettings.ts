export interface PageSettings{
    title?:string,
    description?:string,
    keywords?:string,
    sidebar:boolean,
    themeColor?: string,
    customStyles?:string,
    customScriptsAsString?: string,
    translations?:{
        [key: string]:{
            title: string,
            keywords: string,
            description: string,
        }
    }
}