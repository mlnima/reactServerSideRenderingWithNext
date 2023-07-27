import {FC} from "react";
import styled from "styled-components";
import PostsCardsRenderer from "../../../../includes/cards/CardsRenderer/PostsCardsRenderer";
import {useAppSelector} from "@store_toolkit/hooks";

const RelatedPostsRendererStyledDiv = styled.div`
  width: 100%;
  
  h2 {
   
    box-sizing: border-box;
    margin: 0;
  }
`

const RelatedPostsRenderer: FC = () => {

    const relatedPosts = useAppSelector((store ) => {
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


