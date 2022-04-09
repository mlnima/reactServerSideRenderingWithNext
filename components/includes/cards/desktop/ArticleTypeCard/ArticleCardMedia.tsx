import {FC} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

let ArticleCardMediaStyled = styled.div`
  position: relative;
`

interface ArticleCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    index?: number
}

const ArticleCardMedia: FC<ArticleCardMediaPropTypes> = ({post, mediaAlt, index}) => {

    return (
        <ArticleCardMediaStyled className='article-card-media'>
            <CardImageRenderer imageUrl={post.mainThumbnail}
                               mediaAlt={mediaAlt}
                               index={index}
            />
        </ArticleCardMediaStyled>
    );
};
export default ArticleCardMedia;



