"use client";
import styled from "styled-components";

interface CardImageRendererStylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

const CardImageRendererStyles = styled.div<CardImageRendererStylePropTypes>`
  width: 100%;
  height: ${({numberOfCardsPerRowInMobile}: CardImageRendererStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
  position: relative;

  img {
    width: 100%;
    height: ${({numberOfCardsPerRowInMobile}: CardImageRendererStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw !important;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth}px;
    height: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth / 1.777}px !important;
    img {
      width: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth}px;
      height: ${({cardWidth}: CardImageRendererStylePropTypes) => cardWidth / 1.777}px !important;
    }
  }
`

export default CardImageRendererStyles;