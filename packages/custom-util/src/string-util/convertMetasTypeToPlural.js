"use strict";
exports.__esModule = true;
var convertMetasTypeToPlural = function (metaType) {
    return metaType === 'actor' ? 'actors' :
        metaType === 'tag' ? 'tags' :
            metaType === 'category' ? 'categories' : metaType;
};
exports["default"] = convertMetasTypeToPlural;
