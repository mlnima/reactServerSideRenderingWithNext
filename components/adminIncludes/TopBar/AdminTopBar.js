import React, { useState, useContext } from 'react';
import { AppContext } from "../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import NewItemMenu from "./NewItemMenu/NewItemMenu";
import Link from 'next/link'
import {faBars, faHome, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons";


const AdminTopBar = () => {
    const contextData = useContext(AppContext);
    const [ state, dispatchState ] = useState({
        AdminActionMenu: false,
        NewItemMenu:false
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
            <div className='adminTopBar'>
                <div className="adminTopBarControl">
                    <button className='adminSideBarMobileBtn adminTopBarItem' onClick={ () => AdminSideBarOpenCloseHandler() }><FontAwesomeIcon icon={faBars} className='post-element-info-logo'/></button>
                    <Link href='/'><a className='adminTopBarItem'><FontAwesomeIcon icon={faHome} className='post-element-info-logo'/></a></Link>
                    <button className='adminNewActionBtn adminTopBarItem' onClick={ () => newItemMenuHandler() }><FontAwesomeIcon icon={faPlus} className='post-element-info-logo'/></button>
                    <NewItemMenu active={ state.NewItemMenu }/>
                    <p className='clearCache adminTopBarItem' onClick={ () => contextData.functions.clearCaches() }>Clear Caches</p>
                </div>
                <button className='adminActionBtn adminTopBarItem' onClick={ () => adminActionHandler() }><FontAwesomeIcon icon={faUser} className='post-element-info-logo'/></button>
                <AdminActionMenu active={ state.AdminActionMenu }/>
            </div>

        </>
    );
};
export default AdminTopBar;