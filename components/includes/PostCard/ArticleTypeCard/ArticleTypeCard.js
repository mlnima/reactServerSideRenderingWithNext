import React, {useEffect, useState, useContext, useRef, useMemo} from 'react';
import Link from "next/link";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import ArticleCardMedia from "./ArticleCardMedia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {likeValueCalculator} from "../../../../_variables/_variables";
import CardMetaData from "../asset/CardMetaData/CardMetaData";
import _ from "lodash";

const ArticleTypeCard = props => {


    const metaPreview = [...(props.post.actors || []), ...(props.post.categories || []), ...(props.post.tags || [])]


    return (
        <div className='article-card'>
            <style jsx>{`
              .article-card {
                width: ${props.postElementSize === 'list' ? '100%' : '47vw'};
                display: flex;
                flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                align-items: center;
                justify-content: center;

                .card-meta {
                  width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                  max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                  display: flex;
                  flex-wrap: wrap;
                  height: 100%;
                }

                .article-card-link {
                  position: relative;
                  width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                  max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                  margin: 4px;
                  display: flex;
                  flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                  align-items: center;
                  justify-content: space-between;
                  text-decoration: none;

                  .article-card-under-media {
                    width: 100%;
                    height: ${props.postElementSize === 'list' ? '65px' : 'auto'};
                    color: var(--post-element-text-color);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: ${props.postElementSize === 'list' ? 4 : 0}px;
                    //align-items: center;

                    .article-card-title {
                      text-overflow: ellipsis;
                      overflow: hidden;
                      display: -webkit-box !important;
                      -webkit-line-clamp: ${props.postElementSize === 'list' ? 1 : 1};
                      -webkit-box-orient: vertical;
                      white-space: normal;
                      font-size: 1rem;
                      margin: 2px 0;
                      //white-space: nowrap;
                      width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                      max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                    }

                    .article-card-under-media-info {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin: 0;
                      height: 20px;

                      .video-card-info-data {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0;
                        span {
                          margin: 0 2px;
                        }
                      }
                      
                      .video-card-rating{
                        background: url('/public/asset/images/icons/ico-rating-positive.png') no-repeat right;
                        padding: 0 20px 0 0 ;
                      }
                      
                    }

                  }
                }
              }


              @media only screen and (min-width: 768px) {
                .article-card {
                   width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                   flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                  .article-card-link {
                   // width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                    flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};

                    .article-card-title {
                      width: ${props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `${props.cardWidth}px`};
                    }
                  }
                }

              }
            `}</style>

            <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
                <a rel='next' onClick={props.onClickLoadingHandler} className='article-card-link' title={props.title}>

                    <ArticleCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                    <div className='article-card-under-media'>
                        <h3 className='article-card-title'>{props.title}</h3>
                        <div className='article-card-under-media-info'>
                            {props.post.postType === ('article') ? <span className='article-card-views video-card-info-data'><span>{props.views}</span> views</span> : null}
                            {props.post.postType === ('article') ? <span className='video-card-rating video-card-info-data'><span>{props.rating}</span> % </span> : null}
                        </div>
                    </div>
                </a>
            </Link>
            {props.postElementSize !== 'list' ?
                <span className='card-meta'>
                {(metaPreview || []).filter(meta => meta.name.length > 1).map(meta => {
                    return (
                        <CardMetaData meta={meta} key={_.uniqueId('meta_')}/>
                    )
                })}
            </span> : null
            }
        </div>

    );
};
export default ArticleTypeCard;
