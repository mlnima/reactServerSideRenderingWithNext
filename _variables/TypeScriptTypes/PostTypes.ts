import {MetasPropTypes} from './GlobalTypes'

export interface PostTypes {
    updatedAt: string;
    url?: string | undefined;
    currency: string;
    downloadLink: string;
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
    actors?:MetasPropTypes[],
    quality?:string,
    _id?:string,
    mainThumbnail?:string,
    VideoTrailerUrl?:string,
    categories:MetasPropTypes[],
    tags:MetasPropTypes[]
}

