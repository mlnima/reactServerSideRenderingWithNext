import Link from "next/link";
import ArticleCardMedia from "./ArticleCardMedia";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import ArticleTypeCardTitle from "./ArticleTypeCardTitle";
import dynamic from 'next/dynamic'
const CardViews = dynamic(() => import('../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))


const ArticleCard = styled.div`
  width: ${props => props?.postElementSize === 'list' ? '100%' : 'calc(50vw - 5.6px)'};
  max-width: ${props => props.postElementSize === 'list' ? `100%` : 'calc(50vw - 5.6px)'};
  display: flex;
  flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
  align-items: center;
  justify-content: space-between;
  background-color: var(--post-element-background-color, #131314);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;

  .article-card-link {
    position: relative;
    width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    max-width: ${props => props.postElementSize === 'list' ? `100%` : `calc(100% - 4px)`};
    margin: 4px;
    display: flex;
    flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    .article-card-under-media {
      width: 100%;
      height: ${props => props.postElementSize === 'list' ? '65px' : 'auto'};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: ${props => props.postElementSize === 'list' ? 4 : 0}px;

      .article-card-under-media-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;


        .article-card-info-data {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2px 0;
          padding: 0 2px;
          color: var(--post-element-info-text-color, #ccc);
          font-size: 12px;

          .icon {
            width: 14px;
            height: 14px;
            margin: 0 2px;
          }

          .thumbs-up {
            width: 12px;
            height: 12px;
          }

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
    .article-card-link {
      flex-direction: ${props => props.postElementSize === 'list' ? 'row' : 'column'};
    }
  }
`
const ArticleTypeCard = props => {
    const postUrl = `/post/${props.post.postType}/${props.post._id}`


    return (
        <ArticleCard className='article-card' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <Link href={`/post/${props.post.postType}/${props.post._id}`} scroll={false}>
                <a rel='next' onClick={props.onActivateLoadingHandler} className='article-card-link' title={props.title}>
                    <ArticleCardMedia noImageUrl={props.noImageUrl} postElementSize={props.postElementSize} post={props.post} cardWidth={props.cardWidth} mediaAlt={props.title}/>
                </a>
            </Link>
            <ArticleTypeCardTitle title={props.post.title}
                                  postUrl={postUrl}
                                  onActivateLoadingHandler={props.onActivateLoadingHandler}
                                  cardWidth={props.cardWidth}
                                  tags={props.post?.tags}
                                  categories={props.post?.categories}/>
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='article-card-link' title={props.title} onClick={props.onActivateLoadingHandler}>
                    <div className='article-card-under-media'>
                        <div className='article-card-under-media-info'>
                            {props.views ? <CardViews views={props.views} className={'article-card-views article-card-info-data'}/> : null}
                            {props.rating ? <CardRating rating={props.rating} className={'article-card-rating article-card-info-data'}/> : null}

                        </div>
                    </div>
                </a>
            </Link>
        </ArticleCard>

    );
};
export default withTranslation(['common'])(ArticleTypeCard);

