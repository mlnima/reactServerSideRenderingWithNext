import React, {useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;



  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid ;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  .stopLoading {

    position: fixed;
    top: 20px;
    right: 20px;
    font-size: xxx-large;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    z-index: 10;
    &:hover{
      color:#916d07 ;
    }
  }
  
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`


const Loading = () => {
    const contextData = useContext(AppContext);
    const onStopLoadingHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: false
        })
    }
    if (contextData.state.loading) {
        return (
            <StyledDiv className='Loading'>
                <button className='stopLoading fas fa-times' onClick={() => onStopLoadingHandler()}>
                    <FontAwesomeIcon style={{width:'1rem',height:'1rem'}} icon={faTimes} className='stopLoading' />
                </button>
                <div className="lds-ring">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </StyledDiv>
        );
    } else return null
};

export default Loading;
