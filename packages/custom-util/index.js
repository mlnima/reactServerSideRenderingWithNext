"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.socket = exports.passwordValidatorRegisterForm = exports.usernameValidatorRegisterForm = exports.touchDeviceDetector = exports.convertSecondsToTimeString = exports.sortArrayByPropertyOfObject = exports.convertMetasTypeToSingular = exports.convertMetasTypeToPlural = exports.getTextDataWithTranslation = exports.textContentReplacer = exports.reduceWidgetsToGroups = exports.reduceArrayOfDataToIds = exports.uniqArrayBy = exports.ratingCalculator = exports.rangeNumGenerator = exports.randomNumberGenerator = exports.mongoIdValidator = exports.queryUniquer = exports.isUserFromExternalLink = exports.isJsonString = exports.isInternalUrl = exports.isImageAllowedForNextImage = exports.isEmptyObject = exports.isAbsolutePath = exports.fileTypeDetector = exports.convertVariableNameToName = exports.capitalizeFirstLetters = exports.capitalizeFirstLetter = exports.arraySortRandom = void 0;
var arraySortRandom_1 = require("./src/array-utils/arraySortRandom");
__createBinding(exports, arraySortRandom_1, "default", "arraySortRandom");
var capitalizeFirstLetter_1 = require("./src/string-util/capitalizeFirstLetter");
__createBinding(exports, capitalizeFirstLetter_1, "default", "capitalizeFirstLetter");
var capitalizeFirstLetters_1 = require("./src/string-util/capitalizeFirstLetters");
__createBinding(exports, capitalizeFirstLetters_1, "default", "capitalizeFirstLetters");
var convertVariableNameToName_1 = require("./src/string-util/convertVariableNameToName");
__createBinding(exports, convertVariableNameToName_1, "default", "convertVariableNameToName");
var fileTypeDetector_1 = require("./src/string-util/fileTypeDetector");
__createBinding(exports, fileTypeDetector_1, "default", "fileTypeDetector");
var isAbsolutePath_1 = require("./src/url-util/isAbsolutePath");
__createBinding(exports, isAbsolutePath_1, "default", "isAbsolutePath");
var isEmptyObject_1 = require("./src/object-util/isEmptyObject");
__createBinding(exports, isEmptyObject_1, "default", "isEmptyObject");
var isImageAllowedForNextImage_1 = require("./src/url-util/isImageAllowedForNextImage");
__createBinding(exports, isImageAllowedForNextImage_1, "default", "isImageAllowedForNextImage");
var isInternalUrl_1 = require("./src/url-util/isInternalUrl");
__createBinding(exports, isInternalUrl_1, "default", "isInternalUrl");
var isJsonString_1 = require("./src/string-util/isJsonString");
__createBinding(exports, isJsonString_1, "default", "isJsonString");
var isUserFromExternalLink_1 = require("./src/url-util/isUserFromExternalLink");
__createBinding(exports, isUserFromExternalLink_1, "default", "isUserFromExternalLink");
var queryUniquer_1 = require("./src/url-util/queryUniquer");
__createBinding(exports, queryUniquer_1, "default", "queryUniquer");
var mongoIdValidatorClient_1 = require("./src/string-util/mongoIdValidatorClient");
__createBinding(exports, mongoIdValidatorClient_1, "default", "mongoIdValidator");
var randomNumberGenerator_1 = require("./src/math-util/randomNumberGenerator");
__createBinding(exports, randomNumberGenerator_1, "default", "randomNumberGenerator");
var rangeNumGenerator_1 = require("./src/math-util/rangeNumGenerator");
__createBinding(exports, rangeNumGenerator_1, "default", "rangeNumGenerator");
var ratingCalculator_1 = require("./src/math-util/ratingCalculator");
__createBinding(exports, ratingCalculator_1, "default", "ratingCalculator");
var uniqArrayBy_1 = require("./src/array-utils/uniqArrayBy");
__createBinding(exports, uniqArrayBy_1, "default", "uniqArrayBy");
var reduceArrayOfDataToIds_1 = require("./src/array-utils/reduceArrayOfDataToIds");
__createBinding(exports, reduceArrayOfDataToIds_1, "default", "reduceArrayOfDataToIds");
var reduceWidgetsToGroups_1 = require("./src/array-utils/reduceWidgetsToGroups");
__createBinding(exports, reduceWidgetsToGroups_1, "default", "reduceWidgetsToGroups");
var textContentReplacer_1 = require("./src/string-util/textContentReplacer");
__createBinding(exports, textContentReplacer_1, "default", "textContentReplacer");
var getTextDataWithTranslation_1 = require("./src/object-util/getTextDataWithTranslation");
__createBinding(exports, getTextDataWithTranslation_1, "default", "getTextDataWithTranslation");
var convertMetasTypeToPlural_1 = require("./src/string-util/convertMetasTypeToPlural");
__createBinding(exports, convertMetasTypeToPlural_1, "default", "convertMetasTypeToPlural");
var convertMetasTypeToSingular_1 = require("./src/string-util/convertMetasTypeToSingular");
__createBinding(exports, convertMetasTypeToSingular_1, "default", "convertMetasTypeToSingular");
var sortArrayByPropertyOfObject_1 = require("./src/array-utils/sortArrayByPropertyOfObject");
__createBinding(exports, sortArrayByPropertyOfObject_1, "default", "sortArrayByPropertyOfObject");
var convertSecondsToTimeString_1 = require("./src/date-utils/convertSecondsToTimeString");
__createBinding(exports, convertSecondsToTimeString_1, "default", "convertSecondsToTimeString");
var touchDeviceDetector_1 = require("./src/device-util/touchDeviceDetector");
__createBinding(exports, touchDeviceDetector_1, "default", "touchDeviceDetector");
var usernameValidatorRegisterForm_1 = require("./src/validators/usernameValidatorRegisterForm");
__createBinding(exports, usernameValidatorRegisterForm_1, "default", "usernameValidatorRegisterForm");
var passwordValidatorRegisterForm_1 = require("./src/validators/passwordValidatorRegisterForm");
__createBinding(exports, passwordValidatorRegisterForm_1, "default", "passwordValidatorRegisterForm");
var socketIoClient_1 = require("./src/socket-utils/socketIoClient");
__createBinding(exports, socketIoClient_1, "default", "socket");
// import arraySortRandom from "./src/array-utils/arraySortRandom";
// import capitalizeFirstLetter from "./src/string-util/capitalizeFirstLetter";
// import capitalizeFirstLetters from "./src/string-util/capitalizeFirstLetters";
// import convertVariableNameToName from "./src/string-util/convertVariableNameToName";
// import fileTypeDetector from "./src/string-util/fileTypeDetector";
// import isAbsolutePath from "./src/url-util/isAbsolutePath";
// import isEmptyObject from "./src/object-util/isEmptyObject"
// import isImageAllowedForNextImage from "./src/url-util/isImageAllowedForNextImage";
// import isInternalUrl from "./src/url-util/isInternalUrl";
// import isJsonString from "./src/string-util/isJsonString";
// import isUserFromExternalLink from "./src/url-util/isUserFromExternalLink";
// import queryUniquer from "./src/url-util/queryUniquer";
// import mongoIdValidator from "./src/string-util/mongoIdValidatorClient";
// import randomNumberGenerator from "./src/math-util/randomNumberGenerator";
// import rangeNumGenerator from "./src/math-util/rangeNumGenerator";
// import ratingCalculator from "./src/math-util/ratingCalculator";
// import uniqArrayBy from "./src/array-utils/uniqArrayBy";
// import reduceArrayOfDataToIds from "./src/array-utils/reduceArrayOfDataToIds";
// import reduceWidgetsToGroups from "./src/array-utils/reduceWidgetsToGroups";
// import textContentReplacer from "./src/string-util/textContentReplacer";
// import getTextDataWithTranslation from "./src/object-util/getTextDataWithTranslation";
// import convertMetasTypeToPlural from "./src/string-util/convertMetasTypeToPlural";
// import convertMetasTypeToSingular from "./src/string-util/convertMetasTypeToSingular";
//
// export {
//     convertMetasTypeToPlural,
//     convertMetasTypeToSingular,
//     textContentReplacer,
//     getTextDataWithTranslation,
//     arraySortRandom,
//     reduceWidgetsToGroups,
//     reduceArrayOfDataToIds,
//     capitalizeFirstLetter,
//     capitalizeFirstLetters,
//     convertVariableNameToName,
//     fileTypeDetector,
//     isAbsolutePath,
//     isEmptyObject,
//     isImageAllowedForNextImage,
//     isInternalUrl,
//     isJsonString,
//     isUserFromExternalLink,
//     mongoIdValidator,
//     randomNumberGenerator,
//     rangeNumGenerator,
//     ratingCalculator,
//     uniqArrayBy,
//     queryUniquer
// }
