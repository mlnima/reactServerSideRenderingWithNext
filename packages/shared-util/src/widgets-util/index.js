export const isEditMode = (editMode, userRole) => {
    return editMode && userRole !== 'administrator';
};
export const renderByDayCondition = specificDayToRender => {
    return specificDayToRender === 'all' || !specificDayToRender
        ? true
        : !specificDayToRender && !specificDayToRender
            ? specificDayToRender ===
            new Date()
                .toLocaleString('en-us', { weekday: 'long' })
                .toLowerCase()
            : false;
};
export const renderByDevice = (isMobile, deviceTypeToRender) => {
    return (
        deviceTypeToRender === 'all' ||
        (isMobile && deviceTypeToRender === 'mobile') ||
        (!isMobile && deviceTypeToRender === 'desktop') ||
        !deviceTypeToRender
    );
};
export const renderByLanguageCondition = (locale, widgetLanguageToRender) => {
    return (
        !widgetLanguageToRender ||
        widgetLanguageToRender === 'all' ||
        widgetLanguageToRender === locale ||
        (widgetLanguageToRender === 'default' &&
            locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE)
    );
};