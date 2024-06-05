export const renderByLanguageCondition = (locale, widgetLanguageToRender) => {
    return (
        !widgetLanguageToRender ||
        widgetLanguageToRender === 'all' ||
        widgetLanguageToRender === locale ||
        (widgetLanguageToRender === 'default' &&
            locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE)
    );
};

module.exports = renderByLanguageCondition;
