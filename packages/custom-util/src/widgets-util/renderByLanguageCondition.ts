export const renderByLanguageCondition = (locale: string, widgetLanguageToRender: string) => {
    return !widgetLanguageToRender ||
           widgetLanguageToRender === 'all' ||
           widgetLanguageToRender === locale ||
           (widgetLanguageToRender === 'default' && locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL);
}

export default renderByLanguageCondition;