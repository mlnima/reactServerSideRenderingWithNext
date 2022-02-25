import {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileVideoCardMedia from "./MobileVideoCardMedia/MobileVideoCardMedia";

const CardLastUpdate = dynamic(() => import('../../asset/CardLastUpdate/CardLastUpdate'));

const MobileVideoCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 1})`};
  margin: 4px 2px ;
  font-size: 12px;
  .mobile-video-card-media-link {
    color: var(--post-element-text-color, #ccc);
   
    .mobile-video-card-title {
      font-size: 14px;
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 2px 0;
    }
  }
`

interface MobileVideoCardPropTypes {
    onActivateLoadingHandler: any,
    title: string,
    noImageUrl: string,
    views: number,
    rating: number,
    post: PostTypes,
    postsPerRawForMobile: number
}

const MobileVideoCard: FC<MobileVideoCardPropTypes> =
    ({
         post,
         onActivateLoadingHandler,
         title,
         noImageUrl,
         views,
         postsPerRawForMobile,
         rating
     }) => {

        const postUrl = `/post/${post.postType}/${post._id}`;

        return (
            <MobileVideoCardStyledArticle postsPerRawForMobile={postsPerRawForMobile}>
                <Link href={postUrl}>
                    <a rel={'next'}
                       className={'mobile-video-card-media-link'}
                       title={title}
                       onClick={onActivateLoadingHandler}
                    >

                        <MobileVideoCardMedia noImageUrl={noImageUrl}
                                              post={post}
                                              mediaAlt={title}
                                              views={views}
                                              rating={rating}
                                              duration={post.duration}
                                              quality={post.quality}
                                              postsPerRawForMobile={postsPerRawForMobile}
                        />

                        <h3 className={'mobile-video-card-title'}>{title}</h3>

                        {post?.updatedAt ?
                            <CardLastUpdate updatedAt={post?.updatedAt}/>
                            : null
                        }

                    </a>
                </Link>
            </MobileVideoCardStyledArticle>
        )
    };
export default MobileVideoCard
