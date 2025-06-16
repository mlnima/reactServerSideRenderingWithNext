'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import './CardImageRendererUseClient.scss';
import Image from 'next/image';
const fallbackImage = '/asset/images/default/no-image-available160.png';

interface CardImageNextPropTypes {
  imageUrl: string | undefined;
  isNextImageAllowed: boolean;
  videoTrailerUrl?: string;
  mediaAlt: undefined | string;
  index: number;
  aspectRatio?: string | undefined;
  metaId?: string;
  usage?: 'actorCard' | 'categoryCard';
}

const MetaCardImage: FC<CardImageNextPropTypes> = (
  {
    imageUrl,
    mediaAlt,
    metaId,
    index,
    usage,
    isNextImageAllowed = false,
  }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [gotError, setGotError] = useState<boolean>(false);
  const [targetImageUrl, setTargetImageUrl] = useState<string>(imageUrl || '');

  useEffect(() => {
    if (gotError){
      setTargetImageUrl(fallbackImage)
    }
  }, [ metaId, gotError]);


  useEffect(() => {
    if (gotError) {
      setGotError(false);
    }
  }, [metaId]);

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

  if (!imageUrl) return null;

  return (
    <div className={`card-image-wrapper`} style={{ aspectRatio: usage === 'categoryCard' ? '16/9' : '1/1' }}>
      {isNextImageAllowed ?
        <Image
          src={targetImageUrl}
          ref={imageRef}
          alt={mediaAlt || ''}
          width={usage === 'actorCard' ? 160 : 280}
          height={usage === 'actorCard' ? 160 : 157.5}
          onError={() => setGotError(true)}
          loading={index > 3 ? 'lazy' : 'eager'}
          style={{
            aspectRatio: usage === 'categoryCard' ? '16/9' : '1/1',
            objectFit:'cover'
          }}
          className={`card-image`}
        /> :
        <img
          src={targetImageUrl as string}
          ref={imageRef}
          alt={mediaAlt || ''}
          loading={index > 3 ? 'lazy' : 'eager'}
          onError={() => setGotError(true)}
          style={{
            aspectRatio: usage === 'categoryCard' ? '16/9' : '1/1',
            objectFit:'cover'
          }}
          className={`card-image`}
        />
      }
    </div>
  );
};

export default MetaCardImage;
