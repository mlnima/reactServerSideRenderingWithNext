import React, {useEffect, useState, useContext, useRef, useMemo} from 'react';
import Link from "next/link";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import ArticleCardMedia from "./ArticleCardMedia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {likeValueCalculator} from "../../../../_variables/_variables";
import CardMetaData from "../asset/CardMetaData/CardMetaData";
import _ from "lodash";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";

const ArticleTypeCard = props => {


    const metaPreviewData = [...(props.post.actors || []), ...(props.post.tags || []), ...(props.post.categories || [])]
    const metaPreview = _.uniqBy(metaPreviewData, function (e) {
        return e.name;
    })


    return (
        <div className='article-card'>
            <style jsx>{`
              .article-card {
                width: ${props.postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
                max-width: ${props.postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
                display: flex;
                flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                align-items: center;
                justify-content: center;
                background-color: var(--post-element-background-color);
                margin: 2.8px;
                font-size: 12px;
                padding-bottom: 5px;

                .article-card-link {
                  position: relative;
                  width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                  max-width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
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
                      font-size: 12px;
                      font-weight: initial;
                      margin: 2px 0;
                      width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                      max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};

                      &:hover {
                        filter: invert(70%);
                      }
                      
                    }

                    .article-card-under-media-info {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      flex-wrap: wrap;
                      margin: 0;
                      height: 20px;

                      .article-card-info-data {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 2px 0;
                        padding: 0 2px;

                        span {
                          margin: 0 2px;
                        }
                      }


                    }

                  }
                }
              }


              @media only screen and (min-width: 768px) {
                .article-card {
                  width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                  max-width: ${props.postElementSize === 'list' ? `320px` : `100%`};
                  flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};

                  margin: 7px;

                  .article-card-link {
                      // width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                    flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};

                    .article-card-under-media {
                      .article-card-title {

                        width: ${props.postElementSize === 'list' ? `100%` : `${props.cardWidth}px`};
                        font-size: 14px;
                      }
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
                            {props.post.postType === ('article') ? <span className='article-card-views article-card-info-data'><span>{props.views}</span> views</span> : null}
                            {props.post.postType === ('article') ? <span className='article-card-rating article-card-info-data'><span>{props.rating}</span> % </span> : null}
                        </div>
                    </div>
                </a>
            </Link>
            {props.postElementSize !== 'list' ? <CardMetaRenderer metaPreview={metaPreview} postElementSize={props.postElementSize}/> : null}

        </div>

    );
};
export default ArticleTypeCard;
