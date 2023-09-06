import styled from "styled-components";

interface IProps {
    headerSize:number,
    isMaximized:boolean
}
export const Styles = styled.div<IProps>`

  height: ${({headerSize, isMaximized}) => isMaximized
          ? `calc(100vh - 50px)`
          : `calc(100vh - ${headerSize}px  )`};
  
  
  margin: 0;
  width: 100%;
  overflow-y: scroll;
  padding: 4px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--main-background-color, #1A1A1A);
  .no-message {
    color: var(--primary-text-color,#fff);
  }
`