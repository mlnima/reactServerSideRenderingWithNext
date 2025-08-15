export { googleAnalyticsEvent, googleAnalyticsPageView } from './analytics';

export {
  arraySortRandom,
  groupingArrayOfObjectByKey,
  groupingArrayOfMetas,
  uniqArrayBy,
  sortArrayByPropertyOfObject,
  reduceWidgetsToGroups,
  reduceArrayOfDataToIds,
} from './arrays';

export { convertSecondsToTimeString, convertDateToIsoString, convertDurationStringToIso8601, formatDatePostCard } from './dates';

export { universalSanitizer } from './sanitizer';

export { touchDeviceDetector } from './devices';
export { getCurrentDatePath } from './paths';

export { removeFileExtension, blobToBase64, imageCanvasCompressor, ImageCompressorByBrowser } from './files';

export { getLocales, getDefaultLocale } from './i18n';

export { inputValueSimplifier } from './inputs';

export { shortNumber, randomNumberGenerator, rangeNumGenerator, ratingCalculator } from './maths';

export { isEmptyObject, getTextDataWithTranslation, removeEmptyProperties, nestedObjectModifier } from './objects';

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
} from './strings';

export { nextTranslateWithCallback } from './translations';

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
  searchParamsToUrlQuery,
  createQueryString,
  removeQueryParam,
} from './urls';

export {
  usernameValidatorRegisterForm,
  passwordValidatorRegisterForm,
  emailValidator,
  mongoIdValidatorByRegex,
  postTypeValidator,
} from './validators';

export { headerSizeCalculator } from './ui-elements';

export { renderByLanguageCondition, renderByDayCondition, renderByDevice, isEditMode } from './widgets';
