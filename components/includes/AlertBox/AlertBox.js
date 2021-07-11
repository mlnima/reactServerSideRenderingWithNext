import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext'
import styled from "styled-components";
let StyledDiv = styled.div`
  position: fixed;
  top: 0;
  left:0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.5);
  .close-alert{
    position: fixed;
    top:5%;
    right: 5%;
    color: white;
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-size: xx-large;
  }

  .alert-message{
    color: white;
    width: 300px;
    background-color: black;
    padding: 20px;
    border-radius: 10px;
    .alert{
      text-align: center;
    }
  }
`
const AlertBox = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);


    const RenderAlertLogo = ()=>{
       return  contextData.alert.type === 'error' ? 'X':
               contextData.alert.type === 'info' ? '!':
                   null
    }


    const onCloseHandler = ()=>{
        contextData.dispatchAlert({
            ...contextData.alert,
            active: false,
            alertMessage: '',
            type: ''
        })
    }

        return (
            <StyledDiv className='alert-box'>
               <button className='close-alert' onClick={()=>onCloseHandler()}>X</button>
               <div className='alert-message'>
                   <p>{contextData.alert.type}:</p>
                   <p className='alert'>{contextData.alert.alertMessage}</p>
               </div>
            </StyledDiv>
        );

};
export default AlertBox;
