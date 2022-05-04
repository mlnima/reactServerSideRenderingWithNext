import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faEraser, faUserShield} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styled from "styled-components";
import Draggable from 'react-draggable';
import {useDispatch} from "react-redux";
import {clearCaches} from "@store/adminActions/adminPanelGlobalStateActions";
import {useRouter} from "next/router";
import {faPenSquare} from "@fortawesome/free-solid-svg-icons/faPenSquare";
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";

let StyledDiv = styled.div`
  position: fixed;
  bottom: 20%;
  left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1000;

  .admin-tools-item {

    background: var(--main-active-color,#0073aa);
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
    margin: 10px;

    .admin-tools-item-logo {
      transition: .5s;
      color: black;
      width: 30px;
      height: 30px;

      &:hover {
       
        width: 40px;
        height: 40px;
      }
    }
  }
`

const AdminTools: FC = () => {
    const nodeRef = React.useRef(null);
    const dispatch = useDispatch()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        //@ts-ignore
            <Draggable nodeRef={nodeRef}>
                <StyledDiv className='admin-tools' >
                    <button className='admin-tools-item open-button'
                            ref={nodeRef}
                            onDoubleClick={() => setOpen(!open)}
                            onTouchStartCapture={() => setOpen(!open)}>
                        <FontAwesomeIcon icon={faCogs} className='admin-tools-item-logo'/>
                    </button>

                    {open &&
                        //@ts-ignore
                        <>
                            <Link href={'/admin'} locale={false}>
                                <a className='admin-tools-item' target={'_blank'}>
                                    <FontAwesomeIcon icon={faUserShield} className='admin-tools-item-logo'/>
                                </a>
                            </Link>
                            <Link href={'/admin/design/widgets'} locale={false}>
                                <a className='admin-tools-item' target={'_blank'}>
                                    <FontAwesomeIcon icon={faPenSquare} className='admin-tools-item-logo'/>
                                </a>
                            </Link>
                            <Link href={'/admin/settings/general'} locale={false}>
                                <a className='admin-tools-item' target={'_blank'}>
                                    <FontAwesomeIcon icon={faGear} className='admin-tools-item-logo'/>
                                </a>
                            </Link>
                            <Link href={'/admin/assets?assetsType=posts'} locale={false}>
                                <a className='admin-tools-item' target={'_blank'}>
                                    <FontAwesomeIcon icon={faEnvelope} className='admin-tools-item-logo'/>
                                </a>
                            </Link>
                            <button className='admin-tools-item'
                                    onClick={() => dispatch(clearCaches(router))}
                                    onTouchStartCapture={() => dispatch(clearCaches(router))}>
                                <FontAwesomeIcon icon={faEraser} className='admin-tools-item-logo'/>
                            </button>
                        </>
                    }

                </StyledDiv>
            </Draggable>

    );
};
export default AdminTools;
