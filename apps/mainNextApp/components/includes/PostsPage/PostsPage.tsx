import {useEffect, Fragment, FC} from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import styled from "styled-components";
import {useSelector} from "react-redux";
import PostsCardsRenderer from "../cards/CardsRenderer/PostsCardsRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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

    const {posts, postsCountPerPage, totalCount} = useSelector(({posts, settings}: Store) => {
        return {
            posts: posts?.posts,
            totalCount: posts?.totalCount,
            postsCountPerPage: query?.size ? parseInt(query?.size as string) : settings?.identity?.postsCountPerPage
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
                <PostsCardsRenderer posts={posts}/>
            </PostsContainer>
            {!!renderPagination && <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
            />}

        </Fragment>
    );
};
export default PostsPage;
