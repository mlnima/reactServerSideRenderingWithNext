'use client';

import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import './CardImageRendererUseClient.scss';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setActiveVideoTrailerId } from '@store/reducers/postsReducers/postsReducer';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { viewPost } from '@lib/database/operations/posts';
//import {clearACacheByTag} from "@lib/serverActions";
const fallbackImage = '/asset/images/default/no-image-available.png';

interface CardImageNextPropTypes {
  imageUrl: string | undefined;
  isNextImageAllowed: boolean;
  postType?: string;
  videoTrailerUrl?: string;
  submitPostView?: boolean;
  postId?: string;
  mediaAlt: undefined | string;
  index: number;
  aspectRatio?: string | undefined;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  metaId?: string;
  overlayShadow?: boolean;
}

interface IImageStyle {
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  aspectRatio: string;
}

const CardImageRendererUseClient: FC<CardImageNextPropTypes> = ({
                                                                  imageUrl,
                                                                  mediaAlt,
                                                                  aspectRatio,
                                                                  objectFit,
                                                                  submitPostView = false,
                                                                  videoTrailerUrl,
                                                                  postId,
                                                                  metaId,
                                                                  index,
                                                                  isNextImageAllowed = false,
                                                                  overlayShadow,
                                                                }) => {
  const activeVideoTrailerId = useAppSelector(({ posts }) => posts.activeVideoTrailerId);
  const dispatch = useAppDispatch();
  const [loadingAnimationOver, setLoadingAnimationOver] = useState(false);
  const videoTrailerRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [gotError, setGotError] = useState<boolean>(false);

  const targetImageUrl = useMemo(() => (gotError ? fallbackImage : imageUrl), [postId, metaId, gotError]) as
    | string
    | StaticImport;

  const imageStyle = useMemo(
    () => ({
      objectFit: objectFit || 'cover',
      aspectRatio: aspectRatio || '16/9',
    }),
    [objectFit, aspectRatio],
  ) as IImageStyle;

  useEffect(() => {
    if (gotError) {
      setGotError(false);
    }
  }, [postId, metaId]);

  const onClickHandler = () => {
    if (submitPostView && postId) {

      viewPost(postId);
    }
  };

  const playTrailer = () => {
    if (videoTrailerRef?.current) {
      setTimeout(() => {
        if (videoTrailerRef.current)
          videoTrailerRef.current.play().finally();
      }, 1000);
    }
  };

  const onHoverHandler = async () => {
    dispatch(setActiveVideoTrailerId(postId));
    setTimeout(() => {
      setLoadingAnimationOver(true);
    }, 1000);
  };

  const onUnHoverHandler = async () => {
    dispatch(setActiveVideoTrailerId(null));
    setLoadingAnimationOver(false);
  };

  const onCanPlayHandler = () => {
    if (activeVideoTrailerId === postId) {
      playTrailer();
    }
  };

  //we will use the error code to replace the content if it is possible for check the removed 3rd party content
  // const onImageErrorHandler = async () => {
  //     setGotError(true);
  // try {
  //     if (
  //         !!postId &&
  //         postType ==='video' &&
  //         !imageUrl?.includes(process.env.NEXT_PUBLIC_PRODUCTION_URL) &&
  //         imageUrl?.includes('http')
  //     ) {
  //         const checkDeletedContent = await clientCheckDeletedVideo({ postId });
  //         if (checkDeletedContent.data.status === 404) {
  //             clearACacheByTag('posts');
  //             clearACacheByTag('widgets');
  //         }
  //     }
  // }catch (error){
  //     //console.log(`checkImageStatus=> `,error)
  // }
  // };

  return (
    <div className={`card-image-wrapper`} style={{ aspectRatio: imageStyle.aspectRatio }} onClick={onClickHandler}>
      {!!videoTrailerUrl && activeVideoTrailerId === postId && targetImageUrl !== fallbackImage && (
        <div className="trailer-loading" />
      )}

      {isNextImageAllowed && !!imageUrl && (
        <Image
          src={targetImageUrl}
          ref={imageRef}
          alt={mediaAlt || ''}
          width={320}
          height={240}
          onMouseEnter={() => onHoverHandler()}
          onTouchStart={() => onHoverHandler()}
          onTouchEnd={onUnHoverHandler}
          onError={() => setGotError(true)}
          loading={index > 3 ? 'lazy' : 'eager'}
          style={imageStyle}
          className={`card-image`}
        />
      )}

      {!isNextImageAllowed && !!imageUrl && (
        <img
          src={targetImageUrl as string}
          ref={imageRef}
          alt={mediaAlt || ''}
          loading={index > 3 ? 'lazy' : 'eager'}
          onMouseEnter={() => onHoverHandler()}
          onTouchStart={() => onHoverHandler()}
          onTouchEnd={onUnHoverHandler}
          onError={() => setGotError(true)}
          style={imageStyle}
          className={`card-image`}
        />
      )}

      {overlayShadow && (
        <div
          className={'cardOverlay'}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: 'linear-gradient(to bottom,rgba(0,0,0,.0001) 0,rgba(0,0,0,.5) 100%)',
          }}
        />
      )}

      {!!videoTrailerUrl && activeVideoTrailerId === postId && loadingAnimationOver && (
        <video
          ref={videoTrailerRef}
          muted
          loop={false}
          onEnded={() => onHoverHandler()}
          onCanPlay={onCanPlayHandler}
          onMouseLeave={onUnHoverHandler}
          onTouchEnd={onUnHoverHandler}
          playsInline
          style={imageStyle}
          className={'video-card-trailer'}
        >
          <source src={videoTrailerUrl} />
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}
    </div>
  );
};

export default CardImageRendererUseClient;
