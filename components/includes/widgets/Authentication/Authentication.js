import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";

const Authentication = props => {
    const contextData = useContext(AppContext);

    const RenderAuthBtns = () => {
        if (contextData.userData.username) {
            return (
                <div className='auth-buttons'>
                    <LoggedInItemsForMenu position='topBar'/>
                </div>
            )
        } else if (!contextData.userData.username) {
            return (
                <div className='auth-buttons'>
                    <LoggedOutItemsMenu position='topBar'/>
                </div>
            )
        } else return null
    }

    return (

        <RenderAuthBtns/>

    );
};
export default Authentication;
