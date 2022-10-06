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
  .fill-bar{
    position: absolute;
    width: ${({rating}:{rating:number})=>rating}%;
    background-color: var(--main-secondary-color,#6c757d);
    left: 0;
    top: 0;
    bottom: 0;
    opacity: 20%;
  }
  .rating-value-number,.icon {
    text-shadow: 1px 1px 5px #000,-1px -1px 5px #000;
    z-index: 2;
  }

  .rating-value-number{
    color: var(--post-element-text-color, #ccc);
    
  }
  .icon {
    margin: 0 2px;
  }
`

import React, {FC} from "react";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

interface CardRatingBarPropTypes {
    rating: number,
    className: string
}



const CardRatingBar: FC<CardRatingBarPropTypes> = ({rating, className}) => {
    return (
        <CardRatingStyle className={'card-rating-bar ' + className} rating={rating}>
            <div className={'fill-bar'}/>
            {!!rating &&
                <>
                    <SvgRenderer svgUrl={'/public/asset/images/icons/thumbs-up-solid.svg'}
                                 size={11}
                                 customClassName={'rating'}
                                 color={'var(--post-element-info-text-color, #ccc)'}/>
                    <span className={'rating-value-number'}>{rating}%</span>
                </>
            }
            <div className={'fill-bar'}/>
        </CardRatingStyle>
    )
};
export default CardRatingBar
