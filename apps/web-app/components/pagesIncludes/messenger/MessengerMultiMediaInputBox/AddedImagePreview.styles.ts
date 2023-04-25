import styled from "styled-components";


export const Styles = styled.form`
  position: absolute;
  //top:-189px;
  bottom: 60px;
  right:50px;
  background-color: var(--tertiary-background-color,#272727);
  border-radius: 5px;
  div{
    width: 100%;
    height:35px
    padding: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
  }
  img{
    width: 150px;
    height:150px; object-fit: contain;
  }
`