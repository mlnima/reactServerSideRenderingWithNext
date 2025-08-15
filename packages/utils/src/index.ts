export { googleAnalyticsEvent, googleAnalyticsPageView } from './src/analytics';

export {
  arraySortRandom,
  groupingArrayOfObjectByKey,
  groupingArrayOfMetas,
  uniqArrayBy,
  sortArrayByPropertyOfObject,
  reduceWidgetsToGroups,
  reduceArrayOfDataToIds,
} from './src/arrays';

export { convertSecondsToTimeString, convertDateToIsoString, convertDurationStringToIso8601, formatDatePostCard } from './src/dates';

export { universalSanitizer } from './src/sanitizer';

export { touchDeviceDetector } from './src/devices';
export { getCurrentDatePath } from './src/paths';

export { removeFileExtension, blobToBase64, imageCanvasCompressor, ImageCompressorByBrowser } from './src/files';

export { getLocales, getDefaultLocale } from './src/i18n';

export { inputValueSimplifier } from './src/inputs';

export { shortNumber, randomNumberGenerator, rangeNumGenerator, ratingCalculator } from './src/maths';

export { isEmptyObject, getTextDataWithTranslation, removeEmptyProperties, nestedObjectModifier } from './src/objects';

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
} from './src/strings';

export { nextTranslateWithCallback } from './src/translations';

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
} from './src/urls';

export {
  usernameValidatorRegisterForm,
  passwordValidatorRegisterForm,
  emailValidator,
  mongoIdValidatorByRegex,
  postTypeValidator,
} from './src/validators';

export { headerSizeCalculator } from './src/ui-elements';

export { renderByLanguageCondition, renderByDayCondition, renderByDevice, isEditMode } from './src/widgets';
