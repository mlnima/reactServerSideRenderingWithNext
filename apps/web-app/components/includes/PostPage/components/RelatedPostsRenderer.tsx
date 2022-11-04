import {FC} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import PostsCardsRenderer from "../../cards/CardsRenderer/PostsCardsRenderer";
import {Store} from "typescript-types";

const RelatedPostsRendererStyledDiv = styled.div`
  width: 100%;
  
  h2 {
    padding: 0 10px;
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
        <RelatedPostsRendererStyledDiv>
            {relatedPosts?.length && <>
                <h2>Related</h2>
                <PostsCardsRenderer posts={relatedPosts}/>
            </>}
        </RelatedPostsRendererStyledDiv>
    )
};
export default RelatedPostsRenderer


// return (
//     <RelatedPostsRendererStyledDiv>
//         {actorsRelatedPosts?.length ?
//             <PostsCardsRenderer posts={actorsRelatedPosts}/>
//             : null
//         }
//         {categoriesRelatedPosts?.length ?
//             <PostsCardsRenderer posts={categoriesRelatedPosts}/>
//             : null
//         }
//         {tagsRelatedPosts?.length ?
//             <PostsCardsRenderer posts={tagsRelatedPosts}/>
//             : null
//         }
//     </RelatedPostsRendererStyledDiv>
// )