"use client"
import styled from "styled-components";

interface StylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth?: number,
    customStyles?: string,
}

const Style = styled.div<StylePropTypes>`
  display: grid;
  width: 100%;
  margin: 10px auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({numberOfCardsPerRowInMobile}: StylePropTypes) => `${96 / numberOfCardsPerRowInMobile}`}vw, 1fr));

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: StylePropTypes) => `${cardWidth}px`}, 1fr));
  }

  ${({customStyles}: StylePropTypes) => customStyles || ''}
`

export default Style