import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const LoggedOutItemsMenu = props => {
    const contextData = useContext(AppContext);

    if (!contextData.userData.username && contextData.siteIdentity.topBarAuthBtn && props.visible) {
        return (
            <div className='logged-out-items'>
                <Link href='/auth/login' as='/login'>
                    <a>
                        <FontAwesomeIcon icon={faUser} className='logged-out-item-logo' style={props.colorsStyle}/>
                    </a>
                </Link>

                <Link href='/auth/register' as='/register'>
                    <a>
                        <FontAwesomeIcon icon={faPen} className='logged-out-item-logo' style={props.colorsStyle}/>
                    </a>
                </Link>
            </div>
        )
    } else return null

};
export default LoggedOutItemsMenu;
