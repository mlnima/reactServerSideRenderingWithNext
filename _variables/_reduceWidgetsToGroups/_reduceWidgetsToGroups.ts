import {Widget} from "@_typeScriptTypes/widgets/Widget";

const _reduceWidgetsToGroups = (widgets:Widget[])=>{
    return widgets.reduce((widgetInPositions:any,widget:Widget)=>{
        widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
        return widgetInPositions
    },{})
}

export default _reduceWidgetsToGroups