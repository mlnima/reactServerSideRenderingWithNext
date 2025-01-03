import { ObjectId } from 'mongodb';
import mongoose, {Document} from 'mongoose';

export const flatDocumentToObject = (document: Document) => {
  try {
     if (!document) return null
     // document._id =  document._id.toString()
     // return document
    return document.toObject({ flattenMaps: true })
  }catch (error){
    console.error('\x1b[33m%s\x1b[0m','flatDocumentToObject => ',error );
    return document
  }
}

export const flatArrayOdDocumentToObject = async (documents: Document[]) => {
   try {
     for await (let doc of documents) {
       return flatDocumentToObject(doc)
     }
   }catch (error){
     console.error('\x1b[33m%s\x1b[0m','flatArrayOdDocumentToObject => ',error );
     return documents
   }
}



export const isValidObjectId = (id: string | undefined | null): boolean => {
  if (!id) return false;
  return ObjectId.isValid(id);
};

// export const reqQueryToMongooseOptions = (req: Request) => {
//   const contentPerPage = 20;
//   const limit = { limit: req.query.size?  parseInt(multiQueryUniquer(req.query.size)) : contentPerPage};
//   const skip = req.query.page
//       ? { skip: limit.limit * parseInt(multiQueryUniquer(req.query.page)) - limit.limit }
//       : {};
//   const sort = req.query.sort
//       ? { sort: multiQueryUniquer(req.query.sort) }
//       : { sort: '-updatedAt' };
//
//   return {
//     ...limit,
//     ...skip,
//     ...sort,
//   };
// };

//
// export const searchQueryGenerator = (keyword: string, isAdmin: boolean, lang?: string) => {
//   if (!keyword){
//     return {}
//   }
//
//   if (isAdmin) {
//     const locales = process.env.NEXT_PUBLIC_LOCALES
//     //GlobalStore.getLocales();
//     const allLocalesQuery = locales.reduce((final: { [key: string]: any }[], current: string) => {
//       final = [
//         ...final,
//         { [`translations.${current}.title`]: new RegExp(keyword, 'i') },
//         { [`translations.${current}.name`]: new RegExp(keyword, 'i') },
//         { [`translations.${current}.description`]: new RegExp(keyword, 'i') }
//       ];
//       return final;
//     }, []);
//
//     return  {
//       $or: [
//         ...allLocalesQuery,
//         {name: new RegExp(keyword, 'i')},
//         {description: new RegExp(keyword, 'i')},
//       ]
//     }
//
//   } else {
//     return !lang || lang === 'default' ?
//         [{
//           $or: [
//             {title: new RegExp(keyword, 'i')},
//             {name: new RegExp(keyword, 'i')},
//             {description: new RegExp(keyword, 'i')}
//           ]
//         }] :
//         [{
//           $or: [
//             {title: new RegExp(keyword, 'i')},
//             {name: new RegExp(keyword, 'i')},
//             {description: new RegExp(keyword, 'i')},
//             {[`translations.${lang}.title`]: new RegExp(keyword, 'i')},
//             {[`translations.${lang}.name`]: new RegExp(keyword, 'i')},
//             {[`translations.${lang}.description`]: new RegExp(keyword, 'i')},
//           ]
//         }]
//   }
// };