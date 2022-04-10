import {FC} from "react";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import styled from "styled-components";
import Link from "next/link";
import dynamic from "next/dynamic";
import LearnTypeCardMedia from "@components/includes/cards/desktop/LearnTypeCard/LearnTypeCardMedia";
import MobileLearnCardMedia from "@components/includes/cards/mobile/MobileLearnCard/MobileLearnCardMedia";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'));

interface MobileLearnCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    cardWidth: number,
    views: number,
    rating: number
    post: PostTypes,
    isAppleMobileDevice: boolean
}

const MobileLearnCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  max-width: ${({cardWidth}: { cardWidth: number }) => `${cardWidth}px`};
  font-size: 14px;

  .mobile-learn-card-link {
    color: var(--post-element-text-color, #ccc);
    position: relative;
    display: block;

    .entry-header {
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      width: 100%;
      overflow-wrap: break-word;

      .card-header {
        margin: 2px 0;
      }
    }

    .learn-card-under-media {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .learn-card-under-media-info {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        height: 20px;

        .learn-card-info-data {
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
        }
      }
    }

    .last-update {
      width: 100%;
    }

  }
`

const MobileLearnCard: FC<MobileLearnCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         views,
         rating,
         isAppleMobileDevice,
         cardWidth
     }) => {

        return (
            <MobileLearnCardStyledArticle className={'learn-card'} cardWidth={cardWidth}>
                <Link href={`/post/${post?.postType}/${post._id}`}>
                    <a rel={'next'} onClick={onActivateLoadingHandler} className={'mobile-learn-card-link'}
                       title={title}>

                        {/*<LearnTypeCardMedia*/}
                        {/*    categoriesImages={*/}
                        {/*        post.categories?.filter(*/}
                        {/*            category => category?.imageUrl).map(category => category?.imageUrl*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*    post={post}*/}
                        {/*    mediaAlt={title}*/}
                        {/*/>*/}
                        <MobileLearnCardMedia post={post}
                                              mediaAlt={title}
                                              isAppleMobileDevice={isAppleMobileDevice}
                                              categoriesImages={
                                                  post.categories?.filter(
                                                      category => category?.imageUrl).map(category => category?.imageUrl
                                                  )
                                              }/>

                        <header className={'entry-header'}>
                            <span className={'card-header'}>{title}</span>
                        </header>
                        <div className={'learn-card-under-media'}>
                            <div className={'learn-card-under-media-info'}>
                                {views ?
                                    <CardViews views={views} className={'learn-card-views learn-card-info-data'}/>
                                    : null
                                }
                                {rating ?
                                    <CardRating rating={rating} className={'learn-card-rating learn-card-info-data'}/>
                                    : null
                                }
                            </div>
                        </div>
                        {/*{post?.updatedAt || post?.createdAt  ?*/}
                        {/*    <CardLastUpdate targetedDate={post?.updatedAt|| post?.createdAt}/>*/}
                        {/*    : null*/}
                        {/*}*/}
                    </a>
                </Link>
            </MobileLearnCardStyledArticle>
        )
    };
export default MobileLearnCard
