export const _renderByLanguageCondition = (locale: string, widgetLanguageToRender: string) => {
    // const languageToRender = widgetLanguageToRender || 'all';
    return !widgetLanguageToRender ||
           widgetLanguageToRender === 'all' ||
           widgetLanguageToRender === locale ||
           !widgetLanguageToRender ||
           (widgetLanguageToRender === 'default' && locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
}

export const _renderByDayCondition = (specificDayToRender: string) => {
    return specificDayToRender === 'all' || !specificDayToRender ? true :
        !specificDayToRender && !specificDayToRender ? specificDayToRender === new Date()
            .toLocaleString('en-us', {weekday: 'long'})
            .toLowerCase() :
            false;
}

export const _renderByDevice = (isMobile: boolean, deviceTypeToRender: string) => {
    return deviceTypeToRender === 'all' ||
        isMobile && deviceTypeToRender === 'mobile' ||
        !isMobile && deviceTypeToRender === 'desktop' ||
        !deviceTypeToRender;
}

export const _isEditMode = (editMode: boolean, userRole: string) => {
    return editMode && userRole !== 'administrator';
}

