import {FC} from 'react';
import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import GlobalStyles from "../global/Styles/GlobalStyles";
import _setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import {useRouter} from "next/router";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
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

interface AppLayoutPropTypes {
    pageInfo?: {},
    children: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children, pageInfo}) => {

    const {pathname} = useRouter();

    const layoutData = useSelector(({user,settings,globalState}: StoreTypes) => {
        const isSidebarLess = pathname.match( /\/404|\/500|\/_error|\/profile/g)
        const sidebarsData = _setAppLayoutDataFromProp(pageInfo, pathname, settings?.identity)

        return {
            loggedIn: user?.loggedIn,
            userRole: user?.userData?.role,
            customColors: settings?.design?.customColors || '',
            customStyles: settings?.design?.customStyles || '',
            sideBarWidth: settings?.design?.sideBarWidth || 320,
            identity: settings?.identity,
            loading: globalState?.loading,
            loginRegisterFormPopup: globalState?.loginRegisterFormPopup,
            alert: globalState?.alert,
            sidebarsData,
            isSidebarLess,
            mainLayoutClassNameForGrid:isSidebarLess ? 'without-sidebar-layout' :
                                       sidebarsData?.sidebarType === 'left' ? 'left-sidebar-layout' :
                                       sidebarsData?.sidebarType === 'right' ? 'right-sidebar-layout' :
                                       sidebarsData?.sidebarType === 'both' ? 'both-sidebar-layout' :
                                       'without-sidebar-layout',
        }
    });



    return (
        <div className={'App ' + layoutData.mainLayoutClassNameForGrid}>
            <GlobalStyles colors={layoutData.customColors}
                          globalStyleData={layoutData.customStyles}
                          sideBarWidth={layoutData.sideBarWidth}
            />
            <SiteSettingSetter/>
            {!layoutData.identity?.topbar || layoutData.identity?.topbar === 'enable' ? <TopBarWidgetArea/> : null}
            {!layoutData.identity?.header || layoutData.identity?.header === 'enable' ? <HeaderWidgetArea/> : null}
            {!layoutData.identity?.navigation || layoutData.identity?.navigation === 'enable' ? 
                <NavigationWidgetArea/> 
                : null
            }
            {layoutData?.sidebarsData?.leftSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='leftSidebar'
                    className='left-sidebar'
                    position={layoutData?.sidebarsData?.leftSidebar?.name}
                />
                : null
            }

            {children}

            {layoutData?.sidebarsData?.rightSidebar?.enable ?
                <SideBarWidgetArea
                    gridArea='rightSidebar'
                    className='right-sidebar'
                    position={layoutData?.sidebarsData?.rightSidebar?.name}
                />
                : null
            }

            {!layoutData.identity?.footer || layoutData.identity?.footer === 'enable' ? <FooterWidgetArea/> : null}
            {layoutData.loginRegisterFormPopup && !layoutData.loggedIn ? <LoginRegisterPopup/> : null}
            {layoutData.userRole === 'administrator' ? <AdminTools/> : null}
            {layoutData.loading ? <Loading/> : null}
            {layoutData.alert?.active && layoutData.alert?.message ? <AlertBox/> : null}

            {typeof window !== 'undefined' ? localStorage.cookieAccepted !== 'true' ?
                <CookiePopup/>
                : null : null
            }

            {layoutData.userRole === 'administrator' ? <AdminDataSetter/> : null}

        </div>
    );
};

export default AppLayout;

