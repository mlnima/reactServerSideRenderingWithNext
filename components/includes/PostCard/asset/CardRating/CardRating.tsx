import styled from "styled-components";

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
            <svg className={'icon thumbs-up'}
                 xmlns={'http://www.w3.org/2000/svg'}
                 width={'14'}
                 height={'14'}
                 viewBox={'0 0 24 24'}
                 fill={'none'}
                 stroke={'currentColor'}
                 strokeWidth={'2'}
                 strokeLinecap={'round'}
                 strokeLinejoin={'round'} >
                <path d={'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'}/>
                <circle cx={'12'} cy={'12'} r={'3'}/>
            </svg>
            <span>{rating || 0}%</span>
        </CardRatingStyledDiv>
    );
};
export default CardRating;
