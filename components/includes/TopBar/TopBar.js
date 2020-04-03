import React, { useContext, useEffect } from 'react';
import Link from "next/link";

import { AppContext } from "../../../context/AppContext";
import { withRouter } from "next/router";

const TopBar = props => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        console.log( contextData.userData)
    }, []);
    if (contextData.userData.username) {
        if (contextData.userData.role === 'administrator') {
            return (
                <div className='TopBar'>
                    <button onClick={ () => contextData.functions.logOutUser() }>Log Out</button>
                    <button onClick={ () => contextData.functions.goToAdminPanel() }>Admin Panel</button>
                </div>
            )
        } else {
            return (
                <div className='TopBar'>
                    <button onClick={ () => contextData.functions.logOutUser() }>Log Out</button>
                </div>
            );
        }
    } else {
        return (
            <div className='TopBar'>
                <Link href='/auth/login'><a>Login</a></Link>
                <span>Or</span>
                <Link href='/auth/register'><a>Register</a></Link>
            </div>
        );
    }
};

export default withRouter(TopBar);
