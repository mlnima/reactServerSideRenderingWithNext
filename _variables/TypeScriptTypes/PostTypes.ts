

export interface PostTypes {
    translations?:{
        [key:string] :{
            title?:string
            description?:string
        }
    },
    postType?:string,
    views?:number
    title?:string,
    likes?:number,
    disLikes?:number,
    redirectLink?:string
    videoTrailerUrl?:string,
    price?:string,
    duration?:string,
    actors?:object[],
    quality?:string,
    _id?:string,
    mainThumbnail?:string
}

