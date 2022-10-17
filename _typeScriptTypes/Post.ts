import {Comment} from "../_typeScriptTypes/Comment";
import {User} from "../_typeScriptTypes/User";
import {Meta} from "../_typeScriptTypes/Meta";

export interface Post {
    outPostType?: string;
    images?: [string];
    rating: string;
    videoEmbedCode: string,
    videoUrl: string,
    videoScriptCode: string,
    format: string,
    comments:Comment[],
    author?:  User | string,
    status: string,
    source: any,
    updatedAt: string,
    createdAt: string,
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