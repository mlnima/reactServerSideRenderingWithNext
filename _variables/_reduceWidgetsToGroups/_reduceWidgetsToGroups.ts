const _reduceWidgetsToGroups = (widgets)=>{
    return widgets.reduce((widgetInPositions,widget)=>{
        widgetInPositions[widget.data.position] = [...(widgetInPositions[widget.data.position] || []) ,widget]
        return widgetInPositions
    },{})
}

export default _reduceWidgetsToGroups