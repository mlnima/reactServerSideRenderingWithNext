import arraySortRandom from "./src/array-utils/arraySortRandom";
import capitalizeFirstLetter from "./src/string-util/capitalizeFirstLetter";
import capitalizeFirstLetters from "./src/string-util/capitalizeFirstLetters";
import convertVariableNameToName from "./src/string-util/convertVariableNameToName";
import fileTypeDetector from "./src/string-util/fileTypeDetector";
import isAbsolutePath from "./src/url-util/isAbsolutePath";
import isEmptyObject from "./src/object-util/isEmptyObject"
import isImageAllowedForNextImage from "./src/url-util/isImageAllowedForNextImage";
import isInternalUrl from "./src/url-util/isInternalUrl";
import isJsonString from "./src/string-util/isJsonString";
import isUserFromExternalLink from "./src/url-util/isUserFromExternalLink";
import queryUniquer from "./src/url-util/queryUniquer";
import mongoIdValidator from "./src/string-util/mongoIdValidatorClient";
import randomNumberGenerator from "./src/math-util/randomNumberGenerator";
import rangeNumGenerator from "./src/math-util/rangeNumGenerator";
import ratingCalculator from "./src/math-util/ratingCalculator";
import uniqArrayBy from "./src/array-utils/uniqArrayBy";
import reduceArrayOfDataToIds from "./src/array-utils/reduceArrayOfDataToIds";
import reduceWidgetsToGroups from "./src/array-utils/reduceWidgetsToGroups";
import textContentReplacer from "./src/string-util/textContentReplacer";
import getTextDataWithTranslation from "./src/object-util/getTextDataWithTranslation";
import convertMetasTypeToPlural from "./src/string-util/convertMetasTypeToPlural";
import convertMetasTypeToSingular from "./src/string-util/convertMetasTypeToSingular";

export {
    convertMetasTypeToPlural,
    convertMetasTypeToSingular,
    textContentReplacer,
    getTextDataWithTranslation,
    arraySortRandom,
    reduceWidgetsToGroups,
    reduceArrayOfDataToIds,
    capitalizeFirstLetter,
    capitalizeFirstLetters,
    convertVariableNameToName,
    fileTypeDetector,
    isAbsolutePath,
    isEmptyObject,
    isImageAllowedForNextImage,
    isInternalUrl,
    isJsonString,
    isUserFromExternalLink,
    mongoIdValidator,
    randomNumberGenerator,
    rangeNumGenerator,
    ratingCalculator,
    uniqArrayBy,
    queryUniquer
}