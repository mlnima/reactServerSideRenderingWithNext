export const isEditMode = (editMode: boolean, userRole: string): boolean => {
  return editMode && userRole !== 'administrator';
};

export const renderByDayCondition = (specificDayToRender: string | undefined): boolean => {
  return specificDayToRender === 'all' || !specificDayToRender
    ? true
    : specificDayToRender === new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
};

export const renderByDevice = (isMobile: boolean, deviceTypeToRender: string | undefined): boolean => {
  return (
    deviceTypeToRender === 'all' ||
    (isMobile && deviceTypeToRender === 'mobile') ||
    (!isMobile && deviceTypeToRender === 'desktop') ||
    !deviceTypeToRender
  );
};

export const renderByLanguageCondition = (locale: string, widgetLanguageToRender: string | undefined): boolean => {
  return (
    !widgetLanguageToRender ||
    widgetLanguageToRender === 'all' ||
    widgetLanguageToRender === locale ||
    (widgetLanguageToRender === 'default' && locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE)
  );
};