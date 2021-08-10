import React, {useMemo} from 'react';
import Link from "next/link";
import VideoCardMedia from "./VideoCardMedia";
import _ from "lodash";
import CardMetaData from "../asset/CardMetaData/CardMetaData";

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

    const metaPreview = [...(props.post.actors || []), ...(props.post.categories || []), ...(props.post.tags || [])]

    return (
        <div className='video-card'>
            <style jsx>{`
              .video-card {
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

                .video-card-link {
                  position: relative;
                  width: ${props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
                  max-width: ${props.postElementSize === 'list' ? `50vw` : `calc(100% - 4px)`};
                  margin: 4px;
                  display: flex;
                  flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                  align-items: center;
                  justify-content: space-between;
                  text-decoration: none;

                  .video-card-under-media {
                    width: 100%;
                    height: ${props.postElementSize === 'list' ? '65px' : 'auto'};
                    color: var(--post-element-text-color);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: ${props.postElementSize === 'list' ? 4 : 0}px;

                    .video-card-title {
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


                    .video-card-under-media-info {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      flex-wrap: wrap;
                      margin: 0;

                      .video-card-info-data {
                        width: calc(50% - 4px);
                        display: flex;
                        padding: 0 2px;
                        align-items: center;
                        margin: 0;
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
                        background: url('/public/asset/images/icons/ico-rating-positive.png') no-repeat right;
                        padding: 0 20px 0 0 ;
                      }

                    }

                  }
                }



              }
                @media only screen and (min-width: 768px) {
                  .video-card {
                   width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                   flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                    .video-card-link {
                      flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                      .video-card-title {
                        width: ${props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `${props.cardWidth}px`};
                      }
                    }
                  }
                }


            `}</style>

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
            {props.postElementSize !== 'list'?
            <span className='card-meta'>
                {(metaPreview || []).filter(meta=>meta.name.length > 1).map(meta => {
                    return (
                        <CardMetaData meta={meta} key={_.uniqueId('meta_')}/>
                    )
                })}
            </span>:null
            }
        </div>
    );
};
export default VideoTypeCard;

//`calc(${cardWidth - 116.6}px )`