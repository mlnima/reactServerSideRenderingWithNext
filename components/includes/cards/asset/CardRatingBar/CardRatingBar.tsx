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
  border: 1px solid #333;
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  -moz-box-shadow: inset 0 0 2px 0 #000000;
  -webkit-box-shadow: inset 0 0 2px 0 #000000;
  -o-box-shadow: inset 0 0 2px 0 #000000;
  box-shadow: inset 0 0 2px 0 #000000;

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

const CardRatingBar: FC<CardRatingBarPropTypes> = ({rating, className}) => {
    return (
        <CardRatingStyle className={'card-rating-bar ' + className}>

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
