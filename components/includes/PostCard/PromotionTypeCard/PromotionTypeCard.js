import React, {useEffect, useState, useContext, useRef, useMemo} from 'react';
import Link from "next/link";
import PromotionCardMedia from "./PromotionCardMedia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";

const PromotionTypeCard = props => {


    const views = useMemo(() => {
        const viewsNumber = props.post.views || 0
        return viewsNumber > 1000 && viewsNumber < 1000000 ? (viewsNumber / 1000).toFixed(1) + 'K' :
            viewsNumber > 1000000 ? (viewsNumber / 1000000).toFixed(1) + 'M' :
                viewsNumber
    }, [])

    const onExternalLinkClickViewHandler =()=>{
        likeDislikeView(props.post._id, 'views')
    }


    return (
        <div className='promotion-card'>
            <style jsx>{`
              .promotion-card {
                position: relative;
                width: ${props.postElementSize === 'list' ? '100%' : '47vw'};
                margin: 4px;
                display: flex;
                flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                align-items: center;
                justify-content: center;
              }

              .promotion-card-link-external {
                width: 100%;
              }

              .promotion-card-under-media {
                width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                height: 85px ;

                .promotion-card-link-internal {
                  width: 100%;
                  text-decoration: none;
                  color: var(--post-element-text-color);

                  .video-card-under-media-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 0;

                  }

                  .video-card-views {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0;

                    span {
                      margin: 0 2px;
                    }
                  }

                  .promotion-card-title {
                   font-size: 1rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box !important;
                    -webkit-line-clamp: ${props.postElementSize === 'list' ? 2 : 1};
                    -webkit-box-orient: vertical;
                    white-space: normal;
                    margin: 2px 0;
                    width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                    max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                  }
                  .promotion-card-read-more{
                  text-align: center;
                  margin: 0;
                  height: 40px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: calc(100% - 30px);
                                      text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box !important;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    white-space: normal;
                    span{
                    margin: 0 4px;
                    }
                  }
                }
              }


              @media only screen and (min-width: 768px) {
                .promotion-card {
                  width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                  flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};

                  .promotion-card-under-media {
                    width: 100%;

                    .promotion-card-link-internal {
                      width: 100%;

                      .promotion-card-title {
                        width: ${props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `100%;`};
                      }
                    }
                  }


                }
              }

            `}</style>
            <a href={props.post.redirectLink} className='promotion-card-link-external' onClick={onExternalLinkClickViewHandler}>
                <PromotionCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
            </a>
            <div className='promotion-card-under-media'>
                <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
                    <a rel='next' onClick={props.onClickLoadingHandler} className='promotion-card-link-internal'>
                        <h3 className='promotion-card-title'>{props.title} </h3>
                        <h4 className='promotion-card-read-more'>Read More about {props.post.title} <span><FontAwesomeIcon icon={faInfoCircle} style={{width: '16px', height: '16px'}}/></span> </h4>
                        <div className='video-card-under-media-info'>
                            {props.post.postType === ('promotion') ? <p className='video-card-views'><span>{views}</span> <FontAwesomeIcon icon={faEye} style={{width: '16px', height: '16px'}}/></p> : null}
                            {props.post.postType === ('promotion') ? <p className='video-card-views'><span>{props.post.likes || 0}</span> <FontAwesomeIcon icon={faThumbsUp} style={{width: '16px', height: '16px'}}/></p> : null}
                            {props.post.postType === ('promotion') ? <p className='video-card-views'><span>{props.post.disLikes || 0}</span> <FontAwesomeIcon icon={faThumbsDown} style={{width: '16px', height: '16px'}}/></p> : null}
                        </div>
                    </a>
                </Link>
            </div>

        </div>
    );
};
export default PromotionTypeCard;
//${props.postElementSize === 'list' ? 65 : 45}px