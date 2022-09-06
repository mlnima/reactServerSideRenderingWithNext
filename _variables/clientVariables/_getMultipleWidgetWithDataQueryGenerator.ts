const _getMultipleWidgetWithDataQueryGenerator = (widgets: string[], locale: string) => {
    const widgetsQuery = widgets.map(s => 'widget=' + s).join('&')
    return `?${locale ? `&locale=${locale}` : ''}&${widgetsQuery}`
}

export default _getMultipleWidgetWithDataQueryGenerator

