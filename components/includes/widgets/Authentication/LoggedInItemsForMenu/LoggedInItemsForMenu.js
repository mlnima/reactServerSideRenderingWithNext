import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faUser} from "@fortawesome/free-regular-svg-icons";

const LoggedInItemsForMenu = props => {
    const contextData = useContext(AppContext);


    const MyProfile = () => {
        if (contextData.siteIdentity.membership) {
            return (
                <Link href={`/profile?username=${contextData.userData.username}`}>
                    <a >
                        <FontAwesomeIcon icon={faUser} className='logged-in-item-logo'/>
                    </a>
                </Link>
            )
        } else return null
    }

    if (contextData.userData.username && props.visible) {
        return (
            <div className='logged-in-items'>
                <p  onClick={() => contextData.functions.logOutUser()}>
                    <FontAwesomeIcon icon={faPowerOff} className='logged-in-item-logo' />
                </p>
                <MyProfile/>
            </div>
        )
    } else return null
};
export default LoggedInItemsForMenu;
