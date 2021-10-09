import styled from "styled-components";

export const TheButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid var(--primary-button-text-color, #000);
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  cursor: pointer;
`

export const PrimaryButton = styled(TheButton)`
  background-color: var(--primary-button-background-color, #f90);
  color: var(--primary-button-text-color, #000);
`

export const CloseButton = styled(TheButton)`
  
`

export const SecondaryButton = styled(TheButton)`

`
export const SuccessButton = styled(TheButton)`

`
export const WarningButton = styled(TheButton)`

`
export const InfoButton = styled(TheButton)`

`