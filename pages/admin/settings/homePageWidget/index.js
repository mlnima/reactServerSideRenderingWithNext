import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import { AppContext } from '../../../../context/AppContext'
import VideoWidgetModel from '../../../../components/adminIncludes/widgetsModel/VideoWidgetModel/VideoWidgetModel';
import { getSetting, getWidgets, updateSetting } from '../../../../_variables/ajaxVariables'

const HomePageWidgets = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    // useEffect(() => {
    //     console.log(contextData.widgetsSettings.homeWidgets)
    //
    // }, [ contextData.widgetsSettings.homeWidgets ]);

    useEffect(() => {
        getWidgets('home').then(res => {
            contextData.dispatchWidgetsSettings({
                homeWidgets: [ ...res.data.widgets ]
            })
            console.log(res)
        })
    }, []);

    const renderWidgets = contextData.widgetsSettings.homeWidgets.map(widget => {
        switch ( widget.type ) {
            case 'videoBlocks':
                return (
                    <VideoWidgetModel key={ contextData.widgetsSettings.homeWidgets.indexOf(widget) } data={ widget }/>
                )
                break
            default :
                break
        }
    })

    const onSaveChangesHandler = () => {
        updateSetting('homePageWidgets', contextData.widgetsSettings.homeWidgets)
    }

    return (
        <AdminLayout>
            <div id='HomePageWidgets'>
                <div className="sidePanel">
                    <AddWidgetMenu/>
                    <button onClick={ () => onSaveChangesHandler() } className='saveBtn'>Save Changes</button>
                </div>
                <div className="widgets">
                    { renderWidgets }
                </div>
            </div>
        </AdminLayout>
    );
};
export default HomePageWidgets;
