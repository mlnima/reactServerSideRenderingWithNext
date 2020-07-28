import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import { AppContext } from "../../../context/AppContext";
import { withRouter } from "next/router";


const TopBar = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style: {}
    });

    useEffect(() => {
        setState({
            ...state,
            style: {
                backgroundColor: contextData.siteDesign.topBarBackgroundColor,
                color: contextData.siteDesign.topBarTextColor
            }
        })
    }, [ contextData.siteDesign ]);

    const AdminItem = () => {
        if (contextData.userData.role === 'administrator') {
            return (
                <>
                    <Link href='/admin'><a style={ state.style }>Admin Panel</a></Link>
                    <p style={ state.style } onClick={ () => contextData.functions.clearCaches() }>Clear Caches</p>
                </>
            )
        } else return null
    }



    const MyProfile = ()=>{
        if (contextData.siteIdentity.membership){
            return       <Link href={ `/profile?username=${ contextData.userData.username }` }><a style={ state.style }>My Profile</a></Link>
        }else return null
    }





    const LoggedInItems = () => {
        if (contextData.userData.username) {
            return (
                <>
                    <p style={ state.style } onClick={ () => contextData.functions.logOutUser() }>Log Out</p>
                   <MyProfile/>
                </>
            )
        } else return null
    }

    const LoggedOutItems = () => {
        if (!contextData.userData.username && contextData.siteIdentity.topBarAuthBtn) {
            return (
                <>
                    <Link href='/auth/login'><a>Login</a></Link>
                    <span>Or</span>
                    <Link href='/auth/register'><a>Register</a></Link>
                </>
            )
        } else return null
    }

    // if (contextData.userData.username) {
    //     if (contextData.userData.role === 'administrator') {
    //         return (
    //             <div className='TopBar' style={ state.style }>
    //                 <Link href='/admin'><a>Admin Panel</a></Link>
    //                 <button style={ state.style } onClick={ () => contextData.functions.logOutUser() }>Log Out</button>
    //                 <button onClick={ () => contextData.functions.clearCaches() }>Clear Caches</button>
    //
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className='TopBar' style={ state.style }>
    //                 <button style={ state.style } onClick={ () => contextData.functions.logOutUser() }>Log Out</button>
    //             </div>
    //         );
    //     }
    // } else {
    //     return (
    //         <div className='TopBar' style={ state.style }>
    //             <Link href='/auth/login'><a>Login</a></Link>
    //             <span>Or</span>
    //             <Link href='/auth/register'><a>Register</a></Link>
    //         </div>
    //     );
    // }

    return (
        <div className='TopBar' style={ state.style }>
            <AdminItem/>
            <LoggedInItems/>
            <LoggedOutItems/>
        </div>
    )
};

export default withRouter(TopBar);
