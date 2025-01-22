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

export const getTextDataWithTranslation = (locale: string, name: string, parentObject: Record<string, any>): string | null => {
  const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  return isDefaultLocale
    ? parentObject?.[name]
    : parentObject.translations?.[locale]?.[name] ||
    parentObject?.[name] ||
    null;
};

export const nestedObjectModifier = (obj: object, path: string[], value: unknown): object => {
  return path.reduceRight((acc, key, index) => {
    return {
      ...obj,
      [key]: index === path.length - 1 ? value : acc,
    };
  }, {});
};

export function flatObjectId<T>(doc: T): T {
  doc._id = doc._id.toString()
  return doc;
}

export function flatObjectIds<T>(docs: T[]): T[] {
  return docs.map(doc => flatObjectId(doc));
}


export function deepFlattenObjectIds<T>(data: T): DeepFlattenedType<T> {
  // Handle null/undefined
  if (data == null) {
    return data as any;
  }

  // Handle ObjectId
  if (data instanceof Types.ObjectId) {
    return data.toString() as any;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => deepFlattenObjectIds(item)) as any;
  }

  // Handle objects (but not dates or other special objects)
  if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof RegExp)) {
    const result: any = {};

    for (const [key, value] of Object.entries(data)) {
      result[key] = deepFlattenObjectIds(value);
    }

    return result;
  }

  // Return primitive values as is
  return data as any;
}

// Helper type to ensure arrays are handled properly
export function deepFlattenObjectIdsArray<T>(data: T[]): DeepFlattenedType<T>[] {
  return data.map(item => deepFlattenObjectIds(item));
}