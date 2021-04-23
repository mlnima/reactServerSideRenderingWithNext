import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faEraser, faTerminal, faUserShield} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useRouter} from "next/router";
import {adminConsoleOpenCloseHandler} from "../../../_variables/_variables";
import styled from "styled-components";
let StyledDiv = styled.div`
  position: fixed;
  bottom: 3%;
  left: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
  .admin-tools-item {
    background: #0073aa;
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    z-index: 2;
    //width: 50px;
    //height: 50px;
    text-decoration: none;
    margin: 0 5px;


    .admin-tools-item-logo {
      transition: .5s;
      color: white;
      width: 30px;
      height: 30px;
      &:hover {
          color: black;
          width: 40px;
          height: 40px;
      }
    }
  }
`
const AdminTools = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        open: false,
        console: false
    });

        if (state.open) {
            return (
                <StyledDiv className='admin-tools' onKeyDown={e => e.keyCode === 192 ? adminConsoleOpenCloseHandler(contextData.userData,contextData.state,contextData.dispatchState) : null}>
                    <button className='admin-tools-item' onClick={() => state.open ? setState({...state, open: false}) : setState({...state, open: true})}>
                        <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                    </button>
                    <Link href='/admin' locale={false}>
                        <a className='admin-tools-item' style={state.colorsStyle}>
                            <FontAwesomeIcon icon={faUserShield} className='admin-tools-item-logo'/>
                        </a>
                    </Link>
                    <a className='admin-tools-item' href='' style={state.colorsStyle} rel="noreferrer" onClick={() => contextData.functions.clearCaches()}>
                        <FontAwesomeIcon icon={faEraser} className='admin-tools-item-logo'/>
                    </a>
                    <p className='admin-tools-item' style={state.colorsStyle} onClick={() => adminConsoleOpenCloseHandler(contextData.userData,contextData.state,contextData.dispatchState)}>
                        <FontAwesomeIcon icon={faTerminal} className='admin-tools-item-logo'/>
                    </p>
                </StyledDiv>
            );
        } else {
            return (
                <StyledDiv className='admin-tools'>
                    <button className='admin-tools-item' onClick={() => state.open ? setState({...state, open: false}) : setState({...state, open: true})}>
                        <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                    </button>
                </StyledDiv>

            )
        }



};
export default AdminTools;
