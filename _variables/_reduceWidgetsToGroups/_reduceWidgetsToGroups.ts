import {WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";

const _reduceWidgetsToGroups = (widgets:WidgetPropTypes[])=>{
    return widgets.reduce((widgetInPositions:any,widget:WidgetPropTypes)=>{
        widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
        return widgetInPositions
    },{})
}

export default _reduceWidgetsToGroups