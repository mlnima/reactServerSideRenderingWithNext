import React, {useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import NewItemMenu from "./NewItemMenu/NewItemMenu";
import Link from 'next/link'
import {faBars, faHome, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {clearCaches} from "../../../store/actions/adminPanelGlobalStateActions";

let StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 30px;
  background-color: var(--admin-topbar-background-color);
  grid-area: admin-topbar;

  .developmentModeSwitch {
    display: flex;
    color: var(--admin-topbar-text-color);
    justify-content: center;
    align-items: center;

    p {
      font-size: .7rem;
      margin: 0 10px;
    }
  }

  .adminTopBarControl {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .adminTopBarItem {
    background-color: transparent;
    color: var(--admin-topbar-text-color);
    outline: none;
    border: none;
    transition: .4s;
    margin: 0 10px;

    &:hover {
      transform: scale(1.1);
    }
  }

  .clearCache {
    &:hover {
      cursor: pointer;
    }
  }
`

const AdminTopBar = () => {
    const dispatch = useDispatch()
    const contextData = useContext(AppContext);
    const [state, dispatchState] = useState({
        AdminActionMenu: false,
        NewItemMenu: false
    });

    const AdminSideBarOpenCloseHandler = () => {
        contextData.settings.adminPanelSideBar ?
            contextData.dispatchSettings(settings => ({
                ...settings,
                adminPanelSideBar: false,
            })) :
            contextData.dispatchSettings(settings => ({
                ...settings,
                adminPanelSideBar: true,
            }))
    };

    const adminActionHandler = () => {
        state.AdminActionMenu ?
            dispatchState({
                ...state,
                AdminActionMenu: false
            }) :
            dispatchState({
                ...state,
                AdminActionMenu: true
            })
    };

    const newItemMenuHandler = () => {
        state.NewItemMenu ?
            dispatchState({
                ...state,
                NewItemMenu: false
            }) :
            dispatchState({
                ...state,
                NewItemMenu: true
            })
    };

    return (
        <>
            <StyledDiv className='adminTopBar'>
                <div className="adminTopBarControl">
                    <span className='adminSideBarMobileBtn adminTopBarItem' onClick={() => AdminSideBarOpenCloseHandler()}>
                        <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faBars} className='post-element-info-logo'/>
                    </span>
                    <Link href='/'>
                        <a  className='adminTopBarItem'>
                        <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faHome} className='post-element-info-logo'/>
                    </a>
                    </Link>
                    <span className='adminNewActionBtn adminTopBarItem' onClick={() => newItemMenuHandler()}><FontAwesomeIcon icon={faPlus} className='post-element-info-logo'/></span>
                    <NewItemMenu active={state.NewItemMenu}/>
                    <p className='clearCache adminTopBarItem' onClick={() => dispatch(clearCaches())}>Clear Caches</p>
                </div>
                <button className='adminActionBtn adminTopBarItem' onClick={() => adminActionHandler()}>
                    <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faUser} className='post-element-info-logo'/>
                </button>
                <AdminActionMenu active={state.AdminActionMenu}/>
            </StyledDiv>

        </>
    );
};
export default AdminTopBar;