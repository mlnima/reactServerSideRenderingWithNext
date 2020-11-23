import React, {useEffect, useContext} from 'react';
import Loading from "../includes/Loading/Loading";
import AlertBox from '../includes/AlertBox/AlertBox'
import '../../styles/global.scss'
import {initGA, logPageView} from '../../_variables/_variables'
import AdminTools from "../includes/AdminTools/AdminTools";
import Console from "../includes/AdminTools/Console/Console";
import {createGlobalStyle} from "styled-components";
import {AppContext} from "../../context/AppContext";
import WidgetArea from "../widgetsArea/WidgetArea/WidgetArea";

//import CheckOutSlide from "../includes/checkOutPageComponents/CheckOutSlide/CheckoutSlide";

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
            <WidgetArea className='top-bar' position='topBar' stylesData={contextData.siteDesign.topBarStyle}/>
            <WidgetArea className='header' position='header' stylesData={contextData.siteDesign.headerStyle}/>
            <WidgetArea className='navigation' position='navigation' stylesData={contextData.siteDesign.navigationStyle}/>
            <div className="App">
                {props.children}
            </div>
            <WidgetArea className='footer' position='footer' stylesData={contextData.siteDesign.footerStyle}/>
            <AdminTools/>
            <Console/>
            <Loading/>
            <AlertBox/>
            {/*<CheckOutSlide/>*/}
        </div>

    );

};

export default AppLayout;
