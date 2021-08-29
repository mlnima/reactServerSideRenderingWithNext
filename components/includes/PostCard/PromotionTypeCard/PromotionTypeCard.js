import React from 'react';
import Link from "next/link";
import PromotionCardMedia from "./PromotionCardMedia";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import _ from "lodash";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";
import styled from "styled-components";


let PromotionCardStyledDiv = styled.div`
  position: relative;
  width: ${props => props.postElementSize === 'list' ? '100%' : '48vw'};
  max-width: ${props => props.postElementSize === 'list' ? '100%' : '48vw'};
  margin: 2.8px;
  display: flex;
  flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
  background-color: var(--post-element-background-color);
  font-size: 12px;
  padding-bottom: 5px;

  .promotion-card-link-external {
    width: ${props => props.postElementSize === 'list' ? '116.6px' : '100%'};
  }

  .promotion-card-under-media {
    width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    margin-left: ${props => props.postElementSize === 'list' ? 4 : 0}px;
    height: ${props => props.postElementSize === 'list' ? 65 : 45}px;


    .promotion-card-link-internal {
      height: ${props => props.postElementSize === 'list' ? 65 : 45}px;
      width: 100%;
      text-decoration: none;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .promotion-card-under-media-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 2px;
        padding: 0 2px;
        color: var(--post-element-info-text-color);

        .promotion-card-views {
          height: 12px;
          margin: 0;
        }
      }

      .promotion-card-title {
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: initial;
        display: -webkit-box !important;
        -webkit-line-clamp: ${props => props.postElementSize === 'list' ? 1 : 1};
        -webkit-box-orient: vertical;
        color: var(--post-element-text-color);
        white-space: normal;
        margin: 2px;
        padding: ${props => props.postElementSize === 'list' ? 0 : '5px'} 2px;
        width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
        max-width: ${props => props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};


      }
    }

    &:hover {
      filter: invert(70%);
    }
  }

  @media only screen and (min-width: 768px) {

    width: ${props => props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
    max-width: ${props => props.postElementSize === 'list' ? `320px` : `100%`};
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    margin: 7px;

    .promotion-card-under-media {
      width: 100%;
      font-size: 14px;

      .promotion-card-link-internal {
        width: 100%;

        .promotion-card-title {
            // width: ${props => props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `100%;`};
          width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
          max-width: ${props => props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
          font-size: 14px;
        }
      }
    }


  }

`

const PromotionTypeCard = props => {

    const onExternalLinkClickViewHandler = () => {
        likeDislikeView(props.post._id, 'views')
    }

    const metaPreviewData = [...(props.post.actors || []), ...(props.post.tags || []), ...(props.post.categories || [])]
    const metaPreview = _.uniqBy(metaPreviewData, function (e) {
        return e.name;
    })

    return (
        <PromotionCardStyledDiv className='promotion-card' cardWidth={props.cardWidth} postElementSize={props.postElementSize}>

            <a href={props.post.redirectLink} className='promotion-card-link-external' onClick={onExternalLinkClickViewHandler} target='_blank' rel="nofollow noopener">
                <PromotionCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
            </a>
            <div className='promotion-card-under-media'>
                <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
                    <a rel='next' onClick={props.onClickLoadingHandler} className='promotion-card-link-internal'>
                        <h3 className='promotion-card-title'>{props.title} </h3>
                        <div className='promotion-card-under-media-info'>
                            <p className='promotion-card-views'><span>{props.views}</span> views</p>
                            <span className='promotion-card-rating video-card-info-data'><span>{props.rating}</span> % </span>
                        </div>
                    </a>
                </Link>
            </div>
            {props.postElementSize !== 'list' ? <CardMetaRenderer metaPreview={metaPreview} postElementSize={props.postElementSize}/> : null}
        </PromotionCardStyledDiv>
    );
};
export default PromotionTypeCard;
//${props.postElementSize === 'list' ? 65 : 45}px


// <style jsx>{`
//               .promotion-card {
//                 position: relative;
//                 width: ${props.postElementSize === 'list' ? '100%' : '47vw'};
//                 margin: 2.8px;
//                 display: flex;
//                 flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
//                 align-items: center;
//                 justify-content: center;
//                 background-color: var(--post-element-background-color);
//                 font-size: 12px;
//                 padding-bottom: 5px;
//               }
//
//               .promotion-card-link-external {
//                 width: ${props.postElementSize === 'list' ? '116.6px' : '100%'};
//               }
//
//               .promotion-card-under-media {
//                 width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
//                 margin-left: ${props.postElementSize === 'list' ? 4 : 0}px;
//                 height: ${props.postElementSize === 'list' ? 65 : 45}px;
//
//
//                 .promotion-card-link-internal {
//                   height: ${props.postElementSize === 'list' ? 65 : 45}px;
//                   width: 100%;
//                   text-decoration: none;
//
//                   display: flex;
//                   flex-direction: column;
//                   justify-content: space-evenly;
//
//                   .promotion-card-under-media-info {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                     margin: 0 2px;
//                     padding: 0 2px;
//                     color: var(--post-element-info-text-color);
//
//                     .promotion-card-views {
//                       height: 12px;
//                       margin: 0;
//                     }
//                   }
//
//                   .promotion-card-title {
//                     font-size: 12px;
//                     text-overflow: ellipsis;
//                     overflow: hidden;
//                     font-weight: initial;
//                     display: -webkit-box !important;
//                     -webkit-line-clamp: ${props.postElementSize === 'list' ? 1 : 1};
//                     -webkit-box-orient: vertical;
//                     color: var(--post-element-text-color);
//                     white-space: normal;
//                     margin: 2px;
//                     padding: 0 2px;
//                     width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
//                     max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
//
//
//                   }
//                 }
//
//                 &:hover {
//                   filter: invert(70%);
//                 }
//               }
//
//               @media only screen and (min-width: 768px) {
//                 .promotion-card {
//                   width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
//                   max-width: ${props.postElementSize === 'list' ? `320px` : `100%`};
//                   flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
//                   margin: 7px;
//
//                   .promotion-card-under-media {
//                     width: 100%;
//                     font-size: 14px;
//
//                     .promotion-card-link-internal {
//                       width: 100%;
//
//                       .promotion-card-title {
//                           // width: ${props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `100%;`};
//                         width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
//                         max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
//                         font-size: 14px;
//                       }
//                     }
//                   }
//
//
//                 }
//               }
//
//             `}</style>