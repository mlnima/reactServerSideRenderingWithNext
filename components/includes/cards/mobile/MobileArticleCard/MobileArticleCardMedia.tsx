import {FC} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../mobileAsset/MobileCardImageRenderer";

let MobileArticleCardMediaStyledDiv = styled.div`
  position: relative;
  width: 100%;
  
  .article-card-views {
    bottom: 3px;
    right: 3px;
  }

  .article-card-rating {
    bottom: var(--video-card-info-distance, 2px);
    left: var(--video-card-info-distance, 2px);
  }
`


interface MobileArticleCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    postsPerRawForMobile: number,
}

const MobileArticleCardMedia: FC<MobileArticleCardMediaPropTypes> =
    ({
         post,
         mediaAlt,
         postsPerRawForMobile,
     }) => {

        return (

            <MobileArticleCardMediaStyledDiv className={'mobile-article-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         mediaAlt={mediaAlt}
                />

            </MobileArticleCardMediaStyledDiv>
        )

    };
export default MobileArticleCardMedia;

