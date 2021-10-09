import React, {useEffect} from 'react';
import LoginRegisterPopupForms from "./LoginRegisterPopupForms";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
//import {setLoginRegisterFormStatus} from "../../../store/actions/globalStateActions";


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
    const dispatch = useDispatch()
    const globalState = useSelector(state => state.globalState)
    const loggedIn = useSelector(state => state.user.loggedIn)

    const onClickOnEmptyAreaHandler = ()=>{
      //  dispatch(setLoginRegisterFormStatus(false))
    }

    if (globalState?.loginRegisterFormPopup && !loggedIn){
        return (
            <LoginRegisterPopupStyledDiv className='login-register-popup' onClick={onClickOnEmptyAreaHandler}>
                <LoginRegisterPopupForms />
            </LoginRegisterPopupStyledDiv>
        );
    }else return null

};

export default LoginRegisterPopup;
