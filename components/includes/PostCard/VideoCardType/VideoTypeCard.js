import React, {useMemo} from 'react';
import Link from "next/link";
import VideoCardMedia from "./VideoCardMedia";
import _ from "lodash";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";
import styled from "styled-components";

let VideoCard = styled.div`
  width: ${props => props.postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
  max-width: ${props => props.postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
  display: flex;
  flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
  background-color: var(--post-element-background-color);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;


  .video-card-link {
    position: relative;
    width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    max-width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    margin: 4px;
    display: flex;
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    .video-card-under-media {
      width: 100%;
      height: ${props => props.postElementSize === 'list' ? '65px' : 'auto'};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: ${props => props.postElementSize === 'list' ? 4 : 0}px;

      .video-card-title {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box !important;
        color: var(--post-element-text-color);
        -webkit-line-clamp: ${props => props.postElementSize === 'list' ? 1 : 1};
        -webkit-box-orient: vertical;
        font-weight: initial;
        white-space: normal;
        font-size: 12px;
        margin: 4px 2px;
        width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
        max-width: ${props => props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
        padding: ${props => props.postElementSize === 'list' ? 0 : '5px'} 2px;

        &:hover {
          filter: invert(70%);
        }
      }


      .video-card-under-media-info {
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
          color: var(--post-element-info-text-color);

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
          //background: url('/public/asset/images/icons/ico-rating-positive.png') no-repeat right;
          //  padding: 0 20px 0 0;
        }

      }

    }
  }

  @media only screen and (min-width: 768px) {

    width: ${props => props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
    max-width: ${props => props.postElementSize === 'list' ? `320px` : `100%`};
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    margin: 7px;
    font-size: 14px;

    .video-card-link {
      flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};

      .video-card-under-media {
        margin: 8px;

        .video-card-title {
          width: ${props => props.postElementSize === 'list' ? `100%` : `${props.cardWidth}px`};
          font-size: 14px;

        }
      }


    }

  }
`


const VideoTypeCard = props => {


    const quality = useMemo(() => {
        return props.post.quality === '2160p' ? '4K' :
            props.post.quality === '1440p' ? '2K' :
                props.post.quality === '1080p' ? 'HD' :
                    props.post.quality === '720p' ? 'HD' :
                        props.post.quality === '480p' ? 'SD' :
                            props.post.quality === '360p' ? 'SD' :
                                props.post.quality === '240p' ? 'SD' :
                                    props.post.quality
    }, [])

    const metaPreviewData = [...(props.post.actors || []), ...(props.post.tags || []), ...(props.post.categories || [])]
    const metaPreview = _.uniqBy(metaPreviewData, function (e) {
        return e.name;
    })

    return (
        <VideoCard className='video-card' cardWidth={props.cardWidth} postElementSize={props.postElementSize}>


            <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
                <a rel='next' onClick={props.onClickLoadingHandler} className='video-card-link' title={props.title}>

                    <VideoCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                    <span className='video-card-under-media'>
                    <h3 className='video-card-title'>{props.title}</h3>

                    <span className='video-card-under-media-info'>
                        {props.post.quality && props.post.postType === ('video') ? <p className='video-card-quality video-card-info-data'>{quality} </p> : null}
                        {props.post.duration && props.post.postType === ('video') ? <p className='video-card-duration video-card-info-data'>{props.post.duration} </p> : null}
                        {props.post.postType === ('video') ? <p className='video-card-views video-card-info-data'><span>{props.views}</span> views </p> : null}
                        {props.post.postType === ('video') ? <p className='video-card-rating video-card-info-data'><span>{props.rating}</span> % </p> : null}
                    </span>

                   </span>
                </a>
            </Link>
            {props.postElementSize !== 'list' ? <CardMetaRenderer metaPreview={metaPreview} postElementSize={props.postElementSize}/> : null}
        </VideoCard>
    );
};
export default VideoTypeCard;

//`calc(${cardWidth - 116.6}px )`

//max-width: ${props.postElementSize === 'list' ? `320px` : `calc(100% - 4px)`};