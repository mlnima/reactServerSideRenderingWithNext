import React, {useEffect} from 'react';
import GlobalStyles from "../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import {useSelector} from 'react-redux';
import AlertBox from "../includes/AlertBox/AlertBox";
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useAppDispatch} from "@store_toolkit/hooks";
const LoginRegisterPopup = dynamic(() => import('../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});

const MessengerLayout = props => {
    const loggedIn = useSelector((store:StoreTypes) => store?.user.loggedIn)
    const globalState = useSelector((store:StoreTypes) => store?.globalState)
    const dispatch = useAppDispatch()

    const alert = useSelector((store: StoreTypes) => store?.globalState?.alert);

    useEffect(() => {  console.log(alert)}, [ alert ]);

    // useEffect(() => {
    //     if (localStorage.wt) {
    //         dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
    //     }
    // }, []);

    return (
        <div className='MessengerLayout'>
            <GlobalStyles />
            <SiteSettingSetter />
            {props.children}
            {globalState?.alert?.active && globalState?.alert?.message ? <AlertBox/> : null}
            {globalState?.loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/>:null}
        </div>
    );
};
export default MessengerLayout;
