import {FC} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import PostsCardsRenderer from "../../../../includes/cards/CardsRenderer/PostsCardsRenderer";
import {Store} from "typescript-types";

const RelatedPostsRendererStyledDiv = styled.div`
  width: 100%;
  
  h2 {
   
    box-sizing: border-box;
    margin: 0;
  }
`

const RelatedPostsRenderer: FC = () => {

    const relatedPosts = useSelector((store: Store) => {
        return [
            ...store?.posts?.relatedPosts.actorsRelatedPosts,
            ...store?.posts?.relatedPosts.categoriesRelatedPosts,
            ...store?.posts?.relatedPosts.tagsRelatedPosts,
        ]
    });

    return (
        <RelatedPostsRendererStyledDiv >
            {!!relatedPosts?.length && <>
                <h2 className={'sub-content'}>Related</h2>
                <PostsCardsRenderer posts={relatedPosts}/>
            </>}
        </RelatedPostsRendererStyledDiv>
    )
};
export default RelatedPostsRenderer


