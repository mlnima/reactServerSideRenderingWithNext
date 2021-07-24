import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const LoggedOutItemsMenu = props => {
    const contextData = useContext(AppContext);

    const onLoginRegisterHandler  = type =>{
        contextData.dispatchState({
            ...contextData.state,
            loginRegisterFormPopup:true,
            loginRegisterFormPopupType:type
        })
    }



    if (!contextData.userData.username || contextData.userData.username === 'guest' ) {
        return (
            <div className='logged-out-items'>
                <style jsx>{`
                .logged-out-items{
                    display: flex;
                        justify-content: space-between;
                    }
                    .logged-out-item{
                        background-color: transparent;
                        border: none;
                        margin: 0 10px;
                        padding: 0;
                        color: var(--navigation-text-color);
                    }
                `}</style>

                <button onClick={()=>onLoginRegisterHandler('login')} className='logged-out-item ' aria-label='logged-out-items' >
                    <FontAwesomeIcon  style={{width:'20px',height:'20px'}} icon={faUser} className='svg-logo-small' />
                </button>
                <button onClick={()=>onLoginRegisterHandler('register')} className='logged-out-item ' aria-label='logged-out-items' >
                    <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faPen} className='svg-logo-small'/>
                </button>
            </div>
        )
    } else return null

};
export default LoggedOutItemsMenu;
