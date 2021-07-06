import React, {useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import NewItemMenu from "./NewItemMenu/NewItemMenu";
import Link from 'next/link'
import {faBars, faHome, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  height: 30px;
  background-color: #24282d;
  grid-area: admin-topbar;

  .developmentModeSwitch {
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    p{
      font-size: .7rem;
      margin: 0 10px;
    }
  }

  .adminTopBarControl {
    display: flex;
    align-items: center;
  }

  .adminTopBarItem {
      background-color: transparent;
  color: white;
  outline: none;
  border: none;
    transition: .4s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .clearCache {
    &:hover {
      cursor: pointer;
    }
  }
  @media only screen and (min-width: 768px) {
  .adminSideBarMobileBtn {
   // display: none;
  }
}
`

const AdminTopBar = () => {
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
                    <button className='adminSideBarMobileBtn adminTopBarItem' onClick={() => AdminSideBarOpenCloseHandler()}><FontAwesomeIcon style={{width:'15px',height:'15px'}} icon={faBars} className='post-element-info-logo'/>
                    </button>
                    <Link href='/'><a rel='noreferrer' className='adminTopBarItem'><FontAwesomeIcon style={{width:'15px',height:'15px'}} icon={faHome} className='post-element-info-logo'/></a></Link>
                    <button className='adminNewActionBtn adminTopBarItem' onClick={() => newItemMenuHandler()}><FontAwesomeIcon icon={faPlus} className='post-element-info-logo'/></button>
                    <NewItemMenu active={state.NewItemMenu}/>
                    <p className='clearCache adminTopBarItem' onClick={() => contextData.functions.clearCaches()}>Clear Caches</p>
                </div>
                <button className='adminActionBtn adminTopBarItem' onClick={() => adminActionHandler()}><FontAwesomeIcon style={{width:'15px',height:'15px'}} icon={faUser} className='post-element-info-logo'/></button>
                <AdminActionMenu active={state.AdminActionMenu}/>
            </StyledDiv>

        </>
    );
};
export default AdminTopBar;