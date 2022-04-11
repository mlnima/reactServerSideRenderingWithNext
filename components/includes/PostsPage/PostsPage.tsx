import {useEffect,Fragment} from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import PostsRenderer from "../PostsRenderer/PostsRenderer";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

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

const PostsPage = () => {
    
    const {query} = useRouter()

    const {posts,postsCountPerPage,totalCount}= useSelector(({posts,settings}: StoreTypes) =>{
        return{
            posts: posts?.posts,
            totalCount:posts?.totalCount,
            postsCountPerPage: parseInt(query?.size as string || settings?.identity?.postsCountPerPage || '20')
        }
    })


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }, [query]);

    return (
        <Fragment>
            <PostsContainer className='posts-container'>
                <PostsRenderer posts={posts}/>
            </PostsContainer>
            <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={ postsCountPerPage }
                maxPage={Math.ceil(totalCount /postsCountPerPage)}
            />
        </Fragment>
    );
};
export default PostsPage;
