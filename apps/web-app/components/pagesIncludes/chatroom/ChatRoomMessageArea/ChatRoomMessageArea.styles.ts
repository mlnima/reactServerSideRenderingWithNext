import styled from 'styled-components';

interface IProps{
    headerSize: number;
    isMaximized: boolean;
}
export const Styles = styled.div<IProps>`
  grid-area: chatroomMessagingArea;
  margin: 0;
  
  height: ${({headerSize, isMaximized}) =>
          isMaximized
                  ? `calc(100vh - 90)`
                  : `calc(100vh - ${headerSize + 1 }px  )`};
  
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: var(--main-background-color, #000);
`

export default Styles

