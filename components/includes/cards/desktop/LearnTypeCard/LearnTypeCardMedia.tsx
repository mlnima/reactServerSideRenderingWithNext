import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

let LearnTypeCardMediaStyledDiv = styled.div`
   width: 100%;
  .learn-post-card-image {
    width: 100%;
    height: calc( 100% / 1.777);
    object-fit: contain;

  }

  @media only screen and (min-width: 768px) {
    .learn-post-card-image {
      width: ${(props: { cardWidth: number, postElementSize: string }) => props.cardWidth}px;
      height: calc(${(props: { cardWidth: number, postElementSize: string }) => props.cardWidth} / 1.777)px;
    }
  }
`

interface LearnTypeCardMediaPropTypes {
    post: PostTypes,
    categoriesImages?: string[],
    postElementSize: string,
    cardWidth: number,
    mediaAlt: string,
    noImageUrl: string,
}

const LearnTypeCardMedia :FC<LearnTypeCardMediaPropTypes> = (props) => {
    const dynamicImage = true
    const [imageUrlToRender, setImageUrlToRender] = useState(() => {
        if (props?.post?.mainThumbnail) {
            return props?.post?.mainThumbnail
        } else if (props?.categoriesImages?.length) {
            return props.categoriesImages[Math.floor(Math.random() * props.categoriesImages.length)]
        }
    })

    useEffect(() => {
        if (dynamicImage && !props?.post?.mainThumbnail && props?.categoriesImages?.length) {
            setInterval(() => {
                setImageUrlToRender(props.categoriesImages[Math.floor(Math.random() * props.categoriesImages.length)])
            }, 7000)
        }
    }, []);

    return (

        <LearnTypeCardMediaStyledDiv className='learn-post-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <CardImageRenderer imageUrl={imageUrlToRender}
                               mediaAlt={props.mediaAlt}
                               cardWidth={props.cardWidth}
                               cardHeight={props.cardWidth/ 1.777}
            />
        </LearnTypeCardMediaStyledDiv>
    );
};
export default LearnTypeCardMedia;

// <img className='learn-post-card-image'
//      alt={props.mediaAlt}
//     //src={props?.post?.mainThumbnail}
//      src={imageUrlToRender}
//      onError={() => setGotError(true)}
// />