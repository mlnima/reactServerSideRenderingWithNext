import {FC} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

let ArticleCardMediaStyled = styled.div`
  .article-card-image {
    width: ${(props : {cardWidth:number,postElementSize:string}) =>props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
    height: calc(${(props : {cardWidth:number,postElementSize:string}) => props.cardWidth}px / 1.777);
  }
`

interface ArticleCardMediaPropTypes {
    post:PostTypes,
    postElementSize:string,
    cardWidth:number,
    mediaAlt:string,
    index?:number
}

const ArticleCardMedia : FC<ArticleCardMediaPropTypes>=
    ({
         post,
         postElementSize,
         cardWidth,
         mediaAlt,
         index
     }) => {

    return (
        <ArticleCardMediaStyled className='article-card-media' postElementSize={postElementSize} cardWidth={cardWidth}>
            <CardImageRenderer imageUrl={post.mainThumbnail}
                               mediaAlt={mediaAlt}
                               cardWidth={cardWidth}
                               cardHeight={cardWidth/1.777}
                               index={index}
            />
        </ArticleCardMediaStyled>
    );
};
export default ArticleCardMedia;

