import React, {useContext, useEffect} from 'react';
import {AppContext} from "../../context/AppContext";
import GlobalStyles from "../global/Styles/GlobalStyles";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import {autoUserLogin} from "../../store/actions/userActions";
import {useDispatch} from 'react-redux';

const MessengerLayout = props => {
    const contextData = useContext(AppContext);
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(autoUserLogin(['username','role','keyMaster','profileImage','followingCount','followersCount']))
        }
    }, []);

    return (
        <div className='MessengerLayout'>
            <GlobalStyles colors={props.design?.customColors || ''}/>
            <SiteSettingSetter identity={props.identity || contextData?.siteIdentity} design={props.design || contextData?.siteDesign} eCommerce={props.eCommerce}/>
            {props.children}
        </div>
    );
};
export default MessengerLayout;
