import {Comment} from "@repo/typescript-types";

export interface CommentsState {
    comments: Comment[],
    comment: Comment,
    totalCount:number
}