import styled from "styled-components";

interface  IProps {

}
export const Styles = styled.form<IProps>`
  background-color: var(--main-background-color, #1A1A1A);
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 32px 32px;
  grid-gap: 3px;
  padding: 4px;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  position: relative;
`