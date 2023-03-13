import React, {FC} from 'react';
import styled from "styled-components";

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index: number,
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
    title?: string,
}

interface CardImageRendererStylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

const CardImageRendererStyle = styled.div`

  width: 100%;
  height: ${({numberOfCardsPerRowInMobile}: CardImageRendererStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
  position: relative;

  img {
    width: 100%;
    height: ${({numberOfCardsPerRowInMobile}: CardImageRendererStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw !important;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth}px;
    height: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth / 1.777}px !important;
    img {
      width: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth}px;
      height: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth / 1.777}px !important;
    }
  }
`


const CardImageRenderer: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         numberOfCardsPerRowInMobile,
         index,
         cardWidth,
     }) => {

        const onErrorHandler = (e) => {
            setTimeout(() => {
                if (e?.target){
                    e.target.src = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/asset/images/default/no-image-available.png`
                }
            }, 500)
        }

        const loadingAttr = index > 1 ? {loading: 'lazy'} : {}
        return (
            <CardImageRendererStyle numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                    cardWidth={cardWidth}
                                    className={'card-image'}>
                {/*// @ts-ignore*/}
                <img src={imageUrl}
                     alt={mediaAlt}
                     {...loadingAttr}
                     className={'card-image'}
                     onError={(e) => onErrorHandler(e)}
                />

            </CardImageRendererStyle>
        )

    };

export default CardImageRenderer
