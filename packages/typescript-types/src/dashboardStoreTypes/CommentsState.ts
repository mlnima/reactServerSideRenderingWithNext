import {IComment} from "@repo/typescript-types";

export interface CommentsState {
    comments: IComment[],
    comment: IComment,
    totalCount:number
}