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

module.exports = renderByDayCondition;
