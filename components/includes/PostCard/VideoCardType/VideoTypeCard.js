import React, {useMemo} from 'react';
import Link from "next/link";
import VideoCardMedia from "./VideoCardMedia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";

const VideoTypeCard = props => {

    const quality = useMemo(() => {
        return props.post.quality === '2160p' ? '4K' :
            props.post.quality === '1440p' ? '2K' :
                props.post.quality === '1080p' ? 'HD' :
                    props.post.quality === '720p' ? 'SD' :
                        props.post.quality === '480p' ? 'SD' :
                            props.post.quality === '360p' ? 'SD' :
                                props.post.quality === '240p' ? 'SD' :
                                    props.post.quality
    }, [])

    const views = useMemo(()=>{
        const viewsNumber = props.post.views || 0
        return  viewsNumber > 1000 && viewsNumber < 1000000 ? (viewsNumber / 1000).toFixed(1) + 'K' :
                viewsNumber > 1000000 ? (viewsNumber / 1000000).toFixed(1) + 'M' :
                viewsNumber
    },[])



    return (
        <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
            <a rel='next' onClick={props.onClickLoadingHandler} className='video-card-link' title={props.title}>
                <style jsx>{`
                  .video-card-link {
                    position: relative;
                    width: ${props.postElementSize === 'list' ? '100%' : '47vw'};
                    margin: 4px;
                    display: flex;
                    flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;

                    .video-card-under-media {
                      width: 100%;
                      height: ${props.postElementSize === 'list' ? 65 : 45}px;
                      color: var(--post-element-text-color);
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;
                      margin-left: ${props.postElementSize === 'list' ? 4 : 0}px;
                      //align-items: center;

                      .video-card-title {
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

                      .video-card-under-media-info {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0;

                        .video-card-views, .video-card-duration, .video-card-quality {
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
                    .video-card-link {
                      width: ${props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
                      flex-direction: ${props.postElementSize === 'list' ? 'row' : 'column'};

                      .video-card-title {
                        width: ${props.postElementSize === 'list' ? `${props.cardWidth - 116.6}px` : `${props.cardWidth}px`};
                      }
                    }
                  }
                `}</style>
                <VideoCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.post.title}/>
                <div className='video-card-under-media'>
                    <h3 className='video-card-title'>{props.title}</h3>
                    <div className='video-card-under-media-info'>
                        {props.post.quality  && props.post.postType === ('video') ? <p className='video-card-quality'>{quality} </p> : null}
                        {props.post.duration  && props.post.postType === ('video') ? <p className='video-card-duration'>{props.post.duration} </p> : null}
                        { props.post.postType === ('video') ? <p className='video-card-views'><span>{  views }</span>  <FontAwesomeIcon icon={faEye} style={{width:'16px',height:'16px'}}/></p> : null}
                    </div>

                </div>

            </a>
        </Link>
    );
};
export default VideoTypeCard;

//`calc(${cardWidth - 116.6}px )`