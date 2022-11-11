import {FC} from "react";
import styled from "styled-components";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "../asset/CardTitle/CardTitle";

const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer'))

const ActorCardStyle = styled.article`
  background-color: var(--secondary-background-color, #181818);
  width: 100%;
  margin: 20px auto;
  font-size: 14px;

  .actor-card-link {
    width: 100%;
    color: var(--secondary-text-color, #ccc);

    .card-image {
      margin: auto;
      display: flex;
      justify-content: center;
      width: 140px !important;
      height: 140px !important;
      position: relative;

      img {
        object-fit: cover;
        width: 140px !important;
        height: 140px !important;
      }

      span {
        img {
          object-fit: cover !important;
          width: 140px !important;
          height: 140px !important;
        }
      }
    }

    .entry-header {
      .card-header {
        color: var(--main-active-color) !important;

        &:hover {
          color: var(--secondary-text-color, #ccc) !important;
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: ActorCardStylePropTypes) => cardWidth}px;
    height: ${({cardWidth}: ActorCardStylePropTypes) => cardWidth}px;
  }
`


interface ActorCardPropTypes {
    meta: Meta,
    index?: number,
    postsPerRawForMobile: number,
    cardWidth: number,
}

interface ActorCardStylePropTypes {
    postsPerRawForMobile: number,
    cardWidth: number
}

const ActorCard: FC<ActorCardPropTypes> =
    ({
         meta,
         index,
         postsPerRawForMobile,
         cardWidth
     }) => {

        const actorName = capitalizeFirstLetter(meta?.name)

        return (
            <ActorCardStyle cardWidth={cardWidth} className={'actor-card'} postsPerRawForMobile={postsPerRawForMobile}>
                <Link href={`/actor/${meta?._id}`} className='actor-card-link' title={actorName as string}>
                        {!!meta.imageUrl ?
                            <CardImageRenderer imageUrl={meta.imageUrl}
                                               mediaAlt={actorName}
                                               index={index}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/> :
                            <TextToCanvasImage title={actorName}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/>
                        }
                        <CardTitle title={actorName}/>
                </Link>
            </ActorCardStyle>
        )
    };
export default ActorCard
