import React, { useEffect, useState, useContext } from 'react';
import './AdminTopBar.scss';
import { AppContext } from "../../../context/AppContext";
import withRouter from "next/dist/client/with-router";
import FA from "react-fontawesome";
import AdminActionMenu from "./AdminActionMenu/AdminActionMenu";
import NewItemMenu from "./NewItemMenu/NewItemMenu";
// import { setSprCache } from "next/dist/next-server/server/spr-cache";

const AdminTopBar = props => {
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

    const goToHomePage = () => {
        props.router.push('/')
        console.log(props.router)
    };

    const newAction = () => {
        props.router.push('/admin/post')
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
                    <button className='adminSideBarMobileBtn adminTopBarItem' onClick={ () => AdminSideBarOpenCloseHandler() }><FA className='fontawesomeMedium' name="bars"/></button>
                    <button className='adminGoToHomePageBtn adminTopBarItem' onClick={ () => goToHomePage() }><FA className='fontawesomeMedium' name="home"/></button>
                    <button className='adminNewActionBtn adminTopBarItem' onClick={ () => newItemMenuHandler() }><FA className='fontawesomeMedium' name="plus"/></button>
                    <NewItemMenu active={ state.NewItemMenu }/>
                </div>
                <button className='adminActionBtn adminTopBarItem' onClick={ () => adminActionHandler() }><FA className='fontawesomeMedium' name="user"/></button>
                <AdminActionMenu active={ state.AdminActionMenu }/>
            </div>

        </>
    );
};
export default withRouter(AdminTopBar);