'use client';
import React, { FC, useEffect } from 'react';
import { convertDurationStringToIso8601, convertDateToIsoString } from '@repo/utils/dist/src';
import { IPost } from '@repo/typescript-types';
import './VideoPlayersWrapper.scss';
import InternalVideoPlayer from '../InternalVideoPlayer/InternalVideoPlayer';

interface PropTypes {
  post: IPost;
  locale: string;
  dictionary: {
    [key: string]: string;
  };
}

const VideoPlayersWrapper: FC<PropTypes> = ({ post }) => {
  const metaDate = post.updatedAt || post.createdAt;
  const uploadDate = metaDate ? convertDateToIsoString(metaDate) : null;
  const mainThumbnail = post.mainThumbnail
    ? post.mainThumbnail?.includes('http')
      ? post.mainThumbnail
      : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${post.mainThumbnail}`
    : '/asset/images/default/no-image-available260.png';

  const selectedThumbnail = post?.thumbnail?.filePath || post?.mainThumbnail || null;
  const thumbnail = selectedThumbnail
    ? selectedThumbnail?.includes('http')
      ? selectedThumbnail
      : `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${selectedThumbnail}`
    : '/asset/images/default/no-image-available260.png';

  // const onErrorHandler = async () => {
  //     try {
  //         const checkDeletedContent = await clientCheckDeletedVideo({ videoEmbedCode: post.videoEmbedCode });
  //         console.log(`checkDeletedContent=> `,videoEmbedCode.data)
  //         if (checkDeletedContent.data.status === 404) {
  //             clearACacheByTag('posts')
  //             clearACacheByTag('widgets')
  //         }
  //     } catch (error) {
  //         console.log(`checkImageStatus=> `, error);
  //     }
  // };

  useEffect(() => {
    // console.log(`mainThumbnail`, mainThumbnail);
    console.log('\x1b[33m%s\x1b[0m', 'mainThumbnail => ', mainThumbnail);
  }, [post]);

  return (
    <div className="video-player">
      {!!post.title && <meta itemProp="name" content={post.title} />}
      {!!post.description && <meta itemProp="description" content={typeof post.description === 'string' ? post.description : ''} />}
      {!!post.duration && <meta itemProp="duration" content={convertDurationStringToIso8601(post.duration)} />}
      <meta itemProp="thumbnailUrl" content={thumbnail} />
      {!!post.videoUrl && <meta itemProp="contentUrl" content={post.videoUrl} />}
      {!!post.videoEmbedCode && <meta itemProp="embedURL" content={post.videoEmbedCode} />}
      {!!uploadDate && <meta itemProp="uploadDate" content={uploadDate} />}
      {!!post.actors?.length &&
        post.actors?.map((actor) => {
          return <meta key={actor._id} itemProp="actor" content={actor.name} />;
        })}
      <div className="responsive-player">
        {post.video?.filePath || post.videoUrl ? (
          <InternalVideoPlayer
            src={post.video?.filePath || post.videoUrl}
            poster={thumbnail}
            controls
            className="custom-video"
            style={{ width: '100%', height: 'auto' }}
          />
        ) : post.videoEmbedCode && !post.videoUrl ? (
          <iframe
            className={post._id}
            loading="lazy"
            allow="fullscreen"
            title={post.title}
            src={post.videoEmbedCode}

            // frameBorder="0"
            // width="640"
            // height="360"
            // onError={onErrorHandler}
            // onErrorCapture={onErrorHandler}
          />
        ) : !post.videoUrl && !post.videoEmbedCode && post.videoScriptCode ? (
          post.videoScriptCode
        ) : null}
      </div>
    </div>
  );
};
export default VideoPlayersWrapper;


// <video className="video-player-video-type" controls controlsList=" nodownload" poster={post.mainThumbnail} preload="none">
//   <source src={post.videoUrl} />
// </video>