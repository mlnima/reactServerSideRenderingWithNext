import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import { AppContext } from '../../../../context/AppContext'
import WidgetModel from '../../../../components/adminIncludes/widgetsModel/WidgetModel/WidgetModel';
import { getMultipleWidgetWithData } from '../../../../_variables/ajaxVariables'
import { getAbsolutePath } from '../../../../_variables/_variables'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'
import { convertVariableNameToName } from '../../../../_variables/_variables'

const HomePageWidgets = props => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        if (props.widgets) {
            contextData.dispatchWidgetsSettings({
                ...contextData.widgetsSettings,
                widgets: [ ...props.widgets ]
            })
        }
    }, [props]);

    const renderWidgetsInPosition = [ ...new Set((contextData.widgetsSettings.widgets).map(widgets => {return widgets.data.position})) ].map(position => {

        const widgetsInGroupByPosition = contextData.widgetsSettings.widgets.filter(widgets => widgets.data.position === position)
        // console.log(widgetsInGroupByPosition.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1) )
        const widgetsOnThisType = (widgetsInGroupByPosition.sort((a,b)=>(a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)).map(widget => {
            // console.log( widget)
            const dataWithIndex = {
                data: {
                    ...widget.data,
                    widgetIndex:  widget.data.widgetIndex? widget.data.widgetIndex:   widgetsInGroupByPosition.indexOf(widget)
                }
            }
            const widgetData = {...widget,...dataWithIndex}

            return (
                <WidgetModel key={ contextData.widgetsSettings.widgets.indexOf(widget) } data={ widgetData }  />
            )
        })
        return (
            <div className='widgetAdminPanelItem'>
                <p className='widgetAdminPanelItemHeader'>{ convertVariableNameToName(position) }</p>
                { widgetsOnThisType }
            </div>
        )
    })


    return (
        <AdminLayout>
            <h1>Widgets Settings :</h1>
            <h2>Add Widgets:</h2>
            <div id='widget-setting'>
                <div className="sidePanel">
                    <AddWidgetMenu/>
                </div>
                <div className="widgets">
                 { renderWidgetsInPosition }
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

HomePageWidgets.getInitialProps = async ({  req }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let widgets;
    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'all' ] }, false, domainName, Date.now())
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return { widgets, domainName }
}

export default HomePageWidgets;
