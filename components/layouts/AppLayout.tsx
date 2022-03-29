import {FC} from 'react';
import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import GlobalStylesComponent from "../global/Styles/GlobalStylesComponent";
import _setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import {useRouter} from "next/router";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import SiteSettingSetter from '../includes/SiteSettingsSetter/SiteSettingsSetter'

const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SidebarWidgetArea/SidebarWidgetArea'));
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'));
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false});
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false});
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false});
const LoginRegisterPopup = dynamic(() => import('../includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const CookiePopup = dynamic(() => import('../includes/ClientPopActionRequest/CookiePopup'), {ssr: false});
const AdminDataSetter = dynamic(() => import('../global/AdminDataSetter'), {ssr: false});
const BackToTopButton = dynamic(() => import('@components/includes/BackToTopButton/BackToTopButton'), {ssr: false});

interface AppLayoutPropTypes {
    pageInfo?: {},
    children: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {

    const {pathname} = useRouter();

    const {
        loggedIn,
        userRole,
        identity,
        loading,
        loginRegisterFormPopup,
        alert,
        sidebarsData,
        mainLayoutClassNameForGrid
    } = useSelector(({user, settings, globalState, posts}: StoreTypes) => {
        const sidebarsData = _setAppLayoutDataFromProp(posts.pageData, pathname, settings?.identity)

        return {
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
            identity: settings?.identity,
            loading: globalState?.loading,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup,
            alert: globalState?.alert,
            sidebarsData,
            mainLayoutClassNameForGrid: pathname.match(/\/404|\/500|\/_error|\/profile/g) ?
                'without-sidebar-layout' :
                `${sidebarsData ? sidebarsData?.sidebarType : 'without'}-sidebar-layout`
        }
    });


    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStylesComponent/>
            <SiteSettingSetter/>
            {identity?.topbar === 'enable' ? <TopBarWidgetArea/> : null}
            {identity?.header === 'enable' ? <HeaderWidgetArea/> : null}
            {identity?.navigation === 'enable' ? <NavigationWidgetArea/> : null}
            {sidebarsData?.leftSidebar?.enable && mainLayoutClassNameForGrid !==  'without-sidebar-layout'  ?
                <SideBarWidgetArea
                    gridArea='leftSidebar'
                    className='left-sidebar'
                    position={sidebarsData?.leftSidebar?.name}
                />
                : null
            }

            {children}

            {sidebarsData?.rightSidebar?.enable  && mainLayoutClassNameForGrid !==  'without-sidebar-layout'  ?
                <SideBarWidgetArea
                    gridArea='rightSidebar'
                    className='right-sidebar'
                    position={sidebarsData?.rightSidebar?.name}
                />
                : null
            }
            <BackToTopButton/>
            {identity?.footer === 'enable' ? <FooterWidgetArea/> : null}
            {loginRegisterFormPopup && !loggedIn ? <LoginRegisterPopup/> : null}
            {userRole === 'administrator' ? <AdminTools/> : null}
            {loading ? <Loading/> : null}
            {alert?.active && alert?.message ? <AlertBox/> : null}


            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }

            {userRole === 'administrator' ? <AdminDataSetter userRole={userRole}/> : null}

        </div>
    );
};

export default AppLayout;

