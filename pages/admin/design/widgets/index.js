import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import {AppContext} from '../../../../context/AppContext'
import WidgetModel from '../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel';
import {getFirstLoadData, getMultipleSetting, getMultipleWidgetWithData, getPagesData} from '../../../../_variables/ajaxVariables'
import {getAbsolutePath} from '../../../../_variables/_variables'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import WidgetGroupByPosition from "../../../../components/adminIncludes/widgetPageComponents/WidgetGroupByPosition/WidgetGroupByPosition";
import _ from 'lodash';


const HomePageWidgets = props => {
    const contextData = useContext(AppContext);

    const [siteIdentity, setSiteIdentity] = useState({
        translationLanguages: []
    })
    const [customPages, setCustomPages] = useState([])

    useEffect(() => {
        getAndSetCustomPagesData()
        setSiteIdentity({
            ...siteIdentity,
            ...props.identity.data
        })
        contextData.dispatchWidgetsSettings({
            ...contextData.widgetsSettings,
            widgets: [...props.widgets]
        })
    }, []);

    const getAndSetData = () => {
        getAndSetCustomPagesData()
        contextData.dispatchWidgetsSettings({
            ...contextData.widgetsSettings,
            widgets: [...props.widgets]
        })

    }

    const getAndSetWidgetsData = () => {
        getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(widgetsData => {
            if (widgetsData.data.widgets) {
                contextData.dispatchWidgetsSettings({
                    ...contextData.widgetsSettings,
                    widgets: [...widgetsData.data.widgets]
                })
            }
        })
    }
    const getAndSetCustomPagesData = () => {
        getPagesData().then(res => {
            if (res.data) {
                if (res.data.pages) {
                    const pagesNames = res.data.pages.map(page => page.pageName)
                    setCustomPages(pagesNames)
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const renderWidgetsInPosition = [...new Set((contextData.widgetsSettings.widgets).map(widgets => {
        return widgets.data.position
    }))].map(position => {
        const widgetsInGroupByPosition = contextData.widgetsSettings.widgets.filter(widgets => widgets.data.position === position)
        const widgetsOnThisType = widgetsInGroupByPosition.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
        return (
            <WidgetGroupByPosition widgetsInGroupByPosition={widgetsInGroupByPosition} key={_.uniqueId('id_')} siteIdentity={siteIdentity} position={position}
                                   widgets={widgetsOnThisType} customPages={customPages} getAndSetWidgetsData={getAndSetWidgetsData}/>
        )
    })


    return (
        <div className='admin-widgets-page'>
            <h1>Widgets Settings</h1>

            <div id='widget-setting'>
                <h2>Add New Widget</h2>
                <div className="sidePanel">
                    <AddWidgetMenu getAndSetData={getAndSetData} customPages={customPages}/>
                </div>
                <h2>Widgets:</h2>
                <div className="widgets">
                    {renderWidgetsInPosition}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const domainName = process.env.PRODUCTION_URL;
    const settingsData = await getMultipleSetting({settings: ['identity']},process.env.PRODUCTION_URL, false, 'adminPostPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: ['all']}, process.env.PRODUCTION_URL, false, Date.now())
    return {props: {widgets: widgetsData.data.widgets, identity: settingsData.data.settings.identity}}
}


export default HomePageWidgets;
