import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";
//  width: ${(props: { cardWidth: number, postElementSize: string }) => props.postElementSize === 'list' ? '116.6px' : '100%'};
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

const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(48vw / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: var(--post-element-info-text-color, #ccc);
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth?: number }) => props?.cardWidth}px;
    height: calc(${(props: { cardWidth?: number }) => props?.cardWidth}px / 1.777);
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

const LearnTypeCardMedia = (props: LearnTypeCardMediaPropTypes) => {
    const dynamicImage = true
    const [gotError, setGotError] = useState(false)
    const [imageUrlToRender, setImageUrlToRender] = useState(() => {
        if (props?.post?.mainThumbnail) {
            return props?.post?.mainThumbnail
        } else if (props?.categoriesImages?.length) {
            return props.categoriesImages[Math.floor(Math.random() * props.categoriesImages.length)]
        } else {
            setGotError(true)
        }
    })

    useEffect(() => {
        if (dynamicImage && !props?.post?.mainThumbnail && props?.categoriesImages?.length) {
            setInterval(() => {
                setImageUrlToRender(props.categoriesImages[Math.floor(Math.random() * props.categoriesImages.length)])
            }, 7000)
        }
    }, []);

    const errorHandler = () => {
        !gotError ? setGotError(true) : null
    }

    if ((!props?.post?.mainThumbnail || gotError) && !props?.categoriesImages?.length) {
        return (
            // @ts-ignore
            <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        )
    } else return (
        // @ts-ignore
        <LearnTypeCardMediaStyledDiv className='learn-post-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <CardImageRenderer imageUrl={imageUrlToRender}
                               mediaAlt={props.mediaAlt}
                               cardWidth={props.cardWidth}
                               cardHeight={props.cardWidth/ 1.777}
                               errorHandler={errorHandler}
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