import React, {useEffect, useState, useContext, useRef,useMemo} from 'react';
import Link from "next/link";
import {faEye, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import ArticleCardMedia from "./ArticleCardMedia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ArticleTypeCard = props => {
    const views = useMemo(()=>{
        const viewsNumber = props.post.views || 0
        return  viewsNumber > 1000 && viewsNumber < 1000000 ? (viewsNumber / 1000).toFixed(1) + 'K' :
            viewsNumber > 1000000 ? (viewsNumber / 1000000).toFixed(1) + 'M' :
                viewsNumber
    },[])
    return (
        <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
            <a rel='next' onClick={props.onClickLoadingHandler} className='article-card-link' title={props.title}>
                <style jsx>{`
                  .article-card-link {
                    position: relative;
                    width: ${props.postElementSize === 'list' ? '100%' : '47vw'};
                    margin: 4px;
                    display: flex;
                    flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;

                    .article-card-under-media {
                      width: 100%;
                      height: ${props.postElementSize === 'list' ? 65 : 45}px;
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
                        -webkit-line-clamp: ${props.postElementSize === 'list' ? 2 : 1};
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

                        .article-card-views, .article-card-likes, .article-card-dislikes {
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          margin: 0;
                          span{
                           margin: 0 2px;
                          }
                        }
                      }

                    }
                  }


                  @media only screen and (min-width: 768px) {
                    .article-card-link {
                      width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                      flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};

                      .article-card-title {
                        width: ${props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `${props.cardWidth}px`};
                      }
                    }
                  }
                `}</style>
                <ArticleCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                <div className='article-card-under-media'>
                    <h3 className='article-card-title'>{props.title}</h3>
                    <div className='article-card-under-media-info'>
                        { props.post.postType === ('article') ? <p className='article-card-views'><span>{  views }</span>  <FontAwesomeIcon icon={faEye} style={{width:'16px',height:'16px'}}/></p> : null}
                        {props.post.postType === ('article') ? <p className='article-card-likes'><span>{props.post.likes || 0}</span> <FontAwesomeIcon icon={faThumbsUp} style={{width: '16px', height: '16px'}}/></p> : null}
                        {props.post.postType === ('article') ? <p className='article-card-dislikes'><span>{props.post.disLikes || 0}</span> <FontAwesomeIcon icon={faThumbsDown} style={{width: '16px', height: '16px'}}/></p> : null}
                    </div>
                </div>
            </a>
        </Link>
    );
};
export default ArticleTypeCard;
