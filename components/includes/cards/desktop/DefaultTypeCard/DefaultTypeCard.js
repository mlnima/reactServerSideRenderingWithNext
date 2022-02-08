import Link from "next/link";
import _ from "lodash";
import CardMetaRenderer from "../../asset/CardMetaData/CardMetaRenderer";
import styled from "styled-components";
import {useTranslation} from "next-i18next";
import CardTitle from "../../asset/CardTitle/CardTitle";
import DefaultTypeCardMedia from "./DefaultTypeCardMedia";

const DefaultTypeCardStyledDiv = styled.div`
  width: ${props => props.postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
  max-width: ${props => props.postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
  display: flex;
  flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
  align-items: center;
  justify-content: space-between;
  background-color: var(--post-element-background-color,#131314);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;

  .post-card-link {
    position: relative;
    width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    max-width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    margin: 4px;
    display: flex;
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    .post-card-under-media {
      width: 100%;
      height: ${props => props.postElementSize === 'list' ? '65px' : 'auto'};

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: ${props => props.postElementSize === 'list' ? 4 : 0}px;
      
      .post-card-under-media-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;


        .post-card-info-data {
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

    width: ${props => props.postElementSize === 'list' ? '100%' : `${props.cardWidth}px`};
    max-width: ${props => props.postElementSize === 'list' ? `320px` : `100%`};
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};

    margin: 7px;

    .post-card-link {
      flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    }
  }

`


const DefaultTypeCard = props => {
    const {t} = useTranslation('common');

    const metaPreviewData = [...(props.post?.actors || []), ...(props.post?.tags || []), ...(props.post?.categories || [])]
    const metaPreview = _.uniqBy(metaPreviewData, function (e) {
        return e.name;
    })
    return (
        <DefaultTypeCardStyledDiv className='post-card' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <Link href={`/post/${props.post?.postType}/${props.post?._id}`} >
                <a rel='next' onClick={ props.onActivateLoadingHandler} className='post-card-link' title={title}  >
                    <DefaultTypeCardMedia noImageUrl={props.noImageUrl}
                                          postElementSize={props.postElementSize}
                                          post={props.post}
                                          cardWidth={props.cardWidth}
                                          mediaAlt={title}
                    />
                    <div className='post-card-under-media'>
                        <CardTitle title={title}/>
                        <div className='post-card-under-media-info'>
                            <span className='post-card-views post-card-info-data'>
                                <span>{props.views}</span>
                                {t(`Views`)}
                            </span>
                            <span className='post-card-rating post-card-info-data'>
                                <span>{props.rating}</span>
                                %
                            </span>
                        </div>
                    </div>
                </a>
            </Link>
            {props.postElementSize !== 'list' ? <CardMetaRenderer metaPreview={metaPreview} postElementSize={props.postElementSize}/> : null}
        </DefaultTypeCardStyledDiv>

    );
};
export default DefaultTypeCard;

