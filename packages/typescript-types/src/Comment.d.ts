import { Post } from "./Post";
import { User } from "./User";
interface Base {
    _id?: string;
    createdAt?: Date;
    likes?: number;
    disLikes?: number;
    body: string;
    status?: string;
}
export interface Comment extends Base {
    author: User;
    onDocumentId: Post;
    _id: string;
    reply?: [Comment];
}
export interface CommentRaw extends Base {
    onDocumentId: string;
    author: string;
    reply?: [string];
}
export interface NewComment extends Base {
    body: string;
    author: string;
    onDocumentId: string;
}
export {};
//# sourceMappingURL=Comment.d.ts.map