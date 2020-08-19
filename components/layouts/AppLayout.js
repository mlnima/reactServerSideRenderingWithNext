import React, {useContext, useEffect} from 'react';
import Header from "../includes/Header/Header";
import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";
import Loading from "../includes/Loading/Loading";
import AlertBox from '../includes/AlertBox/AlertBox'
import '../../styles/global.scss'
import {initGA, logPageView} from '../../_variables/_variables'

import {AppContext} from "../../context/AppContext";
import DynamicTopBar from "../includes/DynamicTopBar/DynamicTopBar";
import DynamicNavigation from "../includes/DynamicNavigation/DynamicNavigation";
// import '../../styles/styles.scss'

const AppLayout = props => {

    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    }, []);

    return (
        <>
            <TopBar/>
            <DynamicTopBar/>

            <Header/>
            <Navigation/>
            <DynamicNavigation/>
            <Loading/>
            <AlertBox/>
            <div className="App">
                {props.children}
            </div>
        </>
    );

};

export default AppLayout;
