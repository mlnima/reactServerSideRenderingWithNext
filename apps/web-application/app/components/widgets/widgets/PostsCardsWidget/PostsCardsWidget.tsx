import {FC} from "react";
import {Post} from "typescript-types";
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer"

interface IProps{
    isSidebar?:boolean,
    locale: string,
    uniqueData?: {
        posts: Post[],
        totalCount: number
    }
}

const PostsCardsWidget: FC<IProps> =({locale,uniqueData,isSidebar})=>{
    return <PostsCardsRenderer isSidebar={isSidebar}  locale={locale} posts={uniqueData?.posts} />
}

export default PostsCardsWidget;