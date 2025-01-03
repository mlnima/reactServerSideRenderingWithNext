//import { ObjectId } from 'mongodb';
//import mongoose from 'mongoose';
//import {Request} from "express";
// import GlobalStore from "api-server/dist/store/GlobalStore";
//import { multiQueryUniquer } from '@repo/db';

// type PlainObject<T> = T extends mongoose.Document
//     ? Omit<T, keyof mongoose.Document> & Record<string, any>
//     : T;
//
// export function convertDocumentArrayToPlain<T>(docs: T[]): PlainObject<T>[] {
//   return docs.map((doc) =>
//       doc instanceof mongoose.Document ? doc.toObject() : doc
//   );
// }
//
// export function convertToPlainObject<T>(doc: T): PlainObject<T> {
//   if (Array.isArray(doc)) {
//     return convertDocumentArrayToPlain(doc) as unknown as PlainObject<T>;
//   }
//
//   if (doc && typeof doc === 'object' && !(doc instanceof mongoose.Types.ObjectId)) {
//     const plainObject: Record<string, any> = {};
//     for (const [key, value] of Object.entries(doc)) {
//       plainObject[key] = convertToPlainObject(value);
//     }
//     return plainObject as PlainObject<T>;
//   }
//
//   return doc as PlainObject<T>;
// }
//
// export const isValidObjectId = (id: string): boolean => {
//   return ObjectId.isValid(id);
// };

