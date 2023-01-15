import React, {FC, useState} from 'react';
import styled from "styled-components";

const CookiePopupStyledDiv = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1005;
  background-color: #000;
  height: 40px;
  gap: 10px;
  p{
    text-align: center;
  }
  
`
const CookiePopup: FC = () => {


    const [state, setState] = useState({
        accepted: false,
        render: true
    });

    const onAcceptHandler = () => {
        localStorage.cookieAccepted = true
        setState({
            ...state,
            accepted: true,
            render: false
        })
    }

    if (!state.accepted) {
        return (
            <CookiePopupStyledDiv className='cookie-popup-parent'>
                <p>
                    This website collects cookies to deliver better user experience
                </p>
                <button className='btn btn-primary' onClick={onAcceptHandler}>
                    OK
                </button>
            </CookiePopupStyledDiv>
        );
    } else return null

};
export default CookiePopup;
