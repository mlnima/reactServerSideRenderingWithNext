import { IMeta, IPost } from '@repo/typescript-types';
import { TToken } from '@repo/typescript-types/src/User';

export interface IOGetPost {
  post?: IPost | null;
  relatedPosts: IPost[] | null;
}

export type IGetComments = {
  onDocument: string | null | undefined;
  skip?: number;
  limit?: number;
};

export interface IGetPosts {
  locale: string;
  metaId?: string;
  postType?: string;
  count?: number;
  page?: number;
  sort?: string;
  author?: string;
  status?: string;
  returnPosts?: boolean;
  returnTotalCount?: boolean;
}


export interface IGetUserPagePosts {
  authorId: string;
  status?: string;
  skip?: number;
  totalCount?: boolean;
}

export interface IDeletePostByAuthor {
  postId: string,
  token: string
}



export interface INewPost {
  token: TToken;
  newPost: object;
}

export interface IGetEditingPost {
  token: TToken;
  _id: string;
}

export interface IUpdatePost {
  token: TToken;
  data: string;
}

export interface IRatePost{
  token: TToken;
  type: string;
  _id: string;
}

export interface IUpdatePosts{
  ids: string[],
  status: string,
}
export interface IUpdateMetas{
  ids: string[],
  status: string,
  type?:'actors' | 'categories' | 'tags'
}