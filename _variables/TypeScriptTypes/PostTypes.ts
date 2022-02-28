import {Meta, MetasPropTypes,User} from './GlobalTypes'

export interface Comment{
    onDocumentId: string,
    _id:string,
    author:string,
    reply:[],
    likes:number,
    disLikes:number,
    body: string,
    status:string
}

export interface PostTypes {
    comments:Comment[],
    author:User,
    status: string,
    source: any,
    updatedAt: string,
    url?: string | undefined,
    currency: string,
    downloadLink: string,
    downloadLinks: {url:string,title:string}[],
    description: string | object,
    translations?:{
        [key:string] :{
            title?:string
            description?:string | object
        }
    },
    postType?:string,
    views?:number,
    title?:string,
    likes?:number,
    disLikes?:number,
    redirectLink?:string,
    videoTrailerUrl?:string,
    price?:string,
    duration?:string,
    actors?:Meta[],
    quality?:string,
    _id?:string,
    mainThumbnail?:string,
    VideoTrailerUrl?:string,
    categories:Meta[],
    tags:Meta[]
}

