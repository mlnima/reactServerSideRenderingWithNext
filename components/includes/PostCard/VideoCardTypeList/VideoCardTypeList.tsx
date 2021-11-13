import React from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";
import VideoCardTypeListMedia from "./VideoCardTypeListMedia";
import VideoCardTypeListTitle from "./VideoCardTypeListTitle";
import _qualityConvertor from "../asset/_qualityConvertor";
import {withTranslation} from "next-i18next";
import Link from "next/link";

const VideoCardTypeListStyledDiv = styled.div`
  display: flex;
  width: auto;
  
  *{
    font-size: 12px;
  }
  
  .video-card-list-data {
    position: relative;
    width: 100%;
    min-width: 0;
    
    .metadata{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 20px 3px 0;
      min-width: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      
      .video-card-link{
        .video-card-list-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin: 0 2px;

          .video-card-info-data {
            width: calc(50% - 8px);
            display: flex;
            padding: 0 2px;
            align-items: center;
            margin: 2px 0;
            color: var(--post-element-info-text-color, #ccc);

            span {
              margin: 0 2px;
            }
          }

          .video-card-duration {
            justify-content: flex-end;
          }

          .video-card-views, .video-card-quality {
            justify-content: flex-start;
          }

          .video-card-rating {
            justify-content: flex-end;
            width: calc(50% - 24px);
          }
        }
      }
    }
  }
`

interface VideoCardTypeListPropTypes {
    t: any,
    post: PostTypes,
    cardWidth: number,
    views: string,
    rating: string,
    postElementSize: string,
    onActivateLoadingHandler: any,
    title: string
}

const VideoCardTypeList = (props: VideoCardTypeListPropTypes) => {

    const postUrl = `/post/${props.post.postType}/${props.post._id}`


    return (
        <VideoCardTypeListStyledDiv>
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='video-card-link' title={props.title} onClick={ props.onActivateLoadingHandler}>
                    <VideoCardTypeListMedia postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                </a>
            </Link>

            <div className={'video-card-list-data'}>

                <div className={'metadata'}>
                {/*// @ts-ignore*/}
                   <VideoCardTypeListTitle postUrl={postUrl} onActivateLoadingHandler={props.onActivateLoadingHandler} title={props.title} actors={props.post?.actors} tags={props.post?.tags} categories={props.post?.categories}/>
                    <Link href={postUrl} scroll={false}>
                        <a rel='next' className='video-card-link' title={props.title} onClick={ props.onActivateLoadingHandler}>
                            <span className='video-card-list-info'>
                                {props.post.quality ? <p className='video-card-quality video-card-info-data'>{_qualityConvertor(props.post.quality)} </p> : null}
                                {props.post.duration ? <p className='video-card-duration video-card-info-data'>{props.post.duration} </p> : null}
                                <p className='video-card-views video-card-info-data'><span>{props.views}</span>{props.t(`common:Views`)} </p>
                                <p className='video-card-rating video-card-info-data'><span>{props.rating}</span> % </p>
                            </span>
                        </a>
                    </Link>
                </div>

            </div>

        </VideoCardTypeListStyledDiv>
    );
};
export default withTranslation(['common'])(VideoCardTypeList);
