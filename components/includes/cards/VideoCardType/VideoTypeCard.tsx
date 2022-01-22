import Link from "next/link";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";
import dynamic from "next/dynamic";

const CardLastUpdate = dynamic(() => import('../asset/CardLastUpdate/CardLastUpdate'));
const VideoCardTitle = dynamic(() => import('./VideoCardTitle'));
const VideoCardMedia = dynamic(() => import('./VideoCardMedia/VideoCardMedia'));

let VideoCardStyledArticle = styled.article`
  width: calc(48vw - 5.6px);
  max-width: calc(48vw - 5.6px);
  margin: 2.8px;
  font-size: 12px;
  padding-bottom: 5px;

  .last-update {
    font-size: 9px;
    align-self: flex-start;
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number, postElementSize: string }) => `${props?.cardWidth}px`};
    max-width: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin: 7px;
    font-size: 14px;
    transition: .3s;
  }
`

interface VideoTypeCardPropTypes {
    cardWidth: number,
    postElementSize: string,
    onActivateLoadingHandler: any,
    title: string,
    noImageUrl: string,
    views: number,
    rating: number,
    post: PostTypes,
}

const VideoTypeCard = (props: VideoTypeCardPropTypes) => {
    const postUrl = `/post/${props.post.postType}/${props.post._id}`
    return (
        <VideoCardStyledArticle className={'video-card'} cardWidth={props.cardWidth} postElementSize={props.postElementSize}>
            <Link href={postUrl} scroll={false}>
                <a rel={'next'} className={'video-card-media-link'} title={props.title} onClick={props.onActivateLoadingHandler}>
                    <VideoCardMedia noImageUrl={props.noImageUrl}
                                    postElementSize={props.postElementSize}
                                    post={props.post}
                                    cardWidth={props.cardWidth}
                                    mediaAlt={props.title}
                                    views={props.views}
                                    rating={props.rating}
                                    duration={props.post.duration}
                                    quality={props.post.quality}
                    />
                </a>
            </Link>
            <VideoCardTitle cardWidth={props.cardWidth}
                            title={props.title}
                            actors={props.post?.actors}
                            tags={props.post?.tags}
                            categories={props.post?.categories}
            />
            {props.post?.updatedAt ?
                <CardLastUpdate updatedAt={props.post?.updatedAt}/>
                : null
            }

        </VideoCardStyledArticle>
    );
};
export default withTranslation(['common'])(VideoTypeCard);
