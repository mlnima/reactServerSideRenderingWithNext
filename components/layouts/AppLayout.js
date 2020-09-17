import React, {useEffect, useContext} from 'react';
import Header from "../includes/Header/Header";
import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";
import Loading from "../includes/Loading/Loading";
import AlertBox from '../includes/AlertBox/AlertBox'
import '../../styles/global.scss'
import {initGA, logPageView} from '../../_variables/_variables'
import AdminTools from "../includes/AdminTools/AdminTools";
import Console from "../includes/AdminTools/Console/Console";
import {createGlobalStyle} from "styled-components";
import {AppContext} from "../../context/AppContext";

const AppLayout = props => {
    const contextData = useContext(AppContext);
    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    }, []);

    const GlobalStyle = contextData.siteDesign.customStyles ?
        createGlobalStyle`${contextData.siteDesign.customStyles}` :
        createGlobalStyle``;

    return (
        <div className='app'>
            <GlobalStyle/>
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
        </div>

    );

};

export default AppLayout;
