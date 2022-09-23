import {FC} from 'react';
import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import GlobalStylesComponent from "../global/Styles/GlobalStylesComponent";
import SiteSettingSetter from '../includes/SiteSettingsSetter/SiteSettingsSetter'
import LoadingV2 from "@components/includes/LoadingV2/LoadingV2";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const HeaderWidgetArea = dynamic(() => import('@components/widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('@components/widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('@components/widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('@components/widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const AlertBox = dynamic(() => import('@components/includes/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('@components/includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('@components/includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('@components/includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const AdminDataSetter = dynamic(() => import('@components/global/AdminDataSetter'), {ssr: false});
const BackToTopButton = dynamic(() => import('@components/includes/BackToTopButton/BackToTopButton'), {ssr: false});

interface AppLayoutPropTypes {
    children: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {

    const {
        loggedIn,
        userRole,
        identity,
        cookiePopupMessage,
        loginRegisterFormPopup,
        alert,
    } = useSelector(({user, settings, globalState}: Store) => {
        return {
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
            identity: settings?.identity,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup,
            alert: globalState?.alert,
            cookiePopupMessage: settings?.identity?.cookiePopupMessage
        }
    });

    return (

        <>
            {userRole === 'administrator' && <AdminTools/>}
            <GlobalStylesComponent/>
            <SiteSettingSetter/>
            <header>
                {identity?.topbar === 'enable' && <TopBarWidgetArea/>}
                {identity?.header === 'enable' && <HeaderWidgetArea/>}
                {identity?.navigation === 'enable' && <NavigationWidgetArea/>}
            </header>
            <div id={'page'} className={'App'} suppressHydrationWarning>
                {children}
            </div>
            {identity?.footer === 'enable' && <FooterWidgetArea/>}
            <BackToTopButton/>

            <LoadingV2/>

            {(typeof window !== 'undefined' && !!cookiePopupMessage && localStorage.cookieAccepted !== 'true') &&
            <CookiePopup/>
            }

            {loginRegisterFormPopup && !loggedIn && <LoginRegisterPopup/>}
            {(!!alert?.active && !!alert?.message) && <AlertBox/>}
            {userRole === 'administrator' && <AdminDataSetter userRole={userRole}/>}
        </>

    );
};

export default AppLayout;


// {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
//     <CookiePopup/>
//     : null : null
// }