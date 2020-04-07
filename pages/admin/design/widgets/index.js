import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import { AppContext } from '../../../../context/AppContext'
import WidgetModel from '../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel';
import { getSetting, getWidgets, updateSetting } from '../../../../_variables/ajaxVariables'
import { getAbsolutePath } from '../../../../_variables/_variables'

const HomePageWidgets = props => {

    const contextData = useContext(AppContext);
    useEffect(() => {
        if(props.widgets){
            contextData.dispatchWidgetsSettings({
                ...contextData.widgetsSettings,
                widgets: [ ...props.widgets ]
            })
        }
    }, []);

    const renderHomeWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='home'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderHomePageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='homePageSidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderPostPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='postPageSidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderPostsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='postsPageSidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderFooterWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='footer'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderTagsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='tagsPageSidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderCategoriesPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='categoriesPageSidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderActorsPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='actorsPageSidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })




    return (
        <AdminLayout>
            <div id='HomePageWidgets'>
                <div className="sidePanel">
                    <AddWidgetMenu/>
                </div>
                <div className="widgets">
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Homepage</p>
                        {renderHomeWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Home Page Sidebar</p>
                        {renderHomePageSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Post Page</p>
                        {renderPostPageSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Posts Page</p>
                        {renderPostsPageSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Tags Page</p>
                        {renderTagsPageSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Categories Page</p>
                        {renderCategoriesPageSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Actors Page</p>
                        {renderActorsPageSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Footer</p>
                        {renderFooterWidgets}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};


HomePageWidgets.getInitialProps = async ({ asPath,pathname, query, req, res, err }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let widgets;
    const widgetData = await getWidgets('all',false,domainName)
    widgets = widgetData.data.widgets

    return {  widgets,domainName }
}

export default HomePageWidgets;
