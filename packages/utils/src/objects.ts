import { Types } from 'mongoose';

type DeepFlattenedType<T> = T extends Types.ObjectId
  ? string
  : T extends Array<infer U>
    ? Array<DeepFlattenedType<U>>
    : T extends object
      ? { [K in keyof T]: DeepFlattenedType<T[K]> }
      : T;


export const removeEmptyProperties = (obj: Record<string, unknown>): Record<string, unknown> => {
  try {
    Object.keys(obj).forEach(key => {
      if (
        obj[key] === undefined ||
        obj[key] === null ||
        obj[key] === ''
      ) {
        delete obj[key];
      }
    });
    return obj;
  } catch (error) {
    return obj;
  }
};

export const isEmptyObject = (ObjectToTest: Record<string, unknown>): boolean => {
  if (!ObjectToTest) return false;
  return (
    Object.keys(ObjectToTest).length === 0 &&
    ObjectToTest.constructor === Object
  );
};


export const getTextDataWithTranslation = (locale: string, name: string, parentObject?: any): string | null => {
  if (!parentObject) {
    return '';
  }
  const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  return isDefaultLocale
    ? parentObject?.[name]
    : parentObject.translations?.[locale]?.[name] ||
    parentObject?.[name] ||
    '';
};

export const nestedObjectModifier = (obj: object, path: string[], value: unknown): object => {
  return path.reduceRight((acc, key, index) => {
    return {
      ...obj,
      [key]: index === path.length - 1 ? value : acc,
    };
  }, {});
};

type Document = {
  [key: string]: any;
};

export const deepConvertObjectIdsToStrings = (obj: Document): Document => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj: Document = {};

  for (let key in obj) {
    if (key === 'createdAt' || key === 'updatedAt') {
      newObj[key] = obj[key];
    } else if ((key === '_id' || key === 'widgetId') && obj[key] instanceof Types.ObjectId) {
      newObj[key] = obj[key].toString();
    } else {
      newObj[key] = deepConvertObjectIdsToStrings(obj[key]);
    }
  }
  return newObj;
};
