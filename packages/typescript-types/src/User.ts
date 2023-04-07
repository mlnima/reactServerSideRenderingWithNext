import { IFile } from "./IFile";

export interface User {
    draftPost: string;
    _id: string;
    username: string;
    email: string;
    password: string;
    role?: string;
    firstName: string;
    lastName: string;
    nickName: string;
    about: string;
    API_KEY: string;
    uuid: string;
    age: number;
    followingCount: number;
    followersCount: number;
    postsCount: number;
    following: string[];
    posts: string[];
    followers: string[];
    blockList: string[];
    conversation: string[];
    profileImage: IFile ;
    gender: string;
    relationshipStatus: string;
    city: string;
    country: string;
    status: string;
    keyMaster: boolean;
}