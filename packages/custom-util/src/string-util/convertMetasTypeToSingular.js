"use strict";
exports.__esModule = true;
var convertMetasTypeToSingular = function (metaType) {
    return metaType === 'actors' ? 'actor' :
        metaType === 'tags' ? 'tag' :
            metaType === 'categories' ? 'category' : metaType;
};
exports["default"] = convertMetasTypeToSingular;
