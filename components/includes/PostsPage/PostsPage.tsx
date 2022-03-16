import {useEffect,Fragment} from 'react';
import {useRouter} from "next/router";
import * as Scroll from "react-scroll";
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
    const posts = useSelector((store: StoreTypes) => store?.posts?.posts)
    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))
    const totalCount = useSelector((store: StoreTypes) => store?.posts?.totalCount)

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
    }, [query]);

    return (
        <Fragment>
            <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={ postsCountPerPage }
                maxPage={Math.ceil(totalCount /postsCountPerPage)}
            />
            <PostsContainer className='posts-container'>
                <PostsRenderer
                    posts={posts}
                 />
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
