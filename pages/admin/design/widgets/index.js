import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import {AppContext} from '../../../../context/AppContext'
import WidgetModel from '../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel';
import {getMultipleSetting, getMultipleWidgetWithData, getPagesData} from '../../../../_variables/ajaxVariables'
import {getAbsolutePath} from '../../../../_variables/_variables'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import WidgetGroupByPosition from "../../../../components/adminIncludes/widgetPageComponents/WidgetGroupByPosition/WidgetGroupByPosition";

const HomePageWidgets = props => {
    const contextData = useContext(AppContext);

    const [siteIdentity, setSiteIdentity] = useState({
        translationLanguages: []
    })
    const [customPages, setCustomPages] = useState([])


    useEffect(() => {
        getAndSetData()
    }, []);


    const getAndSetData = () => {
        getAndSetSettings()
        getAndSetWidgetsData()
        getAndSetCustomPagesData()
    }

    const getAndSetSettings = () => {
        getMultipleSetting({settings: ['identity']}, window.location.origin, false, 'adminPostPage').then(settingsData => {
            if (settingsData.data.settings) {
                const settings = settingsData.data.settings ? settingsData.data.settings : []
                // console.log(settings.identity)
                if (settingsData.data.settings.identity) {
                    setSiteIdentity({
                        ...siteIdentity,
                        ...settings.identity.data
                    })
                }
            }

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

    // useEffect(() => {
    //     console.log(contextData.widgetsSettings.widgets)
    // }, [contextData.widgetsSettings]);

    const getAndSetCustomPagesData = () => {
        getPagesData().then(res => {
            if (res.data) {
                if (res.data.pages) {
                    const pagesNames = res.data.pages.map(page => page.pageName)
                    setCustomPages(pagesNames)
                }
            }
        })
    }


    //   const renderWidgetsInPosition = [...new Set((contextData.widgetsSettings.widgets).map(widgets => {
    const renderWidgetsInPosition = [...new Set((contextData.widgetsSettings.widgets).map(widgets => {
        return widgets.data.position
    }))].map(position => {
        const widgetsInGroupByPosition = contextData.widgetsSettings.widgets.filter(widgets => widgets.data.position === position)
        const widgetsOnThisType = widgetsInGroupByPosition.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
        //     .map(widget => {
        //
        //     const dataWithIndex = {
        //         data: {
        //             ...widget.data,
        //             widgetIndex: widget.data.widgetIndex ? widget.data.widgetIndex : widgetsInGroupByPosition.indexOf(widget)
        //         }
        //     }
        //     const widgetData = {...widget, ...dataWithIndex}
        //
        //     return (
        //         <WidgetModel
        //             key={contextData.widgetsSettings.widgets.indexOf(widget)}
        //             isPost={false}
        //             widgetId={widgetData._id}
        //             data={widgetData.data}
        //             customPages={customPages}
        //             getAndSetWidgetsData={getAndSetWidgetsData}
        //             translationLanguages={siteIdentity.translationLanguages || []}
        //         />
        //     )
        // })
        return (
            <>
                {/*<div className='widgetAdminPanelItem' key={position}>*/}
                {/*    <p className='widgetAdminPanelItemHeader'>{convertVariableNameToName(position)}</p>*/}
                {/*    {widgetsOnThisType}*/}
                {/*</div>*/}
                <WidgetGroupByPosition widgetsInGroupByPosition={widgetsInGroupByPosition}  siteIdentity={siteIdentity} position={position} widgets={widgetsOnThisType} customPages={customPages} getAndSetWidgetsData={getAndSetWidgetsData}/>
            </>
        )
    })






    return (
        <AdminLayout>
            <h1>Widgets Settings :</h1>
            <h2>Add Widgets:</h2>
            <div id='widget-setting'>
                <div className="sidePanel">
                    <AddWidgetMenu getAndSetData={getAndSetData} customPages={customPages}/>
                </div>
                <div className="widgets">
                    {renderWidgetsInPosition}

                </div>
            </div>

            <h2>Color Widget:</h2>
            <div className='colorSettingSections'>
                <ColorSection designName='widgetHeaderBackgroundColor'/>
                <ColorSection designName='widgetHeaderTextColor'/>
                <ColorSection designName='widgetHeaderRedirectLinkBackgroundColor'/>
                <ColorSection designName='widgetHeaderRedirectLinkTextColor'/>
                <ColorSection designName='widgetHeaderBorder'/>
                <ColorSection designName='widgetBodyBackgroundColor'/>
                <ColorSection designName='widgetBodyTextColor'/>
                <ColorSection designName='widgetBodyBorder'/>

            </div>
        </AdminLayout>
    );
};

// HomePageWidgets.getInitialProps = async ({req}) => {
//     const domainName = req ? await getAbsolutePath(req) : '';
//     let widgets;
//     let settings;
//     const settingsData = await getMultipleSetting({settings: ['identity']}, domainName, false, 'adminPostPage')
//     const widgetsData = await getMultipleWidgetWithData({widgets: ['all']}, domainName, false, Date.now())
//     settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
//     widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
//     return {widgets, domainName, ...settings}
// }

export default HomePageWidgets;
