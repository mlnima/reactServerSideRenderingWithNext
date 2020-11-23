import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const LoggedOutItemsMenu = props => {
    const contextData = useContext(AppContext);

    if (!contextData.userData.username) {
        return (
            <div className='logged-out-items'>
                <Link href='/auth/login' as='/login'>
                    <a aria-label='logged-out-items'>
                        <FontAwesomeIcon icon={faUser} className='svg-logo-small' />
                    </a>
                </Link>

                <Link href='/auth/register' as='/register'>
                    <a aria-label='logged-out-items'>
                        <FontAwesomeIcon icon={faPen} className='svg-logo-small'/>
                    </a>
                </Link>
            </div>
        )
    } else return null

};
export default LoggedOutItemsMenu;
