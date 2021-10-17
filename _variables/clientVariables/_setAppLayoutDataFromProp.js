import setSidebarName from "./_setSidebarName";

const _setAppLayoutDataFromProp = (props, router, settings) => {

    const leftSidebarName = setSidebarName(router.pathname, props.pageInfo?.pageName, 'Left')
    const rightSidebarName = setSidebarName(router.pathname, props.pageInfo?.pageName, 'Right')
    const sidebarPositionName = setSidebarName(router.pathname, props.pageInfo?.pageName, '')

    return {
        sidebarPositionName,
        sidebarType: settings.identity?.[sidebarPositionName] || props.pageInfo?.sidebar || 'withOutSidebar',
        leftSidebar: {
            enable: settings.identity?.[sidebarPositionName] === 'both' ||
                settings.identity?.[sidebarPositionName] === 'left' ||
                props.pageInfo?.sidebar === 'both' ||
                props.pageInfo?.sidebar === 'left',
            name: leftSidebarName,
        },
        rightSidebar: {
            enable: settings.identity?.[sidebarPositionName] === 'both' ||
                settings.identity?.[sidebarPositionName] === 'right' ||
                props.pageInfo?.sidebar === 'both' ||
                props.pageInfo?.sidebar === 'right',
            name: rightSidebarName,
        }
    }
}

export default _setAppLayoutDataFromProp