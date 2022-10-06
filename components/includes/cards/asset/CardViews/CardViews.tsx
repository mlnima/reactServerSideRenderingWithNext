import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import React from "react";

const CardViewsStyledDiv = styled.div`
  font-size: 12px;

  .icon {
    margin: 0 2px;
  }
`

interface CardViewsPropTypes {
    views: number,
    className: string
}

const CardViews = ({views, className}: CardViewsPropTypes) => {
    return (
        <CardViewsStyledDiv className={'card-views ' + className}>
            {!!views &&
                <>

                    <SvgRenderer svgUrl={'/public/asset/images/icons/eye-regular.svg'}
                                 size={14}
                                 customClassName={'views'}
                                 color={'var(--post-element-info-text-color, #ccc)'}/>
                    <span>{views}</span>
                </>
            }
        </CardViewsStyledDiv>
    );
};
export default CardViews;
