import Link from "next/link";
import _ from "lodash";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import CardTitle from "../asset/CardTitle/CardTitle";
import LearnTypeCardMedia from "./LearnTypeCardMedia";

const LearnTypeCardStyledDiv = styled.div`
  width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
  max-width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
  display: flex;
  flex-direction: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? 'row' : 'column'};
  align-items: center;
  justify-content: space-between;
  background-color: var(--post-element-background-color,#131314);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;
  .card-title{
    margin-top: 10px;
  }

  .learn-post-card-link {
    position: relative;
    width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    max-width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    margin: 4px;
    display: flex;
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    .learn-post-card-under-media {
      width: 100%;
      height: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '65px' : 'auto'};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? 4 : 0}px;
      
      .learn-post-card-under-media-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;


        .learn-post-card-info-data {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2px 0;
          padding: 0 2px;
          color: var(--post-element-info-text-color,#ccc);

          span {
            margin: 0 2px;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {

    width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
    max-width: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? `320px` : `100%`};
    flex-direction: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? 'row' : 'column'};

    margin: 7px;

    .post-card-link {
      flex-direction: ${(props : {cardWidth:number,postElementSize:string}) => props.postElementSize === 'list' ? 'row' : 'column'};
    }
  }

`


const LearnTypeCard = (props:any) => {

    const metaPreviewData = [...(props.post?.actors || []), ...(props.post?.tags || []), ...(props.post?.categories || [])]
    const metaPreview = _.uniqBy(metaPreviewData, function (e) {
        return e.name;
    })
    return (
        <LearnTypeCardStyledDiv className='learn-post-card' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <Link href={`/post/${props.post?.postType}/${props.post?._id}`} scroll={false}>
                <a rel='next' onClick={ props.onActivateLoadingHandler} className='learn-post-card-link' title={props.title}  >
                    <LearnTypeCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                    <div className='learn-post-card-under-media'>
                        <CardTitle title={props.title}/>
                        {/*<div className='learn-post-card-under-media-info'>*/}
                        {/*    <span className='learn-post-card-views learn-post-card-info-data'><span>{props.views}</span> {props.t(`common:Views`)}</span>*/}
                        {/*    <span className='learn-post-card-rating learn-post-card-info-data'><span>{props.rating}</span> % </span>*/}
                        {/*</div>*/}
                    </div>
                </a>
            </Link>
            {props.postElementSize !== 'list' ? <CardMetaRenderer metaPreview={metaPreview} postElementSize={props.postElementSize}/> : null}
        </LearnTypeCardStyledDiv>

    );
};
export default withTranslation(['common'])(LearnTypeCard);

