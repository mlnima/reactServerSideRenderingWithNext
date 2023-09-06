import {FC} from "react";
import './RelatedPostsRenderer.styles.scss';
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer";
import {Post} from "typescript-types";

interface IProps{
    locale:string,
    relatedPosts: {
        actorsRelatedPosts: {}[],
        categoriesRelatedPosts: {}[],
        tagsRelatedPosts: {}[]
    },
    dictionary: {
        [key: string]: string
    },
}
const RelatedPostsRenderer: FC<IProps> = ({relatedPosts,locale,dictionary}) => {

    //must be edited after testing and send the project to production
    const combinedRelatedPosts = [
        ...(relatedPosts.actorsRelatedPosts || []),
        ...(relatedPosts.categoriesRelatedPosts || []),
        ...(relatedPosts.tagsRelatedPosts || []),
    ] as Post []

    return (
        <div id={'relatedPosts'}>
            {combinedRelatedPosts?.length > 0 && <>
                <h2 className={'sub-content'}>{dictionary?.['Related Posts'] || 'Related Posts'}</h2>
                <PostsCardsRenderer posts={combinedRelatedPosts} locale={locale}/>
            </>}
        </div>
    )
};
export default RelatedPostsRenderer