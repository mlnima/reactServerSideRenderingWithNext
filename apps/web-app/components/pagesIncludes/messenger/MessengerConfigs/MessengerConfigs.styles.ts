import styled from "styled-components";
interface  IProps {

}
export const Styles = styled.div<IProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary-background-color, #181818);
  padding: 8px;
  box-sizing: border-box;

  h1 {
    font-size: large;
  }
`