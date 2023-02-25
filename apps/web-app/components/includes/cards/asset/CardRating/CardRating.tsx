import styled from "styled-components";
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";

const CardRatingStyledDiv = styled.div`
  .icon {
    margin: 0 2px 0 5px;
  }
`

interface CardRatingPropTypes {
    rating: number,
    className: string
}

const CardRating: FC<CardRatingPropTypes> = ({rating, className}) => {

    return (
        <CardRatingStyledDiv className={'card-rating ' + className}>
            <FontAwesomeIcon className={'icon'} icon={faThumbsUp} style={{width: 11, height: 11}}/>
            <span>{rating || 0}%</span>
        </CardRatingStyledDiv>
    );
};
export default CardRating;
