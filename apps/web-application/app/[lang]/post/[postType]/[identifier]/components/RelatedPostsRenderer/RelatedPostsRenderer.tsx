import {FC} from "react";
import './RelatedPostsRenderer.scss';
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer";
import {Post} from "typescript-types";

interface IProps{
    locale:string,
    relatedPosts: Post[],
    dictionary: {
        [key: string]: string
    },
}
const RelatedPostsRenderer: FC<IProps> = ({relatedPosts,locale,dictionary}) => {

    return (
        <div id={'relatedPosts'}>
            <div className={'relatedPostsHeader'}>
                <h2 className={'sub-content'}>{dictionary?.['Related Posts'] || 'Related Posts'}</h2>
            </div>
            {relatedPosts?.length > 0 &&
                <PostsCardsRenderer posts={relatedPosts} locale={locale}/>
            }
        </div>
    )
};
export default RelatedPostsRenderer