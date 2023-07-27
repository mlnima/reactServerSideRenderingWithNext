export const renderByDevice = (isMobile: boolean, deviceTypeToRender: string) => {
    return deviceTypeToRender === 'all' ||
        isMobile && deviceTypeToRender === 'mobile' ||
        !isMobile && deviceTypeToRender === 'desktop' ||
        !deviceTypeToRender;
}

export default renderByDevice;