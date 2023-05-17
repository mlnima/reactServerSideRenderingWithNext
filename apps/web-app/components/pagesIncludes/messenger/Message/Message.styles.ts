import styled from "styled-components";


interface IProps {
    isMine: boolean;
}

// justify-content: ${({isMine}) => isMine ? 'flex-end' : 'flex-start'};
// background-color: ${({isMine}) => isMine ? '#1877F2' : 'var(--tertiary-background-color,#404040)'};
// color: ${({isMine}) => isMine ? '#fff' : 'var(--main-text-color,#FFFFFF)'};;
export const Styles = styled.div<IProps>`
  display: flex;
  justify-content: ${({isMine}) => isMine ? 'flex-end' : 'flex-start'};
  align-items: flex-start;
  max-width: 80%;
  border-radius: 5px;
  padding: 5px 10px;
  box-sizing: border-box;
  overflow-wrap: break-word;

  .chatroom-message-log{
    color: var(--main-text-color, #fff);
    text-align: center;
    word-wrap: break-word;
    padding: 5px;
    margin: 5px;
  }
  
  .chatroom-message-data {
    background-color: ${({isMine}) => isMine ? '#1877F2' : 'var(--tertiary-background-color,#404040)'};
    color: ${({isMine}) => isMine ? '#fff' : 'var(--main-text-color,#FFFFFF)'};;
    padding: 10px;
    margin: 5px;
    box-sizing: border-box;
    border-radius: 10px;
    max-width: 100%;

    .chatroom-message-username {
      display: flex;
      justify-content: space-between;
      font-size: small;
    }

    .chatroom-message--text {
      margin: 10px 20px;
      word-wrap: break-word;
      max-width: calc(100% - 30px);
    }

    .chatroom-message-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }

  }

  @media only screen and (min-width: 768px) {
    max-width: calc(100vw - 180px);
    .chatroom-message-area-message-data {
      .chatroom-message-area-message-image {
        max-width: 400px;
        height: auto;
      }
    }
  }
`