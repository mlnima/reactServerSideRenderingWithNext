import Link from "next/link";
import PromotionCardMedia from "./PromotionCardMedia";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import _ from "lodash";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import CardTitle from "../asset/CardTitle/CardTitle";
import CardViews from "../asset/CardViews/CardViews";
import CardRating from "../asset/CardRating/CardRating";

let PromotionCardStyledDiv = styled.div`
  position: relative;
  width: ${(props :{postElementSize:string,cardWidth:number}) => props?.postElementSize === 'list' ? '100%' : '48vw'};
  max-width: ${props => props.postElementSize === 'list' ? '100%' : '48vw'};
  margin: 2.8px;
  display: flex;
  flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
  align-items: center;
  justify-content: space-between;
  background-color: var(--post-element-background-color,#131314);
  font-size: 12px;
  padding-bottom: 5px;

  .promotion-card-link-external {
    width: ${props => props.postElementSize === 'list' ? '116.6px' : '100%'};
  }

  .promotion-card-under-media {
    width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    margin-left: ${props => props.postElementSize === 'list' ? 4 : 0}px;
    height: ${props => props.postElementSize === 'list' ? 65 : 45}px;


    .promotion-card-link-internal {
      height: ${props => props.postElementSize === 'list' ? 65 : 45}px;
      width: 100%;
      text-decoration: none;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .promotion-card-under-media-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 2px;
        padding: 0 2px;
        color: var(--post-element-info-text-color,#ccc);

        .promotion-card-views {
          height: 12px;
          margin: 0;
          display: flex;
          align-items: center;
        }
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
    }
  }

  @media only screen and (min-width: 768px) {

    width: ${props => props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
    max-width: ${props => props.postElementSize === 'list' ? `320px` : `100%`};
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    margin: 7px;
    font-size: 14px;
    .promotion-card-under-media {
      width: 100%;
      font-size: 14px;
      .promotion-card-link-internal {
        width: 100%;
      }
    }
  }

`

const PromotionTypeCard = props => {

    const onExternalLinkClickViewHandler = () => {
        likeDislikeView(props.post._id, 'views').finally()
    }

    const metaPreviewData = [...(props.post.actors || []), ...(props.post.tags || []), ...(props.post.categories || [])]
    const metaPreview = _.uniqBy(metaPreviewData, function (e) {
        return e.name;
    })


    return (
        <PromotionCardStyledDiv className='promotion-card' cardWidth={props.cardWidth} postElementSize={props.postElementSize}>

            <a href={props.post.redirectLink} className='promotion-card-link-external' onClick={onExternalLinkClickViewHandler} target='_blank' rel="nofollow noopener external">
                <PromotionCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
            </a>
            <div className='promotion-card-under-media'>
                <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
                    <a rel='next'  className='promotion-card-link-internal' onClick={ props.onActivateLoadingHandler}>
                        <CardTitle title={props.title} metas={[]}/>
                        <div className='promotion-card-under-media-info'>
                            <CardViews views={props.views} className={'promotion-card-views'}/>
                            <CardRating rating={props.rating} className={'promotion-card-rating video-card-info-data'}/>
                        </div>
                    </a>
                </Link>
            </div>
            {/*// @ts-ignore*/}
            {props.postElementSize !== 'list' ? <CardMetaRenderer metaPreview={metaPreview} postElementSize={props.postElementSize}/> : null}
        </PromotionCardStyledDiv>
    );
};
export default withTranslation(['common'])(PromotionTypeCard);
