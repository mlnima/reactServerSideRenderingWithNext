import {FC, useState} from 'react';
import styled from "styled-components";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(100% / 1.777);
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

interface CategoryCardMediaPropTypes {
    cardWidth: number,
    imageUrl: string,
    mediaAlt: string,
}

const CategoryCardMedia: FC<CategoryCardMediaPropTypes> =
    ({
         cardWidth,
         imageUrl,
         mediaAlt,
     }) => {

        const [gotError, setGotError] = useState(false)

        if (!imageUrl || gotError) {
            return (
                <NoImageStyleDiv cardWidth={cardWidth} className={'no-image'}>
                    <span className={'no-image-alt'}>{mediaAlt || 'NO IMAGE'}</span>
                </NoImageStyleDiv>
            );
        } else {
            return (
                <CardImageRenderer imageUrl={imageUrl}
                                   mediaAlt={mediaAlt}
                                   cardWidth={cardWidth}
                                   cardHeight={cardWidth / 1.777}
                                   errorHandler={() => setGotError(true)}
                />
            );
        }

    };
export default CategoryCardMedia;


// <NoImageStyleDiv cardWidth={props.cardWidth} className={'no-image'}>
//     <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
// </NoImageStyleDiv>