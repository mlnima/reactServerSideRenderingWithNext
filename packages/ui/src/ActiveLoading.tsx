import React, {FC} from "react";
import ReactLoading from 'react-loading';
import styled from "styled-components";


const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .stop-loading {
    position: fixed;
    top: 100px;
    right: 100px;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    z-index: 10;
    width: 50px;
    height: 50px;

    &:hover {
      color: #916d07;
    }

    .stop-loading-icon {
      width: 2rem !important;
      height: 2rem !important;
      color: var(--main-active-color, #f90);
      cursor: pointer;
    }
  }
`;


const ActiveLoading = ({onClickEvent,color}:any) => {
    return (
        <Style onClick={onClickEvent} onTouchStartCapture={onClickEvent}>
            <ReactLoading type={'spin'} color={color} height={100} width={100}/>
        </Style>
    )
};
export default ActiveLoading;