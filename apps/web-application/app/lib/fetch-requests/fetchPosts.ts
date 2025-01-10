// import { mongoIdValidator, removeEmptyProperties } from '@repo/shared-util';
// import { postFieldRequestForCards } from '@repo/data-structures';
// import config from './config';

// const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

// interface IFetchPost {
//   identifier: string;
//   revalidate?: number | undefined;
//   tags?: string[];
// }

// export const fetchPost = async ({ identifier, revalidate, tags }: IFetchPost) => {
//   try {
//     const queryGeneratorData = mongoIdValidator(identifier)
//         ? { _id: identifier }
//         : { title: encodeURIComponent(identifier) };
//
//     const queries = new URLSearchParams(
//         Object.entries(queryGeneratorData).reduce((acc, [key, value]) => {
//           if (value !== undefined && value !== null) acc[key] = String(value);
//           return acc;
//         }, {} as Record<string, string>)
//     ).toString();
//
//     const response = await fetch(
//         `${APIServerUrl}/api/v1/post${queries ? `?${queries}` : ''}`,
//         config({ revalidate, tags: [...(tags || []), identifier, 'post', 'cacheItem'] })
//     );
//
//     if (!response.ok) return null;
//
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching post:', error);
//     return null;
//   }
// };

// export const fetchPost = async ({ identifier, revalidate }: IFetchPost) => {
//   try {
//     const queryGeneratorData = mongoIdValidator(identifier)
//       ? { _id: identifier }
//       : { title: identifier };
//     const _id = queryGeneratorData._id ? { _id: queryGeneratorData._id } : {};
//     const title = queryGeneratorData.title
//       ? { title: encodeURIComponent(queryGeneratorData.title) }
//       : {};
//
//     const queriesDataObject = { ..._id, ...title };
//     const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;
//
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/post${queries}`,
//       config({ revalidate, tags: [identifier, 'post', 'cacheItem'] })
//     );
//     return await response.json();
//   } catch {
//     return;
//   }
// };

// export const fetchPostViews = async ({
//   identifier,
//   revalidate,
// }: IFetchPost) => {
//   try {
//     const queryGeneratorData = mongoIdValidator(identifier)
//       ? { _id: identifier }
//       : { title: identifier };
//     const _id = queryGeneratorData._id ? { _id: queryGeneratorData._id } : {};
//     const title = queryGeneratorData.title
//       ? { title: encodeURIComponent(queryGeneratorData.title) }
//       : {};
//     const queriesDataObject = { ..._id, ...title };
//     const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;
//     const tag = identifier ? [identifier] : [];
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/post/view${queries}`,
//
//       config({
//         revalidate,
//         tags: [...tag, 'postViews', 'cacheItem'],
//       })
//     );
//     return await response.json();
//   } catch {
//     return;
//   }
// };

// export const fetchPostViews = async ({ identifier, revalidate, tags }: IFetchPost) => {
//   try {
//     const queryGeneratorData = mongoIdValidator(identifier)
//         ? { _id: identifier }
//         : { title: encodeURIComponent(identifier) };
//
//     const queries = new URLSearchParams(
//         Object.entries(queryGeneratorData).reduce((acc, [key, value]) => {
//           if (value !== undefined && value !== null) acc[key] = String(value);
//           return acc;
//         }, {} as Record<string, string>)
//     ).toString();
//
//     const response = await fetch(
//         `${APIServerUrl}/api/v1/post/view${queries ? `?${queries}` : ''}`,
//         config({
//           revalidate,
//           tags: [...(tags || []), identifier, 'postViews', 'cacheItem'],
//         })
//     );
//
//     if (!response.ok) return null;
//
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching post views:', error);
//     return null;
//   }
// };


// export const fetchPostRating = async ({ identifier, revalidate, tags }: IFetchPost) => {
//   try {
//     const queryGeneratorData = mongoIdValidator(identifier)
//         ? { _id: identifier }
//         : { title: encodeURIComponent(identifier) };
//
//     const queries = new URLSearchParams(
//         Object.entries(queryGeneratorData).reduce((acc, [key, value]) => {
//           if (value !== undefined && value !== null) acc[key] = String(value);
//           return acc;
//         }, {} as Record<string, string>)
//     ).toString();
//
//     const cacheTags = [
//       ...(tags || []),
//       identifier ? `${identifier}Rating` : '',
//       identifier,
//       'postRating',
//       'cacheItem',
//     ].filter(Boolean);
//
//     const response = await fetch(
//         `${APIServerUrl}/api/v1/post/rating${queries ? `?${queries}` : ''}`,
//         config({
//           revalidate,
//           tags: cacheTags,
//         })
//     );
//
//     if (!response.ok) return null;
//
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching post rating:', error);
//     return null;
//   }
// };
// export const fetchPostRating = async ({
//   identifier,
//   revalidate,
// }: IFetchPost) => {
//   try {
//     const queryGeneratorData = mongoIdValidator(identifier)
//       ? { _id: identifier }
//       : { title: identifier };
//     const _id = queryGeneratorData._id ? { _id: queryGeneratorData._id } : {};
//     const title = queryGeneratorData.title
//       ? { title: encodeURIComponent(queryGeneratorData.title) }
//       : {};
//     const queriesDataObject = { ..._id, ...title };
//     const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;
//
//     const cacheTags = identifier
//       ? [`${identifier}Rating`, identifier, 'postRating', 'cacheItem']
//       : ['postRating', 'cacheItem'];
//
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/post/rating${queries}`,
//       config({
//         revalidate,
//         tags: cacheTags,
//       })
//     );
//
//     return await response.json();
//   } catch {
//     return;
//   }
// };

// type IFetchPostsProps = {
//   queryObject: object;
//   locale?: string;
//   requestedFields?: string[];
//   revalidate?: number | undefined;
//   tags?: string[];
// };

// export const fetchPosts = async ({
//   queryObject,
//   locale,
//   requestedFields,
//   revalidate,
//   tags,
// }: IFetchPostsProps) => {
//   try {
//     const requestParameter = removeEmptyProperties(queryObject);
//     const queries = `${new URLSearchParams(requestParameter).toString()}`;
//
//     const requestedFieldsQuery = [
//       ...postFieldRequestForCards,
//       ...(requestedFields || []),
//     ]
//       .map((f) => 'field=' + f)
//       .join('&');
//
//     // console.log('requestUrl=> ',`${APIServerUrl}/api/v1/posts?${queries}&${requestedFieldsQuery}&locale=${locale}`)
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/posts?${queries}&${requestedFieldsQuery}&locale=${locale}`,
//       config({
//         revalidate,
//         tags: [...(tags || []), 'cacheItem', 'posts'],
//       })
//     );
//     // if (!response.ok) {
//     //     const errorData = await response.text();
//     //     // throw new Error(errorData);
//     // }
//     return await response.json();
//   } catch {
//     return;
//   }
// };

// type IFetchMetasProps = {
//   queryObject: object;
//   locale: string;
//   requestedFields?: string[];
//   revalidate?: number | undefined;
//   tags?: string[];
// };

// export const fetchMetas = async ({
//   queryObject,
//   locale,
//   revalidate,
//   tags,
// }: IFetchMetasProps) => {
//   try {
//     const requestParameter = removeEmptyProperties(queryObject);
//     const queries = `?${new URLSearchParams(requestParameter).toString()}`;
//
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/metas${queries}&locale=${locale}`,
//       config({
//         revalidate,
//         tags: [...(tags || []), 'cacheItem', 'metas'],
//       })
//     );
//     // if (!response.ok) {
//     //     const errorData = await response.text();
//     //     // throw new Error(errorData);
//     // }
//     return await response.json();
//   } catch {
//     return;
//   }
// };

// export const fetchTags = async ({
//   queryObject,
//   revalidate,
//   tags,
// }: IFetchMetasProps) => {
//   try {
//     const requestParameter = removeEmptyProperties(queryObject);
//     const queries = `${new URLSearchParams(requestParameter).toString()}`;
//
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/tags?${queries}`,
//       config({
//         revalidate,
//         tags: [...(tags || []), 'cacheItem', 'metas'],
//       })
//     );
//     // if (!response.ok) {
//     //     const errorData = await response.text();
//     //     // throw new Error(errorData);
//     // }
//     return response.json();
//   } catch {
//     return;
//   }
// };
//
// //we need to handle pagination
//
// export const fetchSearch = async ({
//   queryObject,
//   locale,
//   revalidate,
//   tags,
// }: IFetchMetasProps) => {
//   try {
//     const requestParameter = removeEmptyProperties(queryObject);
//     const queries = `?${new URLSearchParams(requestParameter).toString()}`;
//
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/posts/search${queries}&locale=${locale}`,
//       config({
//         revalidate,
//         tags: [...(tags || []), 'cacheItem', 'posts'],
//       })
//     );
//     // if (!response.ok) {
//     //     const errorData = await response.text();
//     //     // throw new Error(errorData);
//     // }
//     return await response.json();
//   } catch {
//     return;
//   }
// };
//
// type IFetchUserPagePosts = {
//   authorId?: string;
//   status: string;
//   skip?: number;
//   revalidate?: number | undefined;
//   tags?: string[];
// };
//
// export const fetchUserPagePosts = async ({
//   authorId,
//   skip,
//   revalidate,
//   tags,
//   status,
// }: IFetchUserPagePosts) => {
//   try {
//     const response = await fetch(
//       `${APIServerUrl}/api/v1/posts/author?authorId=${authorId}&skip=${skip}&status=${status}`,
//       config({
//         revalidate,
//         tags: [...(tags || []), 'cacheItem', 'posts'],
//       })
//     );
//     // if (!response.ok) {
//     //     const errorData = await response.text();
//     //     throw new Error(errorData);
//     // }
//     return await response.json();
//   } catch {
//     return;
//   }
// };
