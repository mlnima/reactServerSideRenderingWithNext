import {User} from "./User";

interface Base {
    _id?: string,
    createdAt: Date | number,
    updatedAt ?: string
    likes?: number,
    disLikes?: number,
    body: string,
    status?: string
}

export interface IComment extends Base {
    author:  User,
    onDocumentId:  string,
    _id:  string,
    reply?: [IComment]
}

export interface CommentRaw extends Base {
    _id: string;
    onDocumentId: string ,
    author: string ,
    reply?: [string]
}

export interface NewComment extends Base {
    body: string,
    author: string,
    onDocumentId: string,
}

