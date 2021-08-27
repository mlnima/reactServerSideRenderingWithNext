import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";

const Authentication = () => {
    const contextData = useContext(AppContext);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        contextData.userData.username ? setLoggedIn(true) : setLoggedIn(false)
    }, [contextData.userData.username]);

    return (
        <div className='auth-buttons'>
            {loggedIn ? <LoggedInItemsForMenu position='topBar'/> : <LoggedOutItemsMenu position='topBar'/>}
        </div>
    );
};
export default Authentication;
