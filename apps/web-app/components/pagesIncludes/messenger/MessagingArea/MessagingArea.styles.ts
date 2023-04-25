import styled from "styled-components";

interface IProps {
    headerSize:number,
    isMaximized:boolean
}
export const Styles = styled.div<IProps>`

  height: ${({headerSize, isMaximized}) => isMaximized
          ? `calc(100vh - 110px)`
          : `calc(100vh - ${headerSize}px)`} !important;

  margin: 0;
  width: 100%;
  overflow-y: scroll;
  padding: 8px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--main-background-color, #1A1A1A);

  .messenger-conversation-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 20vw;
      height: 20vw;
      opacity: .20;
    }
  }
  
  .messages{
    width: 100%;
    height:100%;
  }
  
`