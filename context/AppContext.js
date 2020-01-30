import React, { useEffect, useRef, useState } from 'react';
import jwtDecode from "jwt-decode";
import jwt from 'jsonwebtoken';
import axios from "axios";
import {withRouter} from "next/router";

export const AppContext = React.createContext();

const AppProvider = props => {

    const [ state, dispatchState ] = useState({});
    const [ settings, dispatchSettings ] = useState({
        adminPanelSideBar: false,
        test: false
    });
    const [ userData, dispatchUserData ] = useState({});
    const [ functions, dispatchFunctions ] = useState({
        getAndSetUserInfo: async ()=>{
            if (localStorage.wt){
                await axios.post('/api/v1/users/getUserInfo', { token: localStorage.wt }).then(res=>{
                    dispatchUserData({...userData,...res.data.userData});
                }).catch(err=>{
                    console.log( err);
                })
            }
        },
        logOutUser:()=>{
            localStorage.removeItem('wt');
            dispatchUserData({})
            props.router.push('/')
        },
        goToAdminPanel:()=>{
            props.router.push('/admin')
        },
        goToHomePage:()=>{
            props.router.push('/')
        }
    });

    useEffect(()=>{
        functions.getAndSetUserInfo()
    },[ ]);


    useEffect(()=>{
        if (userData.username){
            if(props.router.pathname === '/auth/login'||props.router.pathname === '/auth/register'){
                props.router.push('/')
            }
        }
    },[ props.router.pathname]);


    return (
        <div>
            <AppContext.Provider
                value={ {
                    state,
                    dispatchState,
                    settings,
                    dispatchSettings,
                    userData,
                    dispatchUserData,
                    functions
                } }>

                { props.children }
            </AppContext.Provider>
        </div>
    )
}

export const  AppProviderWithRouter = withRouter(AppProvider);