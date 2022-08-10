import React, {FC, useState} from 'react'
import isAbsolutePath from "@_variables/util/isAbsolutePath";
import isImageAllowedForNextImage from "@_variables/util/isImageAllowedForNextImage";
import Image from 'next/image'
import styled from "styled-components";

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?: number,
    postsPerRawForMobile: number,
    cardWidth: number,
    title?: string,
}

interface CardImageRendererStylePropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,
}

const CardImageRendererStyle = styled.div`

  width: 100%;
  height: ${({postsPerRawForMobile}: CardImageRendererStylePropTypes) => 96 / postsPerRawForMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
  position: relative;

  img {
    width: 100%;
    height: ${({postsPerRawForMobile}: CardImageRendererStylePropTypes) => 96 / postsPerRawForMobile / 1.777}vw !important;
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
         postsPerRawForMobile,
         index,
         cardWidth,
     }) => {

        const [imageSrc,setImageSrc] = useState(() => imageUrl && !isAbsolutePath(imageUrl) ?
                `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${imageUrl}` :
                imageUrl
            )

        const noImageUrl = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${'/static/images/noImage/no-image-available.png'}`

        return (
            <CardImageRendererStyle postsPerRawForMobile={postsPerRawForMobile}
                                    cardWidth={cardWidth}
                                    className={'card-image'}>

                {(imageSrc && isImageAllowedForNextImage(imageSrc) && index >= 2) ?
                    <Image alt={mediaAlt}
                           src={imageSrc}
                           loading={'lazy'}
                           layout={'fill'}
                           className={'card-image-next'}
                           quality={80}
                           objectFit={'cover'}
                           onError={() => setImageSrc(noImageUrl)}
                    /> :
                    <img src={imageSrc}
                         alt={mediaAlt}
                         className={'card-image'}
                         onError={({currentTarget }) =>currentTarget.src= noImageUrl}
                    />
                }

            </CardImageRendererStyle>
        )

    };
export default CardImageRenderer


// if (imageUrlSource && isImageAllowedForNextImage(imageUrlSource)  && index >= 2 )
//     return <MobileCardImageNext imageUrl={imageUrlSource} mediaAlt={mediaAlt} isAppleMobileDevice={isAppleMobileDevice}/>
//
// else return  <MobileCardImage imageUrl={imageUrlSource} mediaAlt={mediaAlt} isAppleMobileDevice={isAppleMobileDevice}/>