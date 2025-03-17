import React, { FC } from 'react';
import { IPost } from '@repo/typescript-types';
import PostTitle from '../PostTitle/PostTitle';
import PostDescription from '../PostDescription/PostDescription';
import PostMetasRenderer from '../PostMetasRenderer/PostMetasRenderer';
import { IWidget } from '@repo/typescript-types';
import ActionButtons from '../ActionButtons/ActionButtons';
import './ArticleTypePostPage.styles.scss';

interface IProps {
  post: IPost;
  views: number;
  likes: number;
  disLikes: number;
  locale: string;
  hasSidebar?: string;
  dictionary: {
    [key: string]: string;
  };
  widgets: IWidget[];
  relatedPosts: IPost[];
}

const ArticleTypePostPage: FC<IProps> = ({
  post,
  locale,
  dictionary,
  views,
  likes,
  disLikes,
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

      <div className="entry-content">
        <PostDescription
          description={
            post?.translations?.[locale]?.description ?? post?.description
          }
        />
        <div className="entry-header-actions">
          <ActionButtons
            rating={true}
            dictionary={dictionary}
            likes={likes}
            disLikes={disLikes}
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

export default ArticleTypePostPage;
