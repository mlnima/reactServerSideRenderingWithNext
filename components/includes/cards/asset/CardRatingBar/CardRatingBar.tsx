import styled from "styled-components";

const CardRatingStyle = styled.div`
  width: 100%;
  font-size: 12px;
  height: 1.5em;
  background-color: #333 !important;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  
  .rating-value-number {
    color: var(--post-element-text-color, #ccc);
  }

  .icon {
    width: 11px;
    height: 11px;
    margin: 0 2px;
    background-color: var(--post-element-text-color, #ccc);
    mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/thumbs-up-solid.svg') no-repeat center;
  }
`

import {FC} from "react";

interface CardRatingBarPropTypes {
    rating: number,
    className: string
}

// .fill-bar{
//   position: absolute;
//   width: ${({rating}:{rating:number})=>rating}%;
//   background-color: var(--scondary-main-color,#f90);
//   left: 0;
//   top: 0;
//   bottom: 0;
// }

const CardRatingBar: FC<CardRatingBarPropTypes> = ({rating, className}) => {
    return (
        <CardRatingStyle className={'card-rating-bar ' + className}>
            {/*<div className={'fill-bar'}/>*/}
            {!!rating &&
                <>
                    <span className={'icon'}/>
                    <span className={'rating-value-number'}>{rating}%</span>
                </>
            }

        </CardRatingStyle>
    )
};
export default CardRatingBar
