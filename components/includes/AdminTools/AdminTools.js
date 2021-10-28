import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faEraser, faUserShield} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styled from "styled-components";
import Draggable from 'react-draggable';
import {useDispatch} from "react-redux";
import {clearCaches} from "../../../store/actions/adminPanelGlobalStateActions";
import {useRouter} from "next/router";

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
const AdminTools = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [state, setState] = useState({
        open: false,
        console: false
    });

    const onOpenCloseHandler = ()=>{
        state.open ? setState({...state, open: false}) : setState({...state, open: true})
    }

    return (
        <Draggable  handle=".open-button"  >
            <StyledDiv className='admin-tools' >
                <button className='admin-tools-item open-button' onClick={onOpenCloseHandler } onTouchStartCapture={onOpenCloseHandler}>
                    <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                </button>
                {state.open ?
                    <>
                        <Link href={'/admin'} locale={false}>
                            <a className='admin-tools-item' >
                                <FontAwesomeIcon icon={faUserShield} className='admin-tools-item-logo'/>
                            </a>
                        </Link>
                        <button className='admin-tools-item'
                                rel="noreferrer" onClick={() => dispatch(clearCaches(router))}
                        >
                            <FontAwesomeIcon icon={faEraser} className='admin-tools-item-logo'/>
                        </button>

                    </>
                    :null
                }
            </StyledDiv>
        </Draggable>
    );



};
export default AdminTools;
