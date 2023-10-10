import {FC} from "react";
import './RelatedPostsRenderer.styles.scss';
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer";
import {Post} from "typescript-types";
import {uniqArrayBy} from "custom-util";

interface IProps{
    locale:string,
    // relatedPosts: {
    //     actorsRelatedPosts: {}[],
    //     categoriesRelatedPosts: {}[],
    //     tagsRelatedPosts: {}[]
    // },
    relatedPosts: Post[],
    dictionary: {
        [key: string]: string
    },
}
const RelatedPostsRenderer: FC<IProps> = ({relatedPosts,locale,dictionary}) => {

    //must be edited after testing and send the project to production
    // const combinedRelatedPosts =uniqArrayBy([
    //     ...(relatedPosts.actorsRelatedPosts || []),
    //     ...(relatedPosts.categoriesRelatedPosts || []),
    //     ...(relatedPosts.tagsRelatedPosts || []),
    // ] as Post [],'_id') as Post []

    return (
        <div id={'relatedPosts'}>
            {relatedPosts?.length > 0 && <>
                <h2 className={'sub-content'}>{dictionary?.['Related Posts'] || 'Related Posts'}</h2>
                <PostsCardsRenderer posts={relatedPosts} locale={locale}/>
            </>}
        </div>
    )
};
export default RelatedPostsRenderer