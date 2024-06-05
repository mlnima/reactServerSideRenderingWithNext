import { Post } from "../Post";
import { Meta } from "../Meta";
export interface PostsState {
    post?: Post;
    totalCount: number;
    posts?: Post[];
    meta?: Meta;
    metas?: Meta[];
    activeEditingLanguage: string;
}
//# sourceMappingURL=PostsState.d.ts.map