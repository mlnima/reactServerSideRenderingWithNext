import {FC} from 'react';
import LoginRegisterPopupForms from "./LoginRegisterPopupForms";
import styled from "styled-components";

const LoginRegisterPopupStyledDiv = styled.div`
  background-color: rgba(0, 0, 0, .8);
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
  z-index: 1001;
`;

const LoginRegisterPopup: FC = () => {
    return (
        <LoginRegisterPopupStyledDiv className='login-register-popup'>
            <LoginRegisterPopupForms/>
        </LoginRegisterPopupStyledDiv>
    );
};

export default LoginRegisterPopup;
