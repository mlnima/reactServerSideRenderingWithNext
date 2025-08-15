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
