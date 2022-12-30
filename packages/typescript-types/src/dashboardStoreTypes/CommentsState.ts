import {Comment} from "typescript-types";

export interface CommentsState {
    comments: Comment[],
    comment: Comment
}