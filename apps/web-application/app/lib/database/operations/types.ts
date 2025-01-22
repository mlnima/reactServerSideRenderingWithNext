import { Meta, Post } from '@repo/typescript-types';
import { TToken } from '@repo/typescript-types/src/User';
import { getEditingPost, ratePost, updatePost } from '@lib/database/operations/posts';

export interface IOGetPost {
  post?: Post | null;
  relatedPosts: Post[] | null;
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

export interface IOGetPosts {
  posts: Post[] | null;
  totalCount?: number | null;
  meta?: Meta | null;
}

export interface INewComment {
  commentData: {
    body: string;
    onDocumentId: string;
    author: string;
  };
}

export interface IDeleteComments {
  ids: string[];
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

interface IGetSearch {
  sort?: string;
  locale?: string;
  keyword?: string;
  page?: number;
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