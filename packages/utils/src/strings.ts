export const base64toBlobURL = (base64: string): string => {
  const byteCharacters = atob(base64);
  const byteArrays: Uint8Array[] = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: 'audio/mp3' }); // Adjust the MIME type accordingly
  return URL.createObjectURL(blob);
};

export const convertVariableNameToName = (str: string): string => {
  try {
    return (
      str
        .replace(/([A-Z])/g, ' $1')
        .charAt(0)
        .toUpperCase() + str.replace(/([A-Z])/g, ' $1').slice(1)
    );
  } catch (err) {
    return str;
  }
};

export const convertMetasTypeToSingular = (metaType: string): string => {
  return metaType === 'actors'
    ? 'actor'
    : metaType === 'tags'
      ? 'tag'
      : metaType === 'categories'
        ? 'category'
        : metaType;
};

export const convertMetasTypeToPlural = (metaType: string): string => {
  return metaType === 'actor'
    ? 'actors'
    : metaType === 'tag'
      ? 'tags'
      : metaType === 'category'
        ? 'categories'
        : metaType;
};

export const capitalizeFirstLetter = (str: string): string => {
  try {
    return typeof str === 'string'
      ? str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase())
      : str;
  } catch (err) {
    return str;
  }
};

export const capitalizeFirstLetters = (str: string): string => {
  try {
    return typeof str === 'string'
      ? str
        .split(' ')
        .map(word =>
          word.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()),
        )
        .join(' ')
      : str;
  } catch (err) {
    return str;
  }
};

export const fileTypeDetector = (fileName: string): string => {
  const splitFileName = fileName.split('.');
  const fileFormat = splitFileName[splitFileName.length - 1].toLowerCase();
  let finalFormat = '';
  const fileFormats: Record<string, string[]> = {
    image: ['jpg', 'png', 'jpeg', 'svg', 'webp', 'gif'],
    video: ['mp4', '3gp', 'mov'],
    document: ['js', 'css', 'env', 'scss', 'txt'],
    application: ['exe'],
    archive: ['zip', 'rar'],
  };
  Object.keys(fileFormats).forEach(formatArr => {
    if (fileFormats[formatArr].includes(fileFormat)) {
      finalFormat = formatArr;
    }
  });
  return finalFormat;
};

export const getFileExtension = (fileName: string): string => {
  try {
    return fileName.slice(
      (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1,
    );
  } catch (error) {
    return fileName;
  }
};

export const isJsonString = (jsonString: string): boolean => {
  if (typeof jsonString !== 'string') {
    return false;
  }
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

export const isNumericString = (str: string): boolean => {
  return /^\d+$/.test(str);
};

export const mongoIdValidator = (_id: string): RegExpMatchArray | null => {
  try {
    return _id.match(/^[0-9a-fA-F]{24}$/);
  } catch (err) {
    return null;
  }
};

export const getMonthName = (monthNumber: number): string | null => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNumber >= 1 && monthNumber <= 12
    ? monthNames[monthNumber - 1]
    : null;
};

export const textContentReplacer = (
  textString: string,
  replaces?: Record<string, string>
): string => {

  const now = new Date(performance.timeOrigin + performance.now());
  try {
    return textString
      .replaceAll('__NAME', replaces?.name || '')
      .replaceAll('__SITE_NAME', replaces?.siteName || '')
      .replaceAll('__COUNT', replaces?.count || '')
      .replaceAll('__YEAR', now.getFullYear().toString())
      .replaceAll('__MONTH', getMonthName(now.getMonth()) || '')
      .replaceAll('__PAGE', replaces?.page ? `${replaces?.page}` : '');
  } catch (err) {
    return textString;
  }
};
