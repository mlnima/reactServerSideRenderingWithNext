import {FC} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
// import PostsRenderer from "@components/includes/PostsRenderer/PostsRenderer";
import styled from "styled-components";
import PostsCardsRenderer from "@components/includes/cards/CardsRenderer/PostsCardsRenderer";

const RelatedPostsRendererStyledDiv = styled.div`
  width: 100%;
`

const RelatedPostsRenderer: FC = () => {
    const {
        actorsRelatedPosts,
        categoriesRelatedPosts,
        tagsRelatedPosts
    } = useSelector((store: StoreTypes) => store?.posts?.relatedPosts);

    return (
        <RelatedPostsRendererStyledDiv>
            {actorsRelatedPosts?.length ?
                <>
                    <h2>Related By Actors:</h2>
                    <PostsCardsRenderer posts={actorsRelatedPosts}/>
                </>
                : null
            }
            {categoriesRelatedPosts?.length ?
                <>
                    <h2>Related By Categories:</h2>
                    <PostsCardsRenderer posts={categoriesRelatedPosts}/>
                </>
                : null
            }
            {tagsRelatedPosts?.length ?
                <>
                    <h2>Related By Tags:</h2>
                    <PostsCardsRenderer posts={tagsRelatedPosts}/>
                </>
                : null
            }
        </RelatedPostsRendererStyledDiv>
    )
};
export default RelatedPostsRenderer
