import styled from "styled-components";

export const SomeoneIsTypingStyle = styled.span`
  position: absolute;
  top: -14px;
  left: 10px;
  background-color: var(--secondary-background-color, #181818);
  color: var(--primary-text-color,#fff);
  font-size: 12px;
`
export const ActionButtonStyle = styled.button`
  background-color: var(--button-background-color, #181818);
  color: var(--button-text-color, #fff);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
