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
  border-top:var(--default-border);
  
  .media-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: absolute;
    top: -60px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .audio-recording-animation{
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
`