import React, { FC } from 'react';
import { Post } from "@repo/typescript-types";
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';
import Pagination from '@components/Pagination/Pagination';

interface PostPageTypes {
    renderPagination: boolean;
    posts: Post[];
    locale: string;
    totalCount: number;
    currentPage: number;
    dictionary: {
        [key: string]: string;
    }
}

const PostsPage: FC<PostPageTypes> = ({
    renderPagination,
    posts,
    locale,
    totalCount,
    dictionary,
    currentPage,
}) => {

    return (
        <>
            <div className="posts-container">
                <PostsCardsRenderer
                    locale={locale}
                    posts={posts}
                    dictionary={dictionary}
                />
            </div>
            {renderPagination && (
                <Pagination
                    totalCount={totalCount}
                    currentPage={currentPage}
                />
            )}
        </>
    );
};

export default PostsPage;
