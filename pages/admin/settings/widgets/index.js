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
    const renderSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='sidebar'){
            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widget }/>
            )
        }
    })
    const renderPostPageSidebarWidgets = contextData.widgetsSettings.widgets.map(widget => {
        if (widget.position==='postPageSideBar'){
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
                        <p className='widgetAdminPanelItemHeader'>Sidebar</p>
                        {renderSidebarWidgets}
                    </div>
                    <div className='widgetAdminPanelItem'>
                        <p className='widgetAdminPanelItemHeader'>Post Page</p>
                        {renderPostPageSidebarWidgets}
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
