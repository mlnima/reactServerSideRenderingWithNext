export const renderByDayCondition = (specificDayToRender: string) => {
    return specificDayToRender === 'all' || !specificDayToRender ? true :
        !specificDayToRender && !specificDayToRender ? specificDayToRender === new Date()
            .toLocaleString('en-us', {weekday: 'long'})
            .toLowerCase() :
            false;
}

export default renderByDayCondition;