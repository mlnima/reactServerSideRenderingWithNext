import {Comment} from "./Comment";
import {User} from "./User";
import {Meta} from "./Meta";

interface uniqueDataPossibility{
    startDate?: Date | string;
    endDate?: Date | string;
    capacity?: number;
    attenders?: string[];
}


interface Base {
    outPostType?: string,
    images?: [string],
    rating: string,
    videoEmbedCode: string,
    videoUrl: string,
    videoScriptCode: string,
    format: string,
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
    quality?:string,
    _id?:string,
    mainThumbnail?:string,
    thumbnail?:{
        _id:string,
        filePath:string
    },
    VideoTrailerUrl?:string,
    uniqueData: uniqueDataPossibility;
}

export interface Post extends Base{
    author?:  User,
    comments:Comment[],
    actors?:Meta[],
    categories:Meta[],
    tags:Meta[],
}

export interface PostRaw extends Base{
    author?:  string,
    comments:string[],
    actors?:string[],
    categories:string[],
    tags:string[],
}