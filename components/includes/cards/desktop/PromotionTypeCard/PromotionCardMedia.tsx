import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";
import {FC} from "react";
interface PromotionCardMediaPropTypes {
    post: PostTypes,
    postElementSize: string,
    cardWidth: number,
    mediaAlt: string,
}

interface PromotionCardMediaStyledDivPropTypes {
    cardWidth: number,
    postElementSize?: string
}

const PromotionCardMediaStyledDiv = styled.div`

  width: 100%;
  height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);
  .promotion-card-image {
    width: 100%;
    height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);
    object-fit: contain;
  }
`
const PromotionCardMedia : FC<PromotionCardMediaPropTypes> = ({post,postElementSize,cardWidth,mediaAlt}) => {

    return (
        <PromotionCardMediaStyledDiv className='promotion-card-media' postElementSize={postElementSize} cardWidth={cardWidth}>
            <CardImageRenderer imageUrl={post?.mainThumbnail}
                               mediaAlt={mediaAlt}
                               cardWidth={cardWidth}
                               cardHeight={cardWidth / 1.777}
            />
        </PromotionCardMediaStyledDiv>
    );
};
export default PromotionCardMedia;
