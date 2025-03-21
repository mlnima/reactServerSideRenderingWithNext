import {IComment} from "./Comment";
import {User} from "./User";
import {IMeta} from "./Meta";

interface uniqueDataPossibility{
    startDate?: Date | string;
    endDate?: Date | string;
    capacity?: number;
    attenders?: string[];
}


interface Base {
    outPostType?: string,
    images?: string[],
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
    priceType?:string,
    duration?:string,
    quality?:string,
    _id:string,
    mainThumbnail?:string,
    thumbnail?:{
        _id:string,
        filePath:string
    },
    VideoTrailerUrl?:string,
    uniqueData: uniqueDataPossibility;
}

export interface IPost extends Base{
    author?:  User,
    comments:IComment[],
    actors?:IMeta[],
    categories:IMeta[],
    tags:IMeta[],
}

export interface PostRaw extends Base{
    author?:  string,
    comments:string[],
    actors?:string[],
    categories:string[],
    tags:string[],
}