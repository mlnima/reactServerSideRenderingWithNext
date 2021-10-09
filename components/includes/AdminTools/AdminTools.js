import React, {useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faEraser, faTerminal, faUserShield} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {adminConsoleOpenCloseHandler} from "../../../_variables/_variables";
import styled from "styled-components";
import Draggable from 'react-draggable';

let StyledDiv = styled.div`
  position: fixed;
  bottom: 3%;
  left: 40px;
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
    const [state, setState] = useState({
        open: false,
        console: false
    });

    const onOpenCloseHandler = ()=>{
        state.open ? setState({...state, open: false}) : setState({...state, open: true})
    }

    return (
        <Draggable  handle=".open-button"  >
            <StyledDiv className='admin-tools' onKeyDown={e => e.keyCode === 192 ? adminConsoleOpenCloseHandler(contextData.userData,contextData.state,contextData.dispatchState) : null}>
                <button className='admin-tools-item open-button' onClick={onOpenCloseHandler } onTouchStartCapture={onOpenCloseHandler}>
                    <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                </button>
                {state.open?
                    <>
                        <Link href='/admin' locale={false}>
                            <a className='admin-tools-item' >
                                <FontAwesomeIcon icon={faUserShield} className='admin-tools-item-logo'/>
                            </a>
                        </Link>
                        <a className='admin-tools-item' href=''  rel="noreferrer" onClick={() => contextData.functions.clearCaches()}>
                            <FontAwesomeIcon icon={faEraser} className='admin-tools-item-logo'/>
                        </a>
                        <p className='admin-tools-item'  onClick={() => adminConsoleOpenCloseHandler(contextData.userData,contextData.state,contextData.dispatchState)}>
                            <FontAwesomeIcon icon={faTerminal} className='admin-tools-item-logo'/>
                        </p>
                    </>
                    :null
                }

            </StyledDiv>
        </Draggable>
    );



};
export default AdminTools;
