import React, {useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import LoginRegisterPopupForms from "./LoginRegisterPopupForms";
import styled from "styled-components";

const LoginRegisterPopupStyledDiv = styled.div`
  background-color: rgba(0,0,0,.8);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  margin: 0;
  padding: 0;
`

const LoginRegisterPopup = props => {
    const contextData = useContext(AppContext);

    const onTypeChangeHandler = ()=>{
        contextData.state.loginRegisterFormPopupType === 'register' ?
            contextData.dispatchState({...contextData.state,loginRegisterFormPopupType: 'login'}):
            contextData.dispatchState({...contextData.state,loginRegisterFormPopupType: 'register'})
    }

    if (contextData.state.loginRegisterFormPopup && !contextData.userData._id){
        return (
            <LoginRegisterPopupStyledDiv className='login-register-popup'>
                <LoginRegisterPopupForms  onTypeChangeHandler={onTypeChangeHandler}/>
            </LoginRegisterPopupStyledDiv>
        );
    }else return null




};

export default LoginRegisterPopup;
