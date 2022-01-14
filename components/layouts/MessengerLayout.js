import React, {useEffect} from 'react';
import GlobalStyles from "../global/Styles/GlobalStyles";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import {autoUserLogin} from "../../store/actions/userActions";
import {useDispatch, useSelector} from 'react-redux';
import AlertBox from "../includes/AlertBox/AlertBox";
import dynamic from "next/dynamic";
const LoginRegisterPopup = dynamic(() => import('../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});

const MessengerLayout = props => {
    const loggedIn = useSelector((store) => store?.user.loggedIn)
    const globalState = useSelector(store => store?.globalState)
    const settings = useSelector(store => store?.settings)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, []);

    return (
        <div className='MessengerLayout'>
            <GlobalStyles colors={props.design?.customColors || ''}/>
            <SiteSettingSetter identity={settings?.identity} design={settings?.design} eCommerce={settings.eCommerce}/>
            {props.children}
            {globalState?.alert?.active && globalState?.alert?.message ? <AlertBox/> : null}
            {globalState?.loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/>:null}
        </div>
    );
};
export default MessengerLayout;
