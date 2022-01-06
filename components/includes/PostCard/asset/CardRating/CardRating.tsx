import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";

const CardRatingStyledDiv = styled.div`
  font-size: 12px;
  .icon{
    width: 12px;
    height: 12px;
    margin: 0 2px;
  }
`

interface CardViewsPropTypes {
    rating:number,
    className:string
}

const CardRating = ({rating,className}:CardViewsPropTypes) => {
    return (
        <CardRatingStyledDiv className={'card-rating '+className}>
            <FontAwesomeIcon icon={faThumbsUp} className={'icon thumbs-up'}/>
            <span>{rating || 0}%</span>
        </CardRatingStyledDiv>
    );
};
export default CardRating;
