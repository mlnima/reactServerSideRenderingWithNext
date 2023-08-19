import React, {useEffect,FC} from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import styled from "styled-components";
import PostsCardsRenderer from "../cards/CardsRenderer/PostsCardsRenderer";
import {useAppSelector} from "@store_toolkit/hooks";

let PostsContainer = styled.div`
  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }
`

interface PostPageTypes {
    renderPagination: boolean
}

const PostsPage: FC<PostPageTypes> = ({renderPagination}) => {

    const {query} = useRouter()

    const {posts} = useAppSelector(({posts}) => {
        return {
            posts: posts?.posts,
        }
    })



    useEffect(() => {
        if (typeof window !== 'undefined') {
             setTimeout(()=>{
                 window.scrollTo({top: 0, behavior: 'smooth'})
             },500)

        }
    }, [query]);


    return (
        <>
            <PostsContainer className='posts-container'>
                <PostsCardsRenderer posts={posts}/>
            </PostsContainer>
            {renderPagination && <PaginationComponent/>}

        </>
    );
};
export default PostsPage;
