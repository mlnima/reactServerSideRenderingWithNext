import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import CardTitle from "@components/includes/cards/asset/CardTitle/CardTitle";
import {Post} from "@_typeScriptTypes/Post";
import useTranslation from "next-translate/useTranslation";
import DefaultPostCardStyle from "@components/includes/cards/asset/DefaultPostCardStyle";

const TextToCanvasImage = dynamic(() => import('@components/includes/cards/asset/TextToCanvasImage/TextToCanvasImage'));
const CardImageRenderer = dynamic(() => import('@components/includes/cards/asset/CardImageRenderer'));
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'));

interface ArticlePostCardPropTypes {
    title: string,
    postUrl: string,
    postsPerRawForMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    targetLink:string,
    post: Post,
}

interface ArticlePostCardStylePropTypes {
    cardWidth: number
}

const ArticlePostCardStyle = styled(DefaultPostCardStyle)`
  
  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: ArticlePostCardStylePropTypes) => cardWidth}px;
  }
`


const ArticlePostCard: FC<ArticlePostCardPropTypes> =
    ({
         post,
         title,
         postUrl,
         views,
         rating,
         postsPerRawForMobile,
         cardWidth,
         targetLink,
         index
     }) => {

    const {t} = useTranslation()

        return (
            <ArticlePostCardStyle className={'post-card'} cardWidth={cardWidth}>
                <Link href={postUrl}>
                    <a className={'card-link'} title={title} target={targetLink}>
                        {post.mainThumbnail ?
                            <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/> :
                            <TextToCanvasImage title={title}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/>
                        }

                        <CardTitle title={title}/>

                        <div className={'card-under-media-info'}>
                            {!!views &&
                            <p className={'card-under-title-info-data card-views'}>
                                <span className={'card-views-count'}>{views}</span>
                                <span >{t('common:Views')}</span>
                            </p>
                            }
                            {!!rating &&
                            <CardRating rating={rating} className={'card-rating card-under-title-info-data'}/>
                            }
                        </div>
                    </a>
                </Link>
            </ArticlePostCardStyle>
        )
    };
export default ArticlePostCard
// {!!views &&
// <CardViews views={views} className={'card-views card-under-media-info-data'}/>
// }
// {!!rating &&
// <CardRating rating={rating} className={'card-rating card-under-media-info-data'}/>
// }