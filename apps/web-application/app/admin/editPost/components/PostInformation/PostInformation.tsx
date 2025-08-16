'use client';

import React, { FC } from 'react';
import Quality from './Quality/Quality';
import TextInput from './TextInput/TextInput';
import TextAreaComponent from './TextAreaComponent/TextAreaComponent';
import RenderIframe from './RenderIframe/RenderIframe';
import VideoFile from './VideoFile/VideoFile';
import Duration from './Duration/Duration';
import RatingAndViews from './RatingAndViews/RatingAndViews';
import ImagePreview from '../ImagePreview/ImagePreview';
import ImageGallery from './ImageGallery/ImageGallery';
import ProductPrice from './ProductPrice/ProductPrice';
import ScraperOptions from './ScraperOptions/ScraperOptions';
import { IPost } from '@repo/typescript-types';
import './PostInformation.scss';

interface PropTypes {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  post: IPost | null;
  relatedPosts: IPost[] | null;
  setPost: React.Dispatch<React.SetStateAction<IPost | null>>;
  scrapAndSetPostData: Function;
  findSimilarPost: Function;
}

const PostInformation: FC<PropTypes> = ({ onChangeHandler, post, relatedPosts, setPost, scrapAndSetPostData, findSimilarPost }) => {
  if (!post) return null;

  return (
    <div className="PostInformation product-information admin-widget">
      <TextInput post={post} name="source" onChangeHandler={onChangeHandler} />
      {!!post?.source && (
        <ScraperOptions
          relatedPosts={relatedPosts}
          scrapAndSetPostData={scrapAndSetPostData}
          findSimilarPost={findSimilarPost}
          post={post}
          onChangeHandler={onChangeHandler}
          sourceURL={post?.source}
          postId={post?._id}
        />
      )}
      <TextInput post={post} name="mainThumbnail" onChangeHandler={onChangeHandler} />
      {post?.mainThumbnail && <ImagePreview mainThumbnail={post.mainThumbnail} postId={post?._id} />}
      {post?.video && <VideoFile videoData={post.video}  post={post} />}
      <Quality postQuality={post?.quality} rendering={post?.postType === 'video'} onChangeHandler={onChangeHandler} />
      {post?.postType === 'video' && (
        <>
          <TextInput post={post} name="videoUrl" onChangeHandler={onChangeHandler} />
          <TextInput post={post} name="videoEmbedCode" onChangeHandler={onChangeHandler} />
          <TextAreaComponent post={post} name="videoScriptCode" onChangeHandler={onChangeHandler} />
          <RenderIframe videoEmbedCode={post?.videoEmbedCode} />
          <TextInput post={post} name="videoTrailerUrl" onChangeHandler={onChangeHandler} />
          <Duration duration={post.duration} onChangeHandler={onChangeHandler} />
        </>
      )}

      {post?.postType?.match(/^(promotion|out)$/) && <TextInput post={post} name="redirectLink" onChangeHandler={onChangeHandler} />}
      {post?.postType === 'promotion' && <TextInput post={post} name="redirectLink" onChangeHandler={onChangeHandler} />}

      {post?.postType === 'product' && (
        <>
          <ProductPrice onChangeHandler={onChangeHandler} price={post?.price} priceType={post?.priceType} />
          <ImageGallery onChangeHandler={onChangeHandler} post={post} />
        </>
      )}

      <TextInput post={post} name="downloadLink" onChangeHandler={onChangeHandler} />
      {/*<TextAreaComponent name='videoScriptCode' rendering={post?.postType === 'video'} onChangeHandler={onChangeHandler} />*/}
      {/*<RenderIframe rendering={post?.postType === 'video'} />*/}
      {/*<ProductPrice rendering={post?.postType === 'product'} onChangeHandler={onChangeHandler} />*/}
      {/*<TextInput name='shippingCost' rendering={post?.postType === 'product'} onChangeHandler={onChangeHandler} />*/}
      {/*<ImageGallery rendering={post?.postType === 'product'} onChangeHandler={onChangeHandler} />*/}
      <RatingAndViews post={post} name="views" onChangeHandler={onChangeHandler} />
      <RatingAndViews post={post} name="likes" onChangeHandler={onChangeHandler} />
      <RatingAndViews post={post} name="disLikes" onChangeHandler={onChangeHandler} />
    </div>
  );
};

export default PostInformation;

