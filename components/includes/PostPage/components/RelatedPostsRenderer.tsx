import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import PostsRenderer from "@components/includes/PostsRenderer/PostsRenderer";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

interface RelatedPostsRendererPropTypes {
}

const RelatedPostsRenderer: FC<RelatedPostsRendererPropTypes> = (props) => {
    const {
        actorsRelatedPosts,
        categoriesRelatedPosts,
        tagsRelatedPosts
    } = useSelector((store: StoreTypes) => store?.posts?.relatedPosts);

    // useEffect(() => {
    //     console.log(actorsRelatedPosts)
    //     console.log(categoriesRelatedPosts)
    //     console.log(tagsRelatedPosts)
    // }, [props]);
    return (
        <div>
            {actorsRelatedPosts?.length ?
                <>
                    <h2>Related By Actors:</h2>
                    <PostsRenderer posts={actorsRelatedPosts}/>
                </>
                :null
            }
            {categoriesRelatedPosts?.length ?
                <>
                    <h2>Related By Categories:</h2>
                    <PostsRenderer posts={categoriesRelatedPosts}/>
                </>
                :null
            }
            {tagsRelatedPosts?.length ?
                <>
                    <h2>Related By Tags:</h2>
                    <PostsRenderer posts={tagsRelatedPosts}/>
                </>
                :null
            }
        </div>
    )
};
export default RelatedPostsRenderer
