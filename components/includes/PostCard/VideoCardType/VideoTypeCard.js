import Link from "next/link";
import VideoCardMedia from "./VideoCardMedia";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import VideoCardTitle from "./VideoCardTitle";
import _qualityConvertor from "../asset/_qualityConvertor";

let VideoCardStyledDiv = styled.div`
  width: calc(48vw - 5.6px);
  max-width: calc(50vw - 5.6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--post-element-background-color, #131314);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;

  .video-card-under-media {
  
    width: calc(50vw - 5.6px);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0;
//.video-card-title{
//  transition: all 5s ;
//}
    
    .video-card-link {

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
  


  @media only screen and (min-width: 768px) {
    width: ${props => `${props?.cardWidth}px`};
    max-width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin: 7px;
    font-size: 14px;
    .video-card-link {
      flex-direction: column;
    }

    .video-card-under-media {
      width: 100%;
      margin: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }
`


const VideoTypeCard = (props) => {
    const postUrl = `/post/${props.post.postType}/${props.post._id}`
    return (
        <VideoCardStyledDiv className='video-card' cardWidth={props.cardWidth} postElementSize={props.postElementSize}>
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='video-card-image-link' title={props.title} onClick={props.onActivateLoadingHandler}>
                    <VideoCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                </a>
            </Link>
            <span className='video-card-under-media'>
                <VideoCardTitle postUrl={postUrl} onActivateLoadingHandler={props.onActivateLoadingHandler} cardWidth={props.cardWidth} title={props.title} actors={props.post?.actors} tags={props.post?.tags} categories={props.post?.categories}/>
                <Link href={postUrl} scroll={false}>
                    <a rel='next' className='video-card-link' title={props.title} onClick={props.onActivateLoadingHandler}>
                        <span className='video-card-under-media-info'>
                        {props.post.quality && props.post.postType === ('video') ? <p className='video-card-quality video-card-info-data'>{_qualityConvertor(props.post.quality)} </p> : null}
                        {props.post.duration && props.post.postType === ('video') ? <p className='video-card-duration video-card-info-data'>{props.post.duration} </p> : null}
                        {props.post.postType === ('video') ? <p className='video-card-views video-card-info-data'><span>{props.views}</span>{props.t(`common:Views`)} </p> : null}
                        {props.post.postType === ('video') ? <p className='video-card-rating video-card-info-data'><span>{props.rating}</span> % </p> : null}
                        </span>
                    </a>
                </Link>
            </span>
        </VideoCardStyledDiv>
    );
};
export default withTranslation(['common'])(VideoTypeCard);
