import Link from "next/link";
import VideoCardMedia from "./VideoCardMedia";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import VideoCardTitle from "./VideoCardTitle";
import _qualityConvertor from "../asset/_qualityConvertor";
import {faEye,faClock} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

let VideoCardStyledArticle = styled.article`
  width: calc(48vw - 5.6px);
  max-width: calc(50vw - 5.6px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;
  
  .video-card-media-link{
      position: relative;
      .video-card-info-data{
        color: var(--main-active-color, #ccc);
        background-color: rgba(0,0,0,0.5);
        margin: 0;
        --video-card-info-distance:3px;
        position: absolute;
        padding: 2px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        font-size: 12px;
        .icon{
          width: 14px;
          height: 14px;
          margin: 0 2px;
          
        }
        .thumbs-up{
          width: 12px;
          height: 12px;
        }
      }
        .video-card-quality{
          top:var(--video-card-info-distance,2px);
          left:var(--video-card-info-distance,2px);
        }
        .video-card-duration{
          top:var(--video-card-info-distance,2px);
          right:var(--video-card-info-distance,2px);
        }
        .video-card-views{
          bottom:var(--video-card-info-distance,2px);
          right:var(--video-card-info-distance,2px);
        }
        .video-card-rating{
          bottom:var(--video-card-info-distance,2px);
          left:var(--video-card-info-distance,2px);
        }
  }
  
  .last-update{
    font-size: 9px;
    align-self: flex-start;
    
  }
  
  @media only screen and (min-width: 768px) {
    width: ${props => `${props?.cardWidth}px`};
    max-width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin: 7px;
    font-size: 14px;
  }
`


const VideoTypeCard = (props) => {
    const postUrl = `/post/${props.post.postType}/${props.post._id}`
    return (
        <VideoCardStyledArticle className={'video-card'} cardWidth={props.cardWidth} postElementSize={props.postElementSize}>
            <Link href={postUrl} scroll={false}>
                <a rel={'next'} className={'video-card-media-link'} title={props.title} onClick={props.onActivateLoadingHandler}>
                    <VideoCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                        <p className={'video-card-quality video-card-info-data'}>
                            {props.post.quality ? _qualityConvertor(props.post.quality) : ''}
                        </p>
                        <p className={'video-card-duration video-card-info-data'}>
                            {props.post.duration ? <>
                                {props.post.duration}
                                <FontAwesomeIcon icon={faClock} className={'icon'}/>
                            </> : null }
                        </p>
                        <p className={'video-card-views video-card-info-data'}>
                            {props.views ?
                                <>
                                    <span>{props.views}</span>
                                    <FontAwesomeIcon icon={faEye} className={'icon'}/>
                                </>
                                : null
                            }
                        </p>
                        <p className={'video-card-rating video-card-info-data'}>
                            <FontAwesomeIcon icon={faThumbsUp} className={'icon thumbs-up'}/>
                            <span>{props.rating || 0}%</span>
                        </p>
                </a>
            </Link>
            <VideoCardTitle postUrl={postUrl} onActivateLoadingHandler={props.onActivateLoadingHandler} cardWidth={props.cardWidth} title={props.title} actors={props.post?.actors} tags={props.post?.tags} categories={props.post?.categories}/>
            {props.post?.updatedAt ?
                <span className={'last-update'}>
                    {moment(new Date(props.post?.updatedAt), 'YYYYMMDD').fromNow(false)}
                </span>
                :null
            }

        </VideoCardStyledArticle>
    );
};
export default withTranslation(['common'])(VideoTypeCard);
