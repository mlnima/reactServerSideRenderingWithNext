import styled from "styled-components";

const CardRatingStyledDiv = styled.div`
  font-size: 12px;

  .icon {
    width: 11px;
    height: 11px;
    margin: 0 2px;
    background-color: var(--post-element-info-text-color, #ccc);
    mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
  }
`

interface CardViewsPropTypes {
    rating: number,
    className: string
}

const CardRating = ({rating, className}: CardViewsPropTypes) => {

    return (
        <CardRatingStyledDiv className={'card-rating ' + className}>
            <span className={'icon'}/>
            <span>{rating || 0}%</span>
        </CardRatingStyledDiv>
    );
};
export default CardRating;