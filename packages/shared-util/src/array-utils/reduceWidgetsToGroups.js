import {Widget} from "typescript-types";

const reduceWidgetsToGroups = (widgets:Widget[])=>{
    return widgets.reduce((widgetInPositions:any,widget:Widget)=>{
        widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
        return widgetInPositions
    },{})
}

export default reduceWidgetsToGroups