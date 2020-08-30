import React, { useEffect} from 'react';
import Header from "../includes/Header/Header";
import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";
import Loading from "../includes/Loading/Loading";
import AlertBox from '../includes/AlertBox/AlertBox'
import '../../styles/global.scss'
import {initGA, logPageView} from '../../_variables/_variables'
import AdminTools from "../includes/AdminTools/AdminTools";
import Console from "../includes/AdminTools/Console/Console";

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
            <Header/>
            <Navigation/>
            <Loading/>
            <AlertBox/>
            <div className="App">
                {props.children}
            </div>
            <AdminTools/>
            <Console/>
        </>
    );

};

export default AppLayout;
