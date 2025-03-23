import { Types } from 'mongoose';

// type DeepFlattenedType<T> = T extends Types.ObjectId
//   ? string
//   : T extends Array<infer U>
//     ? Array<DeepFlattenedType<U>>
//     : T extends object
//       ? { [K in keyof T]: DeepFlattenedType<T[K]> }
//       : T;
//
//

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