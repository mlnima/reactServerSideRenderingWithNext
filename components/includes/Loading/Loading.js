import React, {useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import styled from "styled-components";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {BeatLoader, PulseLoader, RingLoader, RotateLoader, SyncLoader} from "react-spinners";

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
  cursor: wait;

  .stopLoading {

    position: fixed;
    top: 50px;
    right: 50px;
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
  
  span{
    span{
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
                <SyncLoader


                    color='var(--main-active-color,blue)' loading={contextData.state.loading} size={20}   />
            </StyledDiv>
        );
    } else return null
};

export default Loading;
