import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import CardTitle from '../../asset/CardTitle/CardTitle';
import { Post } from 'typescript-types';
import '../postCard.scss';
import Link from 'next/link';
import CardViews from '@components/cards/asset/CardViews/CardViews';
import CardRating from '@components/cards/asset/CardRating/CardRating';
import CardStats from '@components/cards/asset/CardStats/CardStats';
import './PromotionPostCard.scss'
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));

interface PromotionPostCardPropTypes {
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
        [key: string]: string;
    };
}

const PromotionPostCard: FC<PromotionPostCardPropTypes> = ({
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
        <article className={`postCard postCardPromotion${isSidebar ? ' postCardSidebar' : ''}`}>
            <div className={'cardMedia'}>
                <Link
                    href={postUrl}
                    className={'cardLink'}
                    title={post?.translations?.[locale as string]?.title ?? post?.title}
                >
                    <CardImageRendererUseClient
                        imageUrl={post.mainThumbnail || post?.thumbnail?.filePath}
                        isNextImageAllowed={isNextImageAllowed}
                        key={post?._id}
                        mediaAlt={post?.translations?.[locale as string]?.title ?? post?.title}
                        index={index}
                    />
                </Link>
            </div>

            <Link
                href={post?.redirectLink || '#'}
                target={'_blank'}
                title={post?.translations?.[locale as string]?.title ?? post?.title}
            >
                <div className={`cardInfo`}>
                    <CardTitle useLink={false} useIcon title={post?.translations?.[locale as string]?.title ?? post?.title} />
                    <CardStats
                        settings={settings}
                        views={post?.views}
                        dictionary={dictionary}
                        likes={post?.likes}
                        dislikes={post?.dislikes}
                        createdAt={post?.createdAt}
                        updatedAt={post?.updatedAt}
                    />
                </div>
            </Link>

        </article>
    );
};
//url={postUrl}
export default PromotionPostCard;

// <div className={`cardInfo`}>
// <Link href={postUrl} aria-label={`open ${post?.translations?.[locale as string]?.title ?? post?.title} details`}>
// <CardTitle title={post?.translations?.[locale as string]?.title ?? post?.title}
// useLink={false}/>
// </Link>
// </div>
// <div className={'cardMedia'}>
//
//     <Link href={post?.redirectLink || '#'} className={'promotion-card-link-external'}
//           target={'_blank'} rel={'nofollow noopener external'}>
//         <CardImageRendererUseClient
//             imageUrl={post?.mainThumbnail || post?.thumbnail?.filePath}
//             isNextImageAllowed={isNextImageAllowed}
//             key={post?._id}
//             submitPostView={true}
//             postId={post?._id}
//             mediaAlt={post?.translations?.[locale as string]?.title ?? post?.title}
//             index={index}/>
//     </Link>
//
// </div>
