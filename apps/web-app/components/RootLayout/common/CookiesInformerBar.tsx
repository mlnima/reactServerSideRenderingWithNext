import React, {FC, useState} from 'react';
import styled from "styled-components";

const Style = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1005;
  background-color:var(--secondary-background-color,#fff);
  color: var(--secondary-text-color,#fff);
  height: 40px;
  gap: 10px;
  p{
    text-align: center;
  }
`
const CookiesInformerBar: FC = () => {


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
            <Style className='cookie-popup-parent'>
                <p>
                    This website collects cookies to deliver better user experience
                </p>
                <button className='btn btn-primary' onClick={onAcceptHandler}>
                    OK
                </button>
            </Style>
        );
    } else return null

};
export default CookiesInformerBar;
