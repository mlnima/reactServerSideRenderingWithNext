import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const LoggedOutItemsMenu = props => {
    const contextData = useContext(AppContext);

    if (!contextData.userData.username || contextData.userData.username === 'guest' ) {
        return (
            <div className='logged-out-items'>
            <style jsx>{`
                .logged-out-items{
                   
                    display: flex;
                    justify-content: space-between;
                }
                .logged-out-item{
                     margin: 0 10px;
                    padding: 0;
                    color: var(--navigation-text-color);
                }
            `}</style>
                <Link href='/auth/login' as='/login'>
                    <a className='logged-out-item' aria-label='logged-out-items'>
                        <FontAwesomeIcon  style={{width:'20px',height:'20px'}} icon={faUser} className='svg-logo-small' />
                    </a>
                </Link>

                <Link href='/auth/register' as='/register'>
                    <a className='logged-out-item' aria-label='logged-out-items'>
                        <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faPen} className='svg-logo-small'/>
                    </a>
                </Link>
            </div>
        )
    } else return null

};
export default LoggedOutItemsMenu;
