import {FC} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../mobileAsset/MobileCardImageRenderer";

let MobileArticleCardMediaStyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% / 1.777);
`


interface MobileArticleCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    isAppleMobileDevice
}

const MobileArticleCardMedia: FC<MobileArticleCardMediaPropTypes> = ({post, mediaAlt,isAppleMobileDevice}) => {

        return (
            <MobileArticleCardMediaStyledDiv className={'mobile-article-card-media'}>
                <MobileCardImageRenderer imageUrl={post.mainThumbnail} mediaAlt={mediaAlt} isAppleMobileDevice={isAppleMobileDevice}/>
            </MobileArticleCardMediaStyledDiv>
        )

    };
export default MobileArticleCardMedia;

