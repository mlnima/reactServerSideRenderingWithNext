import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import { AppContext } from '../../../../context/AppContext'
import WidgetModel from '../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel';
import { getSetting, getWidgets, getWidgetsWithData, updateSetting, getMultipleWidgetWithData } from '../../../../_variables/ajaxVariables'
import { getAbsolutePath } from '../../../../_variables/_variables'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'

const HomePageWidgets = props => {

    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        home: [],
        homePageSidebar: [],
        postPageSidebar: [],
        postsPageSidebar: [],
        footer: [],
        metaPageSidebar: [],
        tagsPageSidebar: [],
        categoriesPageSidebar: [],
        actorsPageSidebar: [],
        header: []
    })
    useEffect(() => {

        if (props.widgets) {
            contextData.dispatchWidgetsSettings({
                ...contextData.widgetsSettings,
                widgets: [ ...props.widgets ]
            })

            //=============
        }
    }, []);



    const renderHomeWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'home') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderHomePageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'homePageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderPostPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'postPageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderPostsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'postsPageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderFooterWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'footer') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderMetaPageSidebarPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'metaPageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderTagsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'tagsPageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderCategoriesPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'categoriesPageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderActorsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'actorsPageSidebar') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderHeaderPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position === 'header') {
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })

    return (
        <AdminLayout>

            <h1>Widgets Settings :</h1>


            <h2>Add Widgets:</h2>

            <div id='HomePageWidgets'>
                <div className="sidePanel">
                    <AddWidgetMenu/>
                </div>
                <div className="widgets">
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Homepage</p>
                        { renderHomeWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Header</p>
                        { renderHeaderPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Home Page Sidebar</p>
                        { renderHomePageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Post Page</p>
                        { renderPostPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Posts Page</p>
                        { renderPostsPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Meta Page</p>
                        { renderMetaPageSidebarPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Tags Page</p>
                        { renderTagsPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Categories Page</p>
                        { renderCategoriesPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Actors Page</p>
                        { renderActorsPageSidebarWidgets }
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Footer</p>
                        { renderFooterWidgets }
                    </div>
                </div>
            </div>

            <h2>Color Widget:</h2>
            <div className='colorSettingSections'>
                <ColorSection designName='widgetHeaderBackgroundColor'/>
                <ColorSection designName='widgetHeaderTextColor'/>
                <ColorSection designName='widgetHeaderRedirectLinkBackgroundColor'/>
                <ColorSection designName='widgetHeaderRedirectLinkTextColor'/>
                <ColorSection designName='widgetBodyBackgroundColor'/>
                <ColorSection designName='widgetBodyTextColor'/>
                <ColorSection designName='widgetBodyBorder'/>
            </div>
        </AdminLayout>
    );
};

HomePageWidgets.getInitialProps = async ({ asPath, pathname, query, req, res, err }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let widgets;
    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'all' ] }, false, domainName,Date.now())
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return { widgets, domainName }
}

export default HomePageWidgets;
