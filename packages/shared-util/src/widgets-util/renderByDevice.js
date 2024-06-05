export const renderByDevice = (isMobile, deviceTypeToRender) => {
    return (
        deviceTypeToRender === 'all' ||
        (isMobile && deviceTypeToRender === 'mobile') ||
        (!isMobile && deviceTypeToRender === 'desktop') ||
        !deviceTypeToRender
    );
};

module.exports = renderByDevice;
