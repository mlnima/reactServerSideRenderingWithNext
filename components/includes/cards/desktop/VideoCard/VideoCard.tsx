import {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'),{ssr:false});
const VideoCardTitle = dynamic(() => import('./VideoCardTitle'));
const VideoCardMedia = dynamic(() => import('./VideoCardMedia/VideoCardMedia'));

let VideoCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  padding-bottom: 5px;
  width: ${(props: { cardWidth: number, postElementSize: string }) => `${props?.cardWidth}px`};
  max-width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin: 7px;
  font-size: 14px;
  transition: .3s;
  .last-update {
    font-size: 9px;
    margin: 0 4px;
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

const VideoCard : FC<VideoTypeCardPropTypes> =
    ({post,
         cardWidth,
         postElementSize,
         onActivateLoadingHandler,
         title,
         noImageUrl,
         views,
         rating
    }) => {
    const postUrl = `/post/${post?.postType}/${post._id}`
    return (
        <VideoCardStyledArticle className={'video-card'}
                                cardWidth={cardWidth}
                                postElementSize={postElementSize}
        >
            <Link href={postUrl} >
                <a rel={'next'}
                   className={'video-card-media-link'}
                   title={title}
                   onClick={onActivateLoadingHandler}
                >
                    <VideoCardMedia noImageUrl={noImageUrl}
                                    postElementSize={postElementSize}
                                    post={post}
                                    cardWidth={cardWidth}
                                    mediaAlt={title}
                                    views={views}
                                    rating={rating}
                                    duration={post.duration}
                                    quality={post.quality}
                    />
                </a>
            </Link>
            <VideoCardTitle cardWidth={cardWidth}
                            title={title}
                            actors={post?.actors}
                            tags={post?.tags}
                            postUrl={postUrl}
                            categories={post?.categories}
                            onActivateLoadingHandler={onActivateLoadingHandler}
            />
            {post?.updatedAt || post?.createdAt  ?
                <CardLastUpdate targetedDate={post?.updatedAt|| post?.createdAt}/>
                : null
            }

        </VideoCardStyledArticle>
    );
};
export default VideoCard;
