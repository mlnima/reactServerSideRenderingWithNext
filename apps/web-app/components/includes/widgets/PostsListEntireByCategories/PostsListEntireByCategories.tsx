import {FC, useEffect, memo, useMemo} from "react";
import styled from "styled-components";
import PromotionPostListCard from "@components/includes/cards/postsCards/PromotionPostListCard";

const Style = styled.div``;

interface PropTypes {
    uniqueData: any
}

const PostsListEntireByCategories: FC<PropTypes> = ({uniqueData}) => {

    const categoriesDataWithPosts = useMemo(()=>uniqueData?.categoriesDataWithPosts,[])

    return (
        <Style>
            {/*{categoriesDataWithPosts.map(category=>{*/}
            {/*    return(*/}
            {/*        <div key={category.name}>*/}
            {/*            <div>*/}
            {/*                <h2>{category.name}</h2>*/}
            {/*                <p>{category.description}</p>*/}
            {/*                {category.posts.map((post,index)=>{*/}
            {/*                    return(*/}
            {/*                        <PromotionPostListCard post={post} index={index}/>*/}
            {/*                    )*/}
            {/*                })}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </Style>
    )
};
export default memo(PostsListEntireByCategories) ;
