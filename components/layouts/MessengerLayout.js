import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../context/AppContext";
import GlobalStyles from "../global/GlobalStyles";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import {createGlobalStyle} from "styled-components";


let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`


const MessengerLayout = props => {
    const contextData = useContext(AppContext);

    return (
        <div className='MessengerLayout'>
            <GlobalStyle globalStyleData={props.design?.data?.customStyles || contextData?.siteDesign?.customStyles || ''}/>
            <GlobalStyles colors={props.design?.data?.customColors || contextData?.siteDesign?.customColors || ''}/>
            <SiteSettingSetter identity={props.identity || contextData?.siteIdentity} design={props.design || contextData?.siteDesign} eCommerce={props.eCommerce}/>
            {props.children}
        </div>
    );
};
export default MessengerLayout;
