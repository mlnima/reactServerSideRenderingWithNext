import React from 'react';
import LoginRegisterPopupForms from "./LoginRegisterPopupForms";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

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
`;

const LoginRegisterPopup = () => {

    const globalState = useSelector((state:StoreTypes) => state.globalState)
    const loggedIn = useSelector((state:StoreTypes) => state.user.loggedIn)

    if (globalState?.loginRegisterFormPopup && !loggedIn){
        return (
            <LoginRegisterPopupStyledDiv className='login-register-popup' >
                <LoginRegisterPopupForms />
            </LoginRegisterPopupStyledDiv>
        );
    }else return null

};

export default LoginRegisterPopup;
