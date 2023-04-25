import styled from "styled-components";

export const Styles = styled.div`
  position: relative;
  bottom: 0;
  margin: auto;
  width: 77px;
  cursor: pointer;

  img {
    width: 77px;
    border-radius: 50%;
  }

  svg {
    position: absolute;
    color: var(--main-active-color, #f90);
    bottom: 7%;
    right: 7%;
  }
  
  @media only screen and (min-width: 768px) {
    width: 150px;
    img {
      width: 150px;
    }
  }
`