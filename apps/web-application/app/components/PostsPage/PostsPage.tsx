import React, { FC } from 'react';
import { IContentSettings, IPost } from '@repo/typescript-types';
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';
import Pagination from '@components/Pagination/Pagination';

interface PostPageTypes {
  renderPagination: boolean;
  posts: IPost[];
  locale: string;
  totalCount: number;
  currentPage: number;
  dictionary: {
    [key: string]: string;
  };
  contentSettings?: IContentSettings;
}

const PostsPage: FC<PostPageTypes> = (
  {
    renderPagination,
    posts,
    locale,
    totalCount,
    dictionary,
    currentPage,
    contentSettings,
  }) => {

  return (
    <>
      <div className="posts-container">
        <PostsCardsRenderer
          locale={locale}
          posts={posts}
          dictionary={dictionary}
          contentSettings={contentSettings}
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
