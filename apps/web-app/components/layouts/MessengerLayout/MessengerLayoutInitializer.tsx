import React, {FC} from "react";
import GlobalStyles from "../../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from "../../includes/SiteSettingsSetter/SiteSettingsSetter";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import dynamic from "next/dynamic";
import {useAppDispatch} from "@store_toolkit/hooks";
import {closeAlert} from "@store_toolkit/clientReducers/globalStateReducer";
const LoginRegisterPopup = dynamic(() => import('../../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const AlertBox = dynamic(() => import('../../global/commonComponents/AlertBox/AlertBox'), {ssr: false});

interface MessengerLayoutInitializerPropTypes {
    children: React.ReactNode
}

const MessengerLayoutInitializer: FC<MessengerLayoutInitializerPropTypes> = ({children}) => {

    const dispatch = useAppDispatch();
    const {loggedIn,globalState} = useSelector(({user,globalState}:Store) => {
        return{
            loggedIn: user.loggedIn,
            alert: globalState?.alert,
            globalState: globalState,
        }
    })

    const closeClientAlert = ()=>{
        dispatch(closeAlert(null))
    }

    return (
        <>
            <GlobalStyles />
            <SiteSettingSetter />
            {children}
            <AlertBox alert={alert} closeAdminpanelAlert={closeClientAlert}/>
            {globalState?.loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/>:null}
        </>
    )
};
export default MessengerLayoutInitializer;
