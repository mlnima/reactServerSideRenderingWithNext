import {Post} from "@_typeScriptTypes/Post";
import {User} from "@_typeScriptTypes/User";

export interface Comment {
    _id: string,
    onDocumentId:  Post,
    author:  User,
    createdAt: Date,
    reply: [Comment],
    likes?: number,
    disLikes?: number,
    body: string,
    status: string
}

export interface CommentRaw {
    _id: string,
    onDocumentId: string ,
    author: string ,
    createdAt: Date,
    reply: [string],
    likes?: number,
    disLikes?: number,
    body: string,
    status: string
}