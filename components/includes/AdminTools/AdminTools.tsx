import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faEraser, faUserShield} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styled from "styled-components";
import Draggable from 'react-draggable';
import {useDispatch} from "react-redux";
import {clearCaches} from "@store/adminActions/adminPanelGlobalStateActions";
import {useRouter} from "next/router";

let StyledDiv = styled.div`
  position: fixed;
  bottom: 10%;
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

const AdminTools: FC = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Draggable handle=".open-button">
            <StyledDiv className='admin-tools'>
                <button className='admin-tools-item open-button'
                        onClick={() => setOpen(!open)}
                        onTouchStartCapture={() => setOpen(!open)}>
                    <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                </button>
                {open ?
                    <>
                        <Link href={'/admin'} locale={false}>
                            <a className='admin-tools-item'>
                                <FontAwesomeIcon icon={faUserShield} className='admin-tools-item-logo'/>
                            </a>
                        </Link>
                        <button className='admin-tools-item' onClick={() => dispatch(clearCaches(router))}>
                            <FontAwesomeIcon icon={faEraser} className='admin-tools-item-logo'/>
                        </button>

                    </>
                    : null
                }
            </StyledDiv>
        </Draggable>
    );
};
export default AdminTools;
