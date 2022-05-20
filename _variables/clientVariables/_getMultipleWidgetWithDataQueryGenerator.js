const _getMultipleWidgetWithDataQueryGenerator = (widgets,cache,locale) =>{
    const widgetsQuery = widgets.map(s=>'widget=' + s).join('&')
    return `?${locale?`&locale=${locale}`:''}&${widgetsQuery}`
}

export default _getMultipleWidgetWithDataQueryGenerator

