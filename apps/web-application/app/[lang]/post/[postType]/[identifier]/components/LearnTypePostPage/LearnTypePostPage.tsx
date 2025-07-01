import React, { FC } from 'react';
import { PostPageProps } from '@repo/typescript-types';
import PostTitle from '../PostTitle/PostTitle';
import PostMetasRenderer from '../PostMetasRenderer/PostMetasRenderer';
import ActionButtons from '../ActionButtons/ActionButtons';
import './LearnTypePostPage.styles.scss';
import LearnTypePostPageDescription from './LearnTypePostPageDescription/LearnTypePostPageDescription';

const LearnTypePostPage: FC<PostPageProps> = (
  {
    post,
    locale,
    dictionary,
    views,
    likes,

  }) => {
  return (
    <>
      <div className={'entry-header'}>
        <div className="entry-header-data">
          <PostTitle
            title={post?.translations?.[locale]?.title ?? post?.title}
          />
        </div>
      </div>
      <LearnTypePostPageDescription
        // @ts-expect-error: it's fine
        description={
          post?.translations?.[locale]?.description ?? post?.description
        }
        locale={locale}
      />
      <div className="entry-content">
        <div className="entry-header-actions">
          <ActionButtons
            rating={true}
            dictionary={dictionary}
            likes={likes}
            views={views}
            _id={post._id}
          />
        </div>
        <PostMetasRenderer
          type="categories"
          metas={post.categories}
          dictionary={dictionary}
        />
        <PostMetasRenderer
          type="tags"
          metas={post.tags}
          dictionary={dictionary}
        />
      </div>
    </>
  );
};

export default LearnTypePostPage;
