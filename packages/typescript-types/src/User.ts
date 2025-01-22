import { IFile } from './IFile';
import { getLoadedUserPageData } from 'web-application/app/lib/database/operations/users';

export interface User {
  draftPost: string | {};
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
  verificationToken: string;
  age: number;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  following: string[];
  posts: string[];
  followers: string[];
  blockList: string[];
  conversation: string[];
  profileImage: IFile;
  gender: string;
  relationshipStatus: string;
  city: string;
  country: string;
  status: string;
  keyMaster: boolean;
  createdAt: Date,
  updatedAt: Date,
}

// export interface IUserPageData {
//   isBlockedByTargetUser: boolean;
//   isFollowedByTargetUser: boolean;
//   isBlocked: boolean;
//   isFollowed: boolean;
//   followersCount?: number | undefined;
//   followingCount?: number | undefined;
//   postsCount?: number | undefined,
//   profileImage?: string | {
//     _id: string,
//     filePath: string
//   },
//   username: string,
//   about: string,
//   _id: string,
// }

export interface IInitialUserPageData {
  followersCount?: number | undefined;
  followingCount?: number | undefined;
  postsCount?: number | undefined,
  profileImage?: string | {
    _id: string,
    filePath: string
  },
  username: string,
  about: string,
  _id: string,
}
export interface ILoadedUserPageData {
  isBlockedByTargetUser?: boolean;
  isFollowedByTargetUser?: boolean;
  isBlocked?: boolean;
  isFollowed?: boolean;
}

export interface IUserPageData extends  IInitialUserPageData , ILoadedUserPageData{};

export interface JWTPayload{
  "username": string,
  "_id": string,
  "iat": number,
  "exp": number
}

export type TToken = string | null