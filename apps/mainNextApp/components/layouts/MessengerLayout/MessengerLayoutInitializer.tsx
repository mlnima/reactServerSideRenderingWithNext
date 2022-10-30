import React, {FC} from "react";
import GlobalStyles from "../../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../../includes/SiteSettingsSetter/SiteSettingsSetter";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import dynamic from "next/dynamic";
const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const AlertBox = dynamic(() => import('../../includes/AlertBox/AlertBox'), {ssr: false});

interface MessengerLayoutInitializerPropTypes {
    children: React.ReactNode
}

const MessengerLayoutInitializer: FC<MessengerLayoutInitializerPropTypes> = ({children}) => {
    const loggedIn = useSelector((store:Store) => store?.user.loggedIn)
    const globalState = useSelector((store:Store) => store?.globalState)
    return (
        <>
            <GlobalStyles />
            <SiteSettingSetter />
            {children}
            {globalState?.alert?.active && globalState?.alert?.message ? <AlertBox/> : null}
            {globalState?.loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/>:null}
        </>
    )
};
export default MessengerLayoutInitializer;
