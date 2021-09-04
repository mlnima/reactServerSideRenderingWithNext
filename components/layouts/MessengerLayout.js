import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import GlobalStyles from "../global/GlobalStyles";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";

const MessengerLayout = props => {
    const contextData = useContext(AppContext);

    return (
        <div className='MessengerLayout'>
            <GlobalStyles colors={props.design?.customColors || ''}/>
            <SiteSettingSetter identity={props.identity || contextData?.siteIdentity} design={props.design || contextData?.siteDesign} eCommerce={props.eCommerce}/>
            {props.children}
        </div>
    );
};
export default MessengerLayout;
