import styled from "styled-components";


const Styles = styled.form`
  height: 45px;
  z-index: 1;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: var(--secondary-background-color, #181818);
  border-top: var(--default-border);
  border-bottom: var(--default-border);

  @keyframes pulsing {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.6;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .chatroom-someone-typing {
    position: absolute;
    top: -14px;
    left: 10px;
    background-color: var(--secondary-background-color, #181818);
    color: var(--primary-text-color,#fff);
    font-size: 12px;
  }

  .chatroom-tools-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    

    padding: 4px;
    box-sizing: border-box;

    .chatroom-tools-input {
      flex-grow: 1;
      background-color: var(--input-background-color, #fff);
      color: var(--input-text-color, #000);
      border: 1px solid var(--input-border-color, #ccc);
      border-radius: 4px;
      outline: none;
      height: 32px;
      width: 100%;
      padding: 4px;
      box-sizing: border-box;
      margin: 0 5px;
    }

    .audio-player {
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .audio-player audio {
      width: 100%;
      height: 25px;
    }

    .audio-recording-animation {
      position: fixed;
      bottom: 45px;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      z-index: 1000;
      animation: pulsing 2s infinite;
      .counter{
        font-size: 120px;
      }
    }


  }

  @media (max-width: 480px) {
    .chatroom-tools-items {
      .paperclip-button, .submit-button {
        width: 28px;
        height: 28px;
      }
    }
  }
`


export default Styles