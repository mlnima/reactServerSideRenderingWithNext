import styled from "styled-components";



export const Styles = styled.div`
  display: flex;
  justify-content: flex-start;
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
  
  
  .user-profile-image {
    background-color: transparent;
    border: none;
    outline: none;
    margin-bottom: 7px;
  }

  .chatroom-message-data {
    background-color: var(--secondary-background-color, #181818);
    padding: 10px;
    margin: 5px;
    box-sizing: border-box;
    border-radius: 10px;
    max-width: 100%;

    .chatroom-message-username {
      display: flex;
      justify-content: space-between;
      color: var(--main-text-color, #fff);
      font-size: small;
    }

    .chatroom-message--text {
      color: var(--main-text-color, #fff);
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