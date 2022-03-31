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
}

const ArticleCardMedia : FC<ArticleCardMediaPropTypes>= (props) => {

    return (
        <ArticleCardMediaStyled className='article-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <CardImageRenderer imageUrl={props?.post.mainThumbnail}
                               mediaAlt={props.mediaAlt}
                               cardWidth={props.cardWidth}
                               cardHeight={props.cardWidth/1.777}
            />
        </ArticleCardMediaStyled>
    );
};
export default ArticleCardMedia;

