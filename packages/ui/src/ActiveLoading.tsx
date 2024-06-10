import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-active-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

interface IProps {
    onClickEvent: any;

}

const ActiveLoading: FC<IProps> = ({ onClickEvent }) => {
    return (
        <Style onClick={onClickEvent} onTouchStartCapture={onClickEvent}>
            <Spinner/>
        </Style>
    );
};

export default ActiveLoading;



// .stop-loading {
//     position: fixed;
//     top: 100px;
//     right: 100px;
//     background-color: transparent;
//     border: none;
//     outline: none;
//     color: white;
//     z-index: 10;
//     width: 50px;
//     height: 50px;
//
// &:hover {
//         color: #916d07;
//     }
//
// .stop-loading-icon {
//         width: 2rem !important;
//         height: 2rem !important;
//         color: var(--primary-active-color, #f90);
//         cursor: pointer;
//     }
// }