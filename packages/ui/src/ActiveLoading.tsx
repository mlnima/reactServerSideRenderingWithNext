import React, {FC} from "react";
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
      color: var(--primary-active-color, #f90);
      cursor: pointer;
    }
  }
`;

interface IProps{
    onClickEvent:React.ChangeEventHandler<any>,
    color:string
}

const ActiveLoading:FC<IProps> = ({onClickEvent,color}) => {
    return (
        <Style onClick={onClickEvent} onTouchStartCapture={onClickEvent}>
            Loading
            {/*<ReactLoading type={'spin'} color={color} height={100} width={100}/>*/}
        </Style>
    )

    // return null

};
export default ActiveLoading;