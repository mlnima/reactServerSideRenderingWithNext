import React, {FC} from "react";
import styled from "styled-components";

const NoImageStyleDiv = styled.div`
  width: ${({cardWidth}:{cardWidth:number})=>cardWidth}px;
  height: ${({cardWidth}:{cardWidth:number})=>cardWidth / 1.777}px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: var(--post-element-info-text-color, #ccc);
  }
    @media only screen and (min-width: 768px) {
        width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
        height: calc(${({cardWidth}: { cardWidth: number }) => cardWidth}px / 1.777);
    }
`

interface ComponentPropTypes {
    mediaAlt: string,
    cardWidth: number,

}

const NoImage: FC<ComponentPropTypes> = ({mediaAlt,cardWidth}) => {
    return (
        <NoImageStyleDiv className='no-image' cardWidth={cardWidth} >
            <span className={'no-image-alt'}>{mediaAlt || 'NO IMAGE'}</span>
        </NoImageStyleDiv>
    )
};
export default NoImage
