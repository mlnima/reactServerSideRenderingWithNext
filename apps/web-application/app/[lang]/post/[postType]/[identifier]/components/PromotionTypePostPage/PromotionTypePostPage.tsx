import React, { FC } from 'react';
import { IPost } from '@repo/typescript-types';
import PostDescription from '../PostDescription/PostDescription';
import PostMetasRenderer from '../PostMetasRenderer/PostMetasRenderer';
import { Widget } from '@repo/typescript-types';
import ActionButtons from '../ActionButtons/ActionButtons';
import './PromotionTypePostPage.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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
  widgets: Widget[];
  relatedPosts: IPost[];
}

const PromotionTypePostPage: FC<IProps> = ({
  post,
  locale,
  dictionary,
  views,
  likes,
  disLikes,
}) => {
  return (
    <>
      <div className={'entry-header promotionEntryHeader'}>
        <div className="promotionThumbnailLink">
          <a href={post?.redirectLink}>
            <img
              className="thumbnail"
              src={post?.mainThumbnail || post?.thumbnail?.filePath}
              alt="title"
            />
          </a>
          {post?.redirectLink && (
            <Link
              href={post?.redirectLink}
              className="btn btn-primary redirectLink"
              target="_blank"
            >
              <h1>
                {post?.translations?.[locale]?.title ?? post?.title}
                <FontAwesomeIcon
                  className={'rating-icon'}
                  icon={faArrowUpRightFromSquare}
                />
              </h1>
            </Link>
          )}
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

export default PromotionTypePostPage;
