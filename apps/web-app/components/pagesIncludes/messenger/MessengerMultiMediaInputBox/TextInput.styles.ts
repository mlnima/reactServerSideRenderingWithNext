import styled from "styled-components";


const Styles = styled.div`
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
    margin: 0 5px;
  }
`

export default Styles