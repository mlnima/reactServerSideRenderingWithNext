import React, {useEffect, useMemo, useState} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import setAppLayoutDataFromProp from '../../_variables/clientVariables/_setAppLayoutDataFromProp';
import SiteSettingSetter from "../includes/SiteSettingsSetter/SiteSettingsSetter";
import GlobalStyles from "../global/GlobalStyles";
import {useDispatch, useSelector} from 'react-redux';
import {autoUserLogin} from "../../store/actions/userActions";
import {setLoading} from "../../store/actions/globalStateActions";
import _getMultipleWidgets from '../../_variables/adminAjaxVariables/adminAjaxWidgetsVariables/_getMultipleWidgets'
import getMultipleSetting from '../../_variables/adminAjaxVariables/adminAjaxSettingsVariables/getMultipleSetting'
import {setSettings} from "../../store/actions/settingsActions";
import {setWidgetsForAdmin} from "../../store/actions/widgetsActions";

const SideBarWidgetArea = dynamic(() => import('../widgetsArea/SideBarWidgetArea/SideBarWidgetArea'))
const HeaderWidgetArea = dynamic(() => import('../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'))
const TopBarWidgetArea = dynamic(() => import('../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'))
const NavigationWidgetArea = dynamic(() => import('../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'))
const FooterWidgetArea = dynamic(() => import('../widgetsArea/FooterWidgetArea/FooterWidgetArea'))
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
const AdminTools = dynamic(() => import('../includes/AdminTools/AdminTools'), {ssr: false})
const Console = dynamic(() => import('../includes/AdminTools/Console/Console'), {ssr: false})

const AppLayout = props => {

    const userData = useSelector(state => state.user.userData)
    const globalState = useSelector(state => state.globalState)
    const settings = useSelector(state => state.settings)
    const widgets = useSelector(state => state.widgets.widgets)
    const router = useRouter()
    const dispatch = useDispatch()
    const [sidebarsData, setSidebarsData] = useState(() => setAppLayoutDataFromProp(props, router, settings))

    //const sidebarsData = useMemo(() => setAppLayoutDataFromProp(props, router, settings), [router.pathname])
    const [isSidebarLess, setIsSidebarLess] = useState(() => {
        return router.pathname === '/404' || router.pathname === '/500' || router.pathname === '/_error' || router.pathname.includes('/profile');
    })

    useEffect(() => {


        globalState.loading ?
            dispatch(setLoading(false)) :
            null

    }, [router.pathname]);

    useEffect(() => {
        setSidebarsData(()=>{
            return setAppLayoutDataFromProp(props, router, settings)
        })
    }, [router.asPath,router.pathname]);

    const mainLayoutClassNameForGrid = isSidebarLess ? 'withOutSidebar' : sidebarsData.sidebarType === 'left' ? 'leftSidebar' : sidebarsData.sidebarType === 'right' ? 'rightSidebar' : sidebarsData.sidebarType === 'both' ? 'bothSidebar' : 'withOutSidebar';

    const defaultProps = {
        isMobile: props.isMobile,
        postElementSize: settings.design?.postElementSize,
        postElementStyle: settings.design?.postElementStyle,
        postElementImageLoader: settings.design?.postElementImageLoader,
        postElementImageLoaderType: settings.design?.postElementImageLoaderType,
        referer: props.referer
    }

    useEffect(() => {
        if (localStorage.wt && !userData.loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, []);

    const widgetsInGroups = {
        topBar: widgets ? widgets?.filter(widget => widget?.data?.position === 'topBar') || [] : [],
        header: widgets ? widgets?.filter(widget => widget?.data?.position === 'header') || [] : [],
        navigation: widgets ? widgets?.filter(widget => widget?.data?.position === 'navigation') || [] : [],
        footer: widgets ? widgets?.filter(widget => widget?.data?.position === 'footer') || [] : [],
        [sidebarsData.leftSidebar.name]: widgets ? widgets?.filter(widget => widget?.data?.position === sidebarsData.leftSidebar.name) || [] : [],
        [sidebarsData.rightSidebar.name]: widgets ? widgets?.filter(widget => widget?.data?.position === sidebarsData.rightSidebar.name) || [] : [],
    }


    //*** get and set all none cached data for the Admin
    useEffect(() => {
        if (userData.role === 'administrator') {
            getAndSetDataForAdmin().then(() => console.log('welcome Admin, latest uncached data are sent for you'))
        }
    }, [userData]);

    const getAndSetDataForAdmin = async () => {
        try {
            const settingsData = await getMultipleSetting({settings: ['identity', 'design']}, localStorage.wt)
            const widgetData = await _getMultipleWidgets(localStorage.wt)

            if (widgetData?.data?.widgets) {
                dispatch(setWidgetsForAdmin(widgetData.data.widgets))
            }
            if (settingsData?.data) {
                const identityData = settingsData.data.settings ? settingsData.data.settings.find(s => s.type === 'identity') : {}
                const designData = settingsData.data.settings ? settingsData.data.settings.find(s => s.type === 'design') : {}
                dispatch(setSettings({
                    design: designData.data,
                    identity: identityData.data,
                }))
            }

        } catch (err) {
            console.log(err)
        }
    }

    //***

    return (
        <div className={'App ' + mainLayoutClassNameForGrid}>
            <GlobalStyles colors={settings.design?.customColors || ''} globalStyleData={settings.design?.customStyles || ''}/>
            <SiteSettingSetter identity={settings.identity} design={settings.design} eCommerce={settings.eCommerce}/>
            {widgetsInGroups.topBar.length > 0 ?
                <TopBarWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.topBar}
                    className='topbar'
                    position='topBar'
                    stylesData={settings.design?.topBarStyle || ''}
                />
                : null}
            {widgetsInGroups.header.length > 0 ?
                <HeaderWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.header}
                    className='header' position='header'
                    stylesData={settings.design?.headerStyle || ''}
                />
                : null}
            {widgetsInGroups.navigation.length > 0 ?
                <NavigationWidgetArea
                    {...defaultProps}
                    className='navigation'
                    position='navigation'
                    stylesData={settings.design?.navigationStyle || ''}
                />
                : null}

            {widgetsInGroups?.[sidebarsData.leftSidebar.name]?.length > 0 && sidebarsData?.leftSidebar?.enable ?
                <SideBarWidgetArea
                    {...defaultProps}
                    gridArea='leftSidebar'
                    widgets={widgetsInGroups[sidebarsData.leftSidebar.name]}
                    className='left-sidebar'
                    position={sidebarsData.leftSidebar.name}
                />
                : null}

            {props.children}

            {widgetsInGroups?.[sidebarsData.rightSidebar.name]?.length > 0 && sidebarsData?.rightSidebar?.enable ?
                <SideBarWidgetArea
                    {...defaultProps}
                    gridArea='rightSidebar'
                    widgets={widgetsInGroups[sidebarsData.rightSidebar.name]}
                    className='right-sidebar'
                    position={sidebarsData.rightSidebar.name}
                />
                : null}
            {widgetsInGroups.footer.length > 0 ?
                <FooterWidgetArea
                    {...defaultProps}
                    widgets={widgetsInGroups.footer}
                    className='footer' position='footer'
                    stylesData={settings.design?.footerStyle || ''}
                />
                : null}
            {userData?.role === 'administrator' ? <AdminTools/> : null}
            {userData?.role === 'administrator' && globalState?.console ? <Console/> : null}
            {globalState?.loading ? <Loading/> : null}
            {globalState?.alert?.active && globalState?.alert?.alertMessage ? <AlertBox/> : null}
        </div>

    );

};

export default AppLayout;
