import styled from "styled-components";
import React, {FC} from "react";
import SvgRenderer from "../../../../global/commonComponents/SvgRenderer/SvgRenderer";

const CardRatingStyledDiv = styled.div`
  .icon {
    margin: 0 3px;
  }
`

interface CardRatingPropTypes {
    rating: number,
    className: string
}

const CardRating:FC<CardRatingPropTypes> = ({rating, className} ) => {

    return (
        <CardRatingStyledDiv className={'card-rating ' + className}>
            <SvgRenderer svgUrl={'/public/asset/images/icons/thumbs-up-solid.svg'}
                         size={11}
                         customClassName={'rating'}
                         color={'var(--post-element-info-text-color, #ccc)'}/>
            <span>{rating || 0}%</span>
        </CardRatingStyledDiv>
    );
};
export default CardRating;
