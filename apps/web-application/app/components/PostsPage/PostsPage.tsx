import React, {FC} from "react";
import {Post} from "typescript-types";
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer";
import Pagination from "@components/Pagination/Pagination";

interface PostPageTypes {
    renderPagination: boolean,
    posts: Post[],
    locale: string,
    totalCount: number,
    numberOfCardsPerPage: number,
    currentPage: number,
}


const PostsPage: FC<PostPageTypes> = ({renderPagination, posts, locale,totalCount,numberOfCardsPerPage,currentPage}) => {

    return (
        <>
            <div className='posts-container'>
                <PostsCardsRenderer locale={locale} posts={posts}/>
            </div>
            {renderPagination && <Pagination totalCount={totalCount}
                                             currentPage={currentPage}
                                             numberOfCardsPerPage={numberOfCardsPerPage}/>}
        </>
    )
}

export default PostsPage;