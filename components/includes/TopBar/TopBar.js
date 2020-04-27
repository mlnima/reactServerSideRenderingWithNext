import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link";

import { AppContext } from "../../../context/AppContext";
import { withRouter } from "next/router";
import FA from 'react-fontawesome'

const TopBar = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style:{}
    });

    useEffect(() => {
        setState({
            ...state,
            style:{
                backgroundColor:contextData.siteDesign.topBarBackgroundColor,
                color:contextData.siteDesign.topBarTextColor
            }
        })
    }, [contextData.siteDesign]);


    if (contextData.userData.username) {
        if (contextData.userData.role === 'administrator') {
            return (
                <div className='TopBar' style={state.style}>
                    <Link href='/admin'><a>Admin Panel</a></Link>
                    <button style={state.style} onClick={ () => contextData.functions.logOutUser() }>Log Out</button>
                    <button   onClick={ () => contextData.functions.clearCaches() }>Clear Caches</button>

                </div>
            )
        } else {
            return (
                <div className='TopBar' style={state.style} >
                    <button style={state.style} onClick={ () => contextData.functions.logOutUser() }>Log Out</button>
                </div>
            );
        }
    } else {
        return (
            <div className='TopBar' style={state.style}>
                <Link href='/auth/login'><a>Login</a></Link>
                <span>Or</span>
                <Link href='/auth/register'><a>Register</a></Link>
            </div>
        );
    }
};

export default withRouter(TopBar);
