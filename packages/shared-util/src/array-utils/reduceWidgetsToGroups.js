const reduceWidgetsToGroups = widgets => {
    return widgets.reduce((widgetInPositions, widget) => {
        widgetInPositions[widget.data.position] = [
            ...(widgetInPositions[widget.data.position] || []),
            widget,
        ];
        return widgetInPositions;
    }, {});
};

module.exports = reduceWidgetsToGroups;
