import setSidebarName from "./_setSidebarName";

 const _setAppLayoutDataFromProp = (props,router)=>{
    const leftSidebarName = setSidebarName(router.pathname, props.pageInfo?.pageName, 'Left')
    const rightSidebarName = setSidebarName(router.pathname, props.pageInfo?.pageName, 'Right')
    const sidebarPositionName = setSidebarName(router.pathname, props.pageInfo?.pageName, '')

    return {
        sidebarPositionName,
        sidebarType:props.identity?.[sidebarPositionName] || props.pageInfo?.sidebar || 'withOutSidebar',
        leftSidebar: {
            enable: props.identity?.[sidebarPositionName] === 'both' ||
                props.identity?.[sidebarPositionName] === 'left' ||
                props.pageInfo?.sidebar === 'both' ||
                props.pageInfo?.sidebar === 'left',
            name: leftSidebarName,
            widgets: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === leftSidebarName) : []
        },
        rightSidebar: {
            enable: props.identity?.[sidebarPositionName] === 'both' ||
                props.identity?.[sidebarPositionName] === 'right' ||
                props.pageInfo?.sidebar === 'both' ||
                props.pageInfo?.sidebar === 'right',
            name: rightSidebarName,
            widgets: props?.widgets ? props.widgets.filter(widget => widget?.data?.position === rightSidebarName) : []
        }
    }
}

export default  _setAppLayoutDataFromProp