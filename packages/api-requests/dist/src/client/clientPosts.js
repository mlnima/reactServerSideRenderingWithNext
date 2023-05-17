"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestViewPost = exports.clientAPIRequestUpdatePost = exports.clientAPIRequestLikePost = exports.clientAPIRequestGetPosts = exports.clientAPIRequestGetPost = exports.clientAPIRequestGetEditingPost = exports.clientAPIRequestDisLikePost = exports.clientAPIRequestCreateNewPost = exports.clientAPIRequestAttendToEvent = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
// import {createNewPostResponse} from "./posts/createNewPost";
const custom_util_1 = require("custom-util");
const data_structures_1 = require("data-structures");
const data_structures_2 = require("data-structures");
const postTypeValidator = (currentPostType) => {
    //@ts-ignore
    return currentPostType ? data_structures_2.postTypes.includes(currentPostType) : false;
};
const clientAPIRequestAttendToEvent = (postId, userId, actionType) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const body = {
        id: postId,
        userId,
        actionType,
    };
    return yield AxiosInstance_1.default.post('/api/v1/posts/attendToEvent', body);
});
exports.clientAPIRequestAttendToEvent = clientAPIRequestAttendToEvent;
const clientAPIRequestCreateNewPost = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const response = yield AxiosInstance_1.default.post('/api/v1/posts/newPost', { data, token: localStorage.wt });
    return response.data;
});
exports.clientAPIRequestCreateNewPost = clientAPIRequestCreateNewPost;
const clientAPIRequestDisLikePost = (postId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ratingData = (localStorage === null || localStorage === void 0 ? void 0 : localStorage.ratingData) ? JSON.parse(localStorage.ratingData) : { likes: [], disLikes: [] };
    ratingData.disLikes = [...new Set([...ratingData.disLikes, postId])];
    ratingData.likes = ratingData.likes.filter(liked => liked !== postId);
    localStorage.setItem('ratingData', JSON.stringify(ratingData));
    const body = {
        id: postId,
        type: 'disLikes'
    };
    return yield AxiosInstance_1.default.post('/api/v1/posts/likeDislikeView', body);
});
exports.clientAPIRequestDisLikePost = clientAPIRequestDisLikePost;
const clientAPIRequestGetEditingPost = (postId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const queries = new URLSearchParams({ _id: postId }).toString();
    return yield AxiosInstance_1.default.get(`/api/v1/posts/getEditingPost?${queries}`);
});
exports.clientAPIRequestGetEditingPost = clientAPIRequestGetEditingPost;
const clientAPIRequestGetPost = (identifier) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const queryGeneratorData = (0, custom_util_1.mongoIdValidator)(identifier) ? { _id: identifier } : { title: identifier };
    const _id = queryGeneratorData._id ? { _id: queryGeneratorData._id } : {};
    const title = queryGeneratorData.title ? { title: encodeURIComponent(queryGeneratorData.title) } : {};
    const queriesDataObject = Object.assign(Object.assign({}, _id), title);
    //@ts-ignore
    const queries = `?${new URLSearchParams(queriesDataObject).toString()}`;
    return yield AxiosInstance_1.default.get(`/api/v1/posts/getPost${queries}`);
});
exports.clientAPIRequestGetPost = clientAPIRequestGetPost;
const clientAPIRequestGetPosts = (currentQuery, medaId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const sort = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort) ? { sort: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.sort } : { sort: 'updatedAt' };
    const postType = postTypeValidator(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.postType) ? { postType: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.postType } : {};
    const isValidMetaId = !!medaId ? (0, custom_util_1.mongoIdValidator)(medaId) : false;
    const metaId = !!medaId && isValidMetaId ? { metaId: medaId } :
        medaId && !isValidMetaId ? { metaId: encodeURIComponent(medaId) } : {};
    const lang = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang) ? { lang: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.lang } : {};
    const author = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.author) ? { author: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.author } : {};
    const status = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.status) ? { status: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.status } : { status: 'published' };
    const keyword = !!(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword) ? { keyword: encodeURIComponent((0, custom_util_1.queryUniquer)(currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.keyword)) } : {};
    const getPostsData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ size: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.size, page: currentQuery === null || currentQuery === void 0 ? void 0 : currentQuery.page }, status), author), lang), metaId), postType), sort), keyword);
    const queries = new URLSearchParams(getPostsData).toString();
    return yield AxiosInstance_1.default.get(`/api/v1/posts/getPosts?${queries}&${data_structures_1.postFieldRequestForCards.map(f => 'field=' + f).join('&')}`);
});
exports.clientAPIRequestGetPosts = clientAPIRequestGetPosts;
const clientAPIRequestLikePost = (postId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ratingData = (localStorage === null || localStorage === void 0 ? void 0 : localStorage.ratingData) ? JSON.parse(localStorage.ratingData) : { likes: [], disLikes: [] };
    ratingData.likes = [...new Set([...ratingData.likes, postId])];
    ratingData.disLikes = ratingData.disLikes.filter(disLiked => disLiked !== postId);
    localStorage.setItem('ratingData', JSON.stringify(ratingData));
    const body = {
        id: postId,
        type: 'likes'
    };
    return yield AxiosInstance_1.default.post('/api/v1/posts/likeDislikeView', body);
});
exports.clientAPIRequestLikePost = clientAPIRequestLikePost;
const clientAPIRequestUpdatePost = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/posts/updatePost`, { data, token: localStorage.wt });
});
exports.clientAPIRequestUpdatePost = clientAPIRequestUpdatePost;
const clientAPIRequestViewPost = (postId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const body = {
        id: postId,
        type: 'views'
    };
    return yield AxiosInstance_1.default.post('/api/v1/posts/likeDislikeView', body);
});
exports.clientAPIRequestViewPost = clientAPIRequestViewPost;
//# sourceMappingURL=clientPosts.js.map