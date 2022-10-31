"use strict";
exports.__esModule = true;
var ratingCalculator = function (likes, dislikes) {
    return (likes > 0 && dislikes > 0) ? (Math.round((likes * 100) / (likes + dislikes)))
        : (likes === 0 && dislikes === 0) ? 0
            : (likes === 0 && dislikes > 0) ? 0
                : (likes > 0 && dislikes === 0) ? 100
                    : 0;
};
exports["default"] = ratingCalculator;
