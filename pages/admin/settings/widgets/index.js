import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import { AppContext } from '../../../../context/AppContext'
import WidgetModel from '../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel';
import { getSetting, getWidgets, updateSetting } from '../../../../_variables/ajaxVariables'

const HomePageWidgets = props => {
    // const [state,setState]=useState({
    //     homeWidgets:[],
    //     sidebarWidgets:[],
    //     videoSidebarWidgets:[],
    //     footerWidgets:[]
    // })
    const contextData = useContext(AppContext);
    useEffect(() => {
        getWidgets('all').then(res => {
            console.log( res)
            contextData.dispatchWidgetsSettings({
                ...contextData.widgetsSettings,
                widgets: [ ...res.data.widgets ]
            })
        })
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
export default HomePageWidgets;
