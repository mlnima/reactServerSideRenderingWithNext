'use client';

import React, { FC } from 'react';
import Quality from './Quality/Quality';
import TextInput from './TextInput/TextInput';
import TextAreaComponent from './TextAreaComponent/TextAreaComponent';
import RenderIframe from './RenderIframe/RenderIframe';
import Duration from './Duration/Duration';
import RatingAndViews from './RatingAndViews/RatingAndViews';
import ImagePreview from '../ImagePreview/ImagePreview';
import ImageGallery from './ImageGallery/ImageGallery';
import ProductPrice from './ProductPrice/ProductPrice';
import ScraperOptions from './ScraperOptions/ScraperOptions';
import { IPost } from '@repo/typescript-types';
import './PostInformation.scss';

interface PropTypes {
  onChangeHandler: (e: React.ChangeEvent<HTMLElement>) => void;
  post: IPost | null;
  relatedPosts: IPost[] | null;
  setPost: React.Dispatch<React.SetStateAction<IPost | null>>;
  scrapAndSetPostData: Function;
  findSimilarPost:Function
}

const PostInformation: FC<PropTypes> = ({ onChangeHandler, post, relatedPosts, setPost, scrapAndSetPostData,findSimilarPost }) => {

  if (!post) return null;

  return (
    <div className="PostInformation product-information admin-widget">
      <TextInput post={post} name="source" onChangeHandler={onChangeHandler} />
      {!!post?.source &&
        <ScraperOptions relatedPosts={relatedPosts}
                        scrapAndSetPostData={scrapAndSetPostData}
                        findSimilarPost={findSimilarPost}
                        post={post}
                        onChangeHandler={onChangeHandler}
                        sourceURL={post?.source}
                        postId={post?._id} />}
      <TextInput post={post} name="mainThumbnail" onChangeHandler={onChangeHandler} />
      {post?.mainThumbnail && <ImagePreview mainThumbnail={post.mainThumbnail} />}


      <Quality postQuality={post?.quality} rendering={post?.postType === 'video'} onChangeHandler={onChangeHandler} />
      {post?.postType === 'video' &&
        <>
          <TextInput post={post} name="videoUrl" onChangeHandler={onChangeHandler} />
          <TextInput post={post} name="videoEmbedCode" onChangeHandler={onChangeHandler} />
          <TextAreaComponent post={post} name="videoScriptCode"
                             onChangeHandler={onChangeHandler} />
          <RenderIframe videoEmbedCode={post?.videoEmbedCode} />
          <TextInput post={post} name="videoTrailerUrl" onChangeHandler={onChangeHandler} />
          <Duration duration={post.duration} onChangeHandler={onChangeHandler} />
        </>
      }

      {post?.postType?.match(/^(promotion|out)$/) &&
        <TextInput post={post} name="redirectLink" onChangeHandler={onChangeHandler} />
      }
      {post?.postType === 'promotion' &&
        <TextInput post={post} name="redirectLink" onChangeHandler={onChangeHandler} />
      }

      {post?.postType === 'product' &&
        <>
          <ProductPrice onChangeHandler={onChangeHandler} price={post?.price} priceType={post?.priceType} />
          <ImageGallery onChangeHandler={onChangeHandler} post={post} />
        </>
      }

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


// import Quality from "./Quality/Quality";
// import TextInput from "./TextInput/TextInput";
// import TextAreaComponent from "./TextAreaComponent/TextAreaComponent";
// import RenderIframe from "./RenderIframe/RenderIframe";
// import Duration from "./Duration/Duration";
// import RatingAndViews from "./RatingAndViews/RatingAndViews";
// import ImagePreview from "../ImagePreview";
// import ImageGallery from "./ImageGallery/ImageGallery";
// import ProductPrice from "./ProductPrice/ProductPrice";
// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import {DashboardStore} from "@repo/typescript-types";
// import {FC} from "react";
// import {useAppDispatch} from "@store/hooks";
// import {getPostScrapedDataAction} from "@store/reducers/postsReducer";
// import ScraperOptions from "@components/pages/Post/PostInformation/ScraperOptions";
//
// let StyledDiv = styled.div`
//   width: 100%;
//   padding: 8px;
//   box-sizing: border-box;
//   background-color: var(--secondary-background-color, #181818);
//   color: var(--secondary-text-color, #ccc);
//
//   .primaryInput {
//     box-sizing: border-box;
//   }
//
//   .VideoInformationSection, .post-information-section {
//     display: grid;
//     grid-template-columns: 200px 1fr;
//     align-items: center;
//     padding: 8px;
//     box-sizing: border-box;
//
//     .title {
//       padding: 2px;
//       font-size: small;
//     }
//
//     iframe {
//       padding: 8px;
//       box-sizing: border-box;
//       width: 50%;
//       aspect-ratio: 16/9;
//     }
//
//   }
// `
//
// interface PropTypes {
//     onChangeHandler: Function
// }
//
// const PostInformation: FC<PropTypes> = (props) => {
//     const post = useSelector(({posts}: DashboardStore) => posts.post);
//
//
//
//     return (
//         <StyledDiv className='post-information  product-information admin-widget'>
//             <TextInput name='source' rendering={true} onChangeHandler={onChangeHandler}/>
//             {!!post?.source && <ScraperOptions sourceURL={post?.source} postId={post?._id}  />}
//             <TextInput name='mainThumbnail' rendering={true} onChangeHandler={onChangeHandler}/>
//             <ImagePreview/>
//             <Quality rendering={post?.postType === 'video'} onChangeHandler={onChangeHandler}/>
//             <TextInput name='videoUrl' rendering={post?.postType === 'video'} onChangeHandler={onChangeHandler}/>
//             <TextInput name='videoEmbedCode' rendering={post?.postType === 'video'}
//                        onChangeHandler={onChangeHandler}/>
//
//             <TextInput name='redirectLink' rendering={post?.postType === 'promotion'}
//                        onChangeHandler={onChangeHandler}/>
//             <TextInput name='redirectLink' rendering={!!post?.postType?.match(/^(promotion|out)$/)}
//                        onChangeHandler={onChangeHandler}/>
//             <TextAreaComponent name='videoScriptCode' rendering={post?.postType === 'video'}
//                                onChangeHandler={onChangeHandler}/>
//             <RenderIframe rendering={post?.postType === 'video'}/>
//             <TextInput name='videoTrailerUrl' rendering={post?.postType === 'video'}
//                        onChangeHandler={onChangeHandler}/>
//             <TextInput name='downloadLink' rendering={true}
//                        onChangeHandler={onChangeHandler}/>
//             <Duration rendering={post?.postType === 'video'} onChangeHandler={onChangeHandler}/>
//             <ProductPrice rendering={post?.postType === 'product'} onChangeHandler={onChangeHandler}/>
//             <TextInput name='shippingCost' rendering={post?.postType === 'product'}
//                        onChangeHandler={onChangeHandler}/>
//             <ImageGallery rendering={post?.postType === 'product'} onChangeHandler={onChangeHandler}/>
//             <RatingAndViews name='views' rendering={true} onChangeHandler={onChangeHandler}/>
//             <RatingAndViews name='likes' rendering={true} onChangeHandler={onChangeHandler}/>
//             <RatingAndViews name='disLikes' rendering={true} onChangeHandler={onChangeHandler}/>
//
//         </StyledDiv>
//     );
// };
//
// export default PostInformation;
//
