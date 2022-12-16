import {FC} from "react";
import styled from "styled-components";
import DefaultPostCardStyle from "../asset/DefaultPostCardStyle";
import Link from "next/link";
import CardTitle from "../asset/CardTitle/CardTitle";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";
import CardViews from "@components/includes/cards/asset/CardViews/CardViews";

const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))

interface StylePropTypes {
    cardWidth: number
}

interface PropTypes {
    title: string,
    postUrl: string,
    postsPerRawForMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    targetLink: string,
    post: Post,
}

const Style = styled(DefaultPostCardStyle)`
  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: StylePropTypes) => cardWidth}px;
  }
`

const EventPostCard: FC<PropTypes> =
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
            <Style className={'post-card'} cardWidth={cardWidth}>
                <Link href={postUrl} className={'card-link'} title={title} target={targetLink}>

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
                </Link>
                <CardTitle title={title} url={postUrl} targetLink={targetLink}/>

                <div className={'card-under-media-info'}>
                    <CardViews views={views}/>
                    {!!rating &&
                        <CardRating rating={rating} className={'card-rating card-under-title-info-data'}/>
                    }
                </div>


            </Style>
        )
    };
export default EventPostCard;
