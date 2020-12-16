import React, {useEffect, useContext, useState} from 'react';
import Loading from "../includes/Loading/Loading";
import AlertBox from '../includes/AlertBox/AlertBox'
import '../../styles/global.scss'
import {initGA, logPageView} from '../../_variables/_variables'
import AdminTools from "../includes/AdminTools/AdminTools";
import Console from "../includes/AdminTools/Console/Console";
import styled, {createGlobalStyle} from "styled-components";
import WidgetArea from "../widgetsArea/WidgetArea/WidgetArea";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`
import CheckoutPop from "../includes/checkOutPageComponents/CheckoutPop/CheckoutPop";

const AppLayout = props => {


    useEffect(() => {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    }, []);


    return (
        <div className={'App ' + (props.sidebar ? 'withSidebar' : 'withOutSidebar')}>
            <GlobalStyle globalStyleData={props.design?.data?.customStyles ?? ''}/>
            <SiteSettingSetter {...props}/>
            <WidgetArea
                rendering={true}
                isMobile={props.isMobile}
                key='topBar'
                widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'topBar')}
                className='top-bar'
                position='topBar'
                stylesData={props.design?.data?.topBarStyle}
            />
            <WidgetArea
                rendering={true}
                isMobile={props.isMobile}
                key='header' widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'header')}
                className='header' position='header'
                stylesData={props.design?.data?.headerStyle}
            />
            <WidgetArea
                rendering={true}
                isMobile={props.isMobile}
                key='navigation'
                widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'navigation')}
                className='navigation'
                position='navigation'
                stylesData={props.design?.data?.navigationStyle}
            />
            <WidgetArea
                isMobile={props.isMobile}
                key='sidebar'
                widgets={(props.widgets || []).filter(widget => widget?.data?.position === props.sidebarPosition)}
                className='sidebar '
                rendering={props.sidebar}
                position={props.sidebarPosition}
            />
            {props.children}

            <WidgetArea
                rendering={true}
                isMobile={props.isMobile}
                widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'footer')}
                className='footer' position='footer'
                stylesData={props.design?.data?.footerStyle}
            />
            <AdminTools/>
            <Console/>
            <Loading/>
            <AlertBox/>
            <CheckoutPop/>
        </div>

    );

};

export default AppLayout;
