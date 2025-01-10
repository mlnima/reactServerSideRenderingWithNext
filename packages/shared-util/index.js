export {
    googleAnalyticsEvent,
    googleAnalyticsPageView,
} from './src/analytics-utils';

export { headerSizeCalculator } from './src/vanilla-ui-utils';
export { inputValueSimplifier } from './src/inputs-util';

export {
    arraySortRandom,
    groupingArrayOfObjectByKey,
    groupingArrayOfMetas,
    uniqArrayBy,
    sortArrayByPropertyOfObject,
    reduceWidgetsToGroups,
    reduceArrayOfDataToIds,
} from './src/array-utils';

export {
    shortNumber,
    randomNumberGenerator,
    rangeNumGenerator,
    ratingCalculator,
} from './src/math-utils';

export {
    capitalizeFirstLetter,
    base64toBlobURL,
    capitalizeFirstLetters,
    convertVariableNameToName,
    fileTypeDetector,
    isJsonString,
    isNumericString,
    mongoIdValidator,
    textContentReplacer,
    convertMetasTypeToPlural,
    convertMetasTypeToSingular,
} from './src/string-util';

export {
    isAbsolutePath,
    languageDetectorFromURL,
    doesUrlHasQueries,
    postCanonicalUrlGenerator,
    postsCanonicalUrlGenerator,
    metasCanonicalUrlGenerator,
    customPageCanonicalUrlGenerator,
    isImageAllowedForNextImage,
    isInternalUrl,
    queryUniquer,
    searchParamsToObject,
    searchParamsToUrlQuery
} from './src/url-util';

export {
    isEmptyObject,
    getTextDataWithTranslation,
    removeEmptyProperties,
    nestedObjectModifier,
} from './src/object-util';
export {
    convertSecondsToTimeString,
    convertDateToIsoString,
    convertDurationStringToIso8601,
    formatDatePostCard
} from './src/date-utils';
export {
    removeFileExtension,
    blobToBase64,
    imageCanvasCompressor,
    ImageCompressorByBrowser,
} from './src/file-utils';
export {
    renderByLanguageCondition,
    renderByDayCondition,
    renderByDevice,
    isEditMode,
} from './src/widgets-util';

export {
    usernameValidatorRegisterForm,
    passwordValidatorRegisterForm,
    emailValidator,
    mongoIdValidatorByRegex
} from './src/validators';

export {
    getLocales,
    getDefaultLocale
} from './src/i18n-utils';

export { touchDeviceDetector } from './src/device-util';

export { nextTranslateWithCallback } from './src/translation-utils';

