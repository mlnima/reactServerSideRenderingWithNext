import React, {useEffect, useState, useContext, useRef} from 'react';
import PostElementImage from "./PostElementImage";
import Link from "next/link";
import PostElementTitle from "./PostElementTitle";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import styled from "styled-components";

const PromotionTypeCardStyledDiv = styled.div`
  width: 48vw;
  height: calc(48vw / 1.777 + 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: ${props => props?.mainThumbnail ? 'none' : 'solid .2px var(--post-element-text-color)'};

  .no-image-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--main-active-color, #f90);
    text-align: center;
    overflow: hidden;
    text-overflow: clip;
  }

  .post-element-link-internal {
    color: var(--post-element-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
    margin: 0;

    .detail {
      margin: 0 5px;
      max-width: 80%;
      font-size: 1rem;
      overflow: hidden;
      word-wrap: break-word;
      font-weight: initial;
      white-space: nowrap;
    }
  }

  @media only screen and (min-width: 768px) {
    width: ${props => props.imageSize.width}px;
    height: ${props => props.imageSize.height + 40}px;

    .post-element-link-internal {
      .detail {
        font-size: 1rem;
      }
    }
  }
`

const PromotionTypeCard = props => {

    return (
        <PromotionTypeCardStyledDiv className='post-element-link' mainThumbnail={props?.mainThumbnail} imageSize={props.imageSize}>
            <a href={props.redirectLink}>
                {props.mainThumbnail ?
                    <ImageRenderer
                        imageUrl={props.mainThumbnail}
                        altValue={props.title || props.mainThumbnail}
                        hoverHandler={props.isHoverHandler}
                        title={props.title}
                        widgetId={props.widgetId}
                        loading={props.postElementImageLoaderType}
                        postElementSize={props.postElementSize}
                        imageSize={props.imageSize}
                        postElementImageLoader={props.postElementImageLoader}
                        layout='fill'
                        classNameValue='post-element-image'
                        contentId={props._id}/> :
                    <p className='no-image-title'>{props.title}</p>}
            </a>
            <Link href={`/post/${props.postType}/${props._id}`} scroll={false}>
                <a rel='next' onClick={props.onClickLoadingHandler} className='post-element-link-internal'>
                    <p className='detail'>{props.title} </p>

                </a>
            </Link>
        </PromotionTypeCardStyledDiv>
    );
};
export default PromotionTypeCard;

// <FontAwesomeIcon style={{width: '20px', height: '20px', }} icon={faSearch} />