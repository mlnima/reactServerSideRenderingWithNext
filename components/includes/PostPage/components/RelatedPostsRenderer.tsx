import {FC} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import PostsRenderer from "@components/includes/PostsRenderer/PostsRenderer";
import styled from "styled-components";

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
                    <PostsRenderer posts={actorsRelatedPosts}/>
                </>
                : null
            }
            {categoriesRelatedPosts?.length ?
                <>
                    <h2>Related By Categories:</h2>
                    <PostsRenderer posts={categoriesRelatedPosts}/>
                </>
                : null
            }
            {tagsRelatedPosts?.length ?
                <>
                    <h2>Related By Tags:</h2>
                    <PostsRenderer posts={tagsRelatedPosts}/>
                </>
                : null
            }
        </RelatedPostsRendererStyledDiv>
    )
};
export default RelatedPostsRenderer
