import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import CardImageRenderer from "@components/includes/cards/asset/CardImageRenderer";
import TextToCanvasImage from "@components/includes/cards/asset/TextToCanvasImage/TextToCanvasImage";
import {Post} from "@_typeScriptTypes/Post";
import CardTitle from "@components/includes/cards/asset/CardTitle/CardTitle";
import DefaultPostCardStyle from "@components/includes/cards/asset/DefaultPostCardStyle";
import useTranslation from "next-translate/useTranslation";
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))

interface LearnPostCardPropTypes {
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

interface LearnPostCardStylePropTypes {
    cardWidth: number
}

const LearnPostCardStyle = styled(DefaultPostCardStyle)`
  
  .entry-header {
    text-align: center;
    margin-top: 2px;

    .card-header {
      color: var(--post-element-text-color, #ccc);
    }
  }

  .card-under-media-info {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 0;

    .card-under-media-info-data {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2px 0;
      padding: 0 2px;
      color: var(--post-element-info-text-color, #ccc);
      font-size: 12px;

      .icon {
        width: 14px;
        height: 14px;
        margin: 0 2px;
      }
    }
  }

  .last-update {
    font-size: 9px;
    margin: 4px;
    color: var(--post-element-info-text-color, #6A6A6A);
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: LearnPostCardStylePropTypes) => cardWidth}px;
  }
`


const LearnPostCard: FC<LearnPostCardPropTypes> =
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
            <LearnPostCardStyle className={'post-card'} cardWidth={cardWidth}>
                <Link href={postUrl}>
                    <a className={'card-link'} title={title} target={targetLink}>

                        {!!post.mainThumbnail ?
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
            </LearnPostCardStyle>
        )
    };
export default LearnPostCard
