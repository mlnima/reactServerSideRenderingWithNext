import React, {FC, Suspense} from 'react';
import Link from 'next/link';
import {Post} from "@repo/typescript-types";
import CardTitle from '../../asset/CardTitle/CardTitle';
import '../postCard.scss';
import './LearnPostCard.scss';
import {imageLessCardColors} from '@repo/data-structures';
import {randomNumberGenerator} from '@repo/utils';
import {connection} from 'next/server'

import CardStats from '@components/cards/asset/CardStats/CardStats';
import CardImageRendererUseClient from '@components/cards/asset/CardImageRenderer/CardImageRendererUseClient';

interface LearnPostCardPropTypes {
    locale: string;
    postUrl: string;
    numberOfCardsPerRowInMobile: number;
    index: number;
    isSidebar?: boolean;
    post: Post;
    isNextImageAllowed: boolean;
    dictionary: {
        [key: string]: string;
    };
    settings: {
        showViewsOnCard: boolean,
        showRatingOnCard: boolean,
        showDateOnCard: boolean,
    };
}

interface IDynamicImageLessCard {
    post:Post, 
    postUrl:string,
    locale:string
}

const DynamicImageLessCard = async ({ post, postUrl, locale }:IDynamicImageLessCard) => {
  await connection();
  const randomNumberFortColors = randomNumberGenerator(0, 10);
  const randomColor = imageLessCardColors[randomNumberFortColors];
  return (
    <div
      className={'postCard imageLessCard'}
      style={{
        backgroundColor: !post.mainThumbnail
          ? randomColor?.background || 'var(--primary-background-color)'
          : 'var(--primary-background-color)',
      }}
    >
      <Link
        href={postUrl}
        className={'cardLink'}
        style={{
          color: randomColor?.text || 'var(--primary-text-color)',
        }}
        title={post?.translations?.[locale as string]?.title ?? post?.title}
      >
        {post?.translations?.[locale as string]?.title ?? post?.title}
      </Link>
    </div>
  );
};

const LearnPostCard: FC<LearnPostCardPropTypes> = ({
                                                       post,
                                                       locale,
                                                       postUrl,
                                                       isSidebar,
                                                       index,
                                                       isNextImageAllowed,
                                                       dictionary,
                                                       settings,
                                                   }) => {
    return (
        <article
            className={`postCard postCardLearn${isSidebar ? ' postCardSidebar' : ''}`}
        >
            {post.mainThumbnail ? (
                <>
                    <div className={'cardMedia'}>
                        <Link
                            href={postUrl}
                            className={'cardLink'}
                            title={
                                post?.translations?.[locale as string]?.title ?? post?.title
                            }
                        >
                            <CardImageRendererUseClient
                                imageUrl={post.mainThumbnail || post?.thumbnail?.filePath}
                                isNextImageAllowed={isNextImageAllowed}
                                key={post?._id}
                                mediaAlt={
                                    post?.translations?.[locale as string]?.title ?? post?.title
                                }
                                index={index}
                            />
                        </Link>
                    </div>
                    <div className={`cardInfo`}>
                        <CardTitle
                            title={
                                post?.translations?.[locale as string]?.title ?? post?.title
                            }
                            url={postUrl}
                        />
                        <CardStats
                            views={post?.views}
                            dictionary={dictionary}
                            likes={post?.likes}
                            dislikes={post?.disLikes}
                            createdAt={post?.createdAt}
                            updatedAt={post?.updatedAt}
                            settings={settings}
                        />
                    </div>
                </>
            ) :
                <Suspense fallback={<div>loading...</div>}>
                    <DynamicImageLessCard post={post} postUrl={postUrl} locale={locale} />
                </Suspense>
            }
        </article>
    );
};
export default LearnPostCard;


// <div
//     className={'postCard imageLessCard'}
//     style={{
//         backgroundColor: !post.mainThumbnail
//             ? randomColor?.background || 'var(--primary-background-color)'
//             : 'var(--primary-background-color)',
//     }}
// >
//     <Link
//         href={postUrl}
//         className={'cardLink'}
//         style={{
//             color: randomColor?.text || 'var(--primary-text-color)',
//         }}
//         title={post?.translations?.[locale as string]?.title ?? post?.title}
//     >
//         {post?.translations?.[locale as string]?.title ?? post?.title}
//     </Link>
// </div>