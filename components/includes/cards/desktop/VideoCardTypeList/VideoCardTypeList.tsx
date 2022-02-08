import styled from "styled-components";
import {PostTypes} from "../../../../../_variables/TypeScriptTypes/PostTypes";
import VideoCardTypeListMedia from "./VideoCardTypeListMedia";
import VideoCardTypeListTitle from "./VideoCardTypeListTitle";
import _qualityConvertor from "../../asset/_qualityConvertor";
import Link from "next/link";
import moment from "moment";
import dynamic from "next/dynamic";
const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardQuality = dynamic(() => import('../../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../../asset/CardDuration/CardDuration'))

const VideoCardTypeListStyledArticle = styled.article`
  --video-card-list-font-size: 12px;
  --video-card-list-info-font-size: 12px;
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  max-width: 100vw;
  font-size: var(--video-card-list-font-size);
  margin: auto;

  .video-card-list-data {

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    box-sizing: border-box;

    .video-card-link {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      margin: 2px 0;

      .video-card-info-data {
        width: calc(50% - 8px);
        display: flex;
        padding: 0 2px;
        align-items: center;
        margin: 2px 0;
        color: var(--post-element-info-text-color, #ccc);
        font-size: var(--video-card-list-info-font-size);
        
        .icon {
          width: 14px;
          height: 14px;
          margin: 0 2px;
        }
        
        .thumbs-up{
          width: 12px;
          height: 12px;
        }
        
        span {
          margin: 0 2px;
        }

      }
    }
  }

  @media only screen and (min-width: 768px) {
    --video-card-list-font-size: ${(props: { isSidebar: boolean }) => props.isSidebar ? '14px' : '18px'};
    --video-card-list-info-font-size: 12px;:${(props: { isSidebar: boolean }) => props.isSidebar ? '12px' : '14px'};
    width: ${(props: { isSidebar: boolean }) => props.isSidebar ? '320px' : '100%'};
    max-width: 750px;
    transition: .3s;
  }
`

interface VideoCardTypeListPropTypes {
    post: PostTypes,
    cardWidth: number,
    views: number,
    rating: number,
    postElementSize: string,
    onActivateLoadingHandler: any,
    title: string,
    isSidebar: boolean,
}

const VideoCardTypeList = (props: VideoCardTypeListPropTypes) => {
    const postUrl = `/post/${props.post.postType}/${props.post._id}`
    return (
        <VideoCardTypeListStyledArticle className={'video-card-list-type'} isSidebar={props.isSidebar}>
            <Link href={postUrl} >
                <a rel='next' className='video-card-link' title={props.title} onClick={props.onActivateLoadingHandler}>
                    <VideoCardTypeListMedia postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                </a>
            </Link>

            <div className={'video-card-list-data'}>
                <VideoCardTypeListTitle postUrl={postUrl} onActivateLoadingHandler={props.onActivateLoadingHandler} title={props.title} actors={props.post?.actors} tags={props.post?.tags} categories={props.post?.categories}/>
                <Link href={postUrl} >
                    <a rel='next' className='video-card-link' title={props.title} onClick={props.onActivateLoadingHandler}>
                        {props.views ? <CardViews views={props.views} className={'video-card-views video-card-info-data'}/> :null}
                        {props.post?.quality ?  <CardQuality quality={_qualityConvertor(props.post.quality)} className={'video-card-quality video-card-info-data'}/> :null}
                        {props.post?.duration ?   <CardDuration duration={props.post.duration}className={'video-card-duration video-card-info-data'}/> :null}
                        {props.rating ?  <CardRating rating={props.rating} className={'video-card-rating video-card-info-data'}/> :null}
                        {props.post?.updatedAt ?
                            <p className={'last-update video-card-info-data'}>
                                  {moment(new Date(props.post?.updatedAt), 'YYYYMMDD').fromNow(false)}
                            </p>
                            : null
                        }
                    </a>
                </Link>
            </div>

        </VideoCardTypeListStyledArticle>
    );
};

export default VideoCardTypeList;
