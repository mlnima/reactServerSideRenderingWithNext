import React, {useContext, useEffect} from 'react';
import dynamic from "next/dynamic";
import {initGA, logPageView} from '../../_variables/_variables'
import {createGlobalStyle} from "styled-components";
import WidgetArea from "../widgetsArea/WidgetArea/WidgetArea";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import {AppContext} from "../../context/AppContext";
const Loading = dynamic(() => import('../includes/Loading/Loading'),{ ssr: false })
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'),{ ssr: false })
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'),{ ssr: false })
const Console = dynamic(() => import('../includes/AdminTools/Console/Console'),{ ssr: false })
let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`

//import CardElement from "../includes/CardElement/CardElement";


const AppLayout = props => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!window.GA_INITIALIZED) {
                initGA()
                window.GA_INITIALIZED = true
            }
            logPageView()
        }
    }, []);

    return (
        <div className={'App ' + (props.sidebar ? 'withSidebar' : 'withOutSidebar')}>
            <GlobalStyle globalStyleData={props.design?.data?.customStyles ?? ''}/>
            <SiteSettingSetter {...props}/>


            {(props.widgets || []).filter(widget => widget?.data?.position === 'topBar').length>0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='topBar'
                    widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'topBar')}
                    className='top-bar'
                    position='topBar'
                    stylesData={props.design?.data?.topBarStyle}
                />:null
            }
            {(props.widgets || []).filter(widget => widget?.data?.position === 'header').length>0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='header' widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'header')}
                    className='header' position='header'
                    stylesData={props.design?.data?.headerStyle}
                />:null
            }
            {(props.widgets || []).filter(widget => widget?.data?.position === 'navigation').length>0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='navigation'
                    widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'navigation')}
                    className='navigation'
                    position='navigation'
                    stylesData={props.design?.data?.navigationStyle}
                />:null
            }
            {(props.widgets || []).filter(widget => widget?.data?.position === props.sidebarPosition).length>0 && props.sidebar ?
                <WidgetArea
                    isMobile={props.isMobile}
                    key='sidebar'
                    widgets={(props.widgets || []).filter(widget => widget?.data?.position === props.sidebarPosition)}
                    className='sidebar '
                    position={props.sidebarPosition}
                />:null
            }

            {props.children}

            {(props.widgets || []).filter(widget => widget?.data?.position === 'footer').length>0 ?
                <WidgetArea
                    isMobile={props.isMobile}
                    widgets={(props.widgets || []).filter(widget => widget?.data?.position === 'footer')}
                    className='footer' position='footer'
                    stylesData={props.design?.data?.footerStyle}
                />:null
            }
            {contextData.userData.role === 'administrator' ?  <AdminTools/> : null }
            {contextData.userData.role === 'administrator' && contextData.state.console  ?  <Console/> : null }
            {contextData.state.loading  ?   <Loading/> : null }
            {contextData.alert.active && contextData.alert.alertMessage  ?  <AlertBox/> : null }
        </div>

    );

};

export default AppLayout;
