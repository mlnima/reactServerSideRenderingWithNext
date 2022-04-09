import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";
import {FC} from "react";

interface PromotionCardMediaPropTypes {
    post: PostTypes,
    mediaAlt: string,
    index:number
}

const PromotionCardMediaStyledDiv = styled.div`
  position: relative;

  .promotion-card-image {
    object-fit: contain;
  }
`
const PromotionCardMedia : FC<PromotionCardMediaPropTypes> = ({post,mediaAlt, index}) => {

    return (
        <PromotionCardMediaStyledDiv className='promotion-card-media' >
            <CardImageRenderer imageUrl={post?.mainThumbnail}
                               mediaAlt={mediaAlt}
                               index={index}
            />
        </PromotionCardMediaStyledDiv>
    );
};
export default PromotionCardMedia;


// width: 100%;
// height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);
// width: 100%;
// height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);