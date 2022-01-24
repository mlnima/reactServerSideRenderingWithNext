import setSidebarName from "./_setSidebarName";

const _setAppLayoutDataFromProp = (pageInfo, pathname, identity) => {

    const leftSidebarName = setSidebarName(pathname, pageInfo?.pageName, 'Left')
    const rightSidebarName = setSidebarName(pathname, pageInfo?.pageName, 'Right')
    const sidebarPositionName = setSidebarName(pathname, pageInfo?.pageName, '')

    return {
        sidebarPositionName,
        sidebarType: identity?.[sidebarPositionName] || pageInfo?.sidebar || 'withOutSidebar',
        leftSidebar: {
            enable: identity?.[sidebarPositionName] === 'both' ||
                identity?.[sidebarPositionName] === 'left' ||
                pageInfo?.sidebar === 'both' ||
                pageInfo?.sidebar === 'left',
            name: leftSidebarName,
        },
        rightSidebar: {
            enable: identity?.[sidebarPositionName] === 'both' ||
                identity?.[sidebarPositionName] === 'right' ||
                pageInfo?.sidebar === 'both' ||
                pageInfo?.sidebar === 'right',
            name: rightSidebarName,
        }
    }
}

export default _setAppLayoutDataFromProp