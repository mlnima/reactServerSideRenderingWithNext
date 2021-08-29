const _getMultipleWidgetWithDataQueryGenerator = (widgets,cache) =>{
    const widgetsQuery = widgets.map(s=>'widget=' + s).join('&')
    return `?cache=${cache}&${widgetsQuery}`
}

export default _getMultipleWidgetWithDataQueryGenerator