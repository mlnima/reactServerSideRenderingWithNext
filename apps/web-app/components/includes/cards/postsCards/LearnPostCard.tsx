import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import CardImageRenderer from "../asset/CardImageRenderer";
import TextToCanvasImage from "../asset/TextToCanvasImage/TextToCanvasImage";
import {Post} from "typescript-types";
import CardTitle from "../asset/CardTitle/CardTitle";
import DefaultPostCardStyle from "../asset/DefaultPostCardStyle";
import useTranslation from "next-translate/useTranslation";
import CardViews from "@components/includes/cards/asset/CardViews/CardViews";

const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))

interface LearnPostCardPropTypes {
    title: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    targetLink: string,
    post: Post,
}

interface LearnPostCardStylePropTypes {
    cardWidth: number
}

const LearnPostCardStyle = styled(DefaultPostCardStyle)`

  .entry-header {
    margin-top: 2px;

    .card-header {
      color: var(--secondary-text-color, #ccc);
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
      color: var(--secondary-text-color, #ccc);
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
    color: var(--secondary-text-color, #6A6A6A);
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
         numberOfCardsPerRowInMobile,
         cardWidth,
         targetLink,
         index
     }) => {

        return (
            <LearnPostCardStyle className={'post-card'} cardWidth={cardWidth}>
                <Link href={postUrl} className={'card-link'} title={title} target={targetLink}>
                    {!!post.mainThumbnail ?
                        <CardImageRenderer imageUrl={post.mainThumbnail}
                                           mediaAlt={title}
                                           index={index}
                                           numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                           cardWidth={cardWidth}/> :
                        <TextToCanvasImage title={title}
                                           numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                           cardWidth={cardWidth}/>
                    }
                </Link>
                <CardTitle title={title} url={postUrl} targetLink={targetLink}/>

                <div className={'card-under-media-info'}>
                    <CardViews views={views}/>
                    {!!rating &&
                        <CardRating rating={rating} className={'card-rating card-under-title-info-data'}/>
                    }
                </div>

            </LearnPostCardStyle>
        )
    };
export default LearnPostCard
