

export interface PostTypes {
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
    actors?:object[],
    quality?:string,
    _id?:string,
    mainThumbnail?:string,
    VideoTrailerUrl?:string,
    categories:object[],
    tags:object[]
}

