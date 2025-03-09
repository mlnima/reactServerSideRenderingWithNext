// @ts-nocheck
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosResponse } from 'axios';
import { IMeta ,PostRaw} from '@repo/typescript-types';
import { loading, setAlert } from './globalStateReducer';

import {
    AxiosInstance,
    dashboardAPIRequestGetPosts,
    dashboardAPIRequestGetMetas,
    dashboardAPIRequestGetMeta,
    dashboardAPIRequestGetPost,
    dashboardAPIRequestUpdatePost,
    dashboardAPIRequestCreateNewPost,
    dashboardAPIRequestDeleteMeta,
    dashboardAPIRequestUpdateMeta,
    dashboardAPIRequestBulkActionOnPosts,
    dashboardAPIRequestCheckAndRemoveDeletedVideos,
    dashboardAPIRequestSetMetaThumbnailsAndCount,
    dashboardAPIRequestGeneratePermaLinkForPosts,
    dashboardAPIRequestExportPosts,
    dashboardAPIRequestBulkActionOnMetas,
    dashboardAPIRequestScrapYoutubeInfo,
    dashboardAPIRequestPostDataScrappers,
    dashboardAPIRequestFindAnotherSimilarSourceLink,
} from '@repo/api-requests';

interface IInitialState {
    post: {
        title: string;
        description: string;
    };
    relatedPosts: [];
    totalCount: number;
    statusesCount: {
        // [key: string]: number;
    }
    posts: [];
    meta: IMeta;
    metas: [IMeta];
    activeEditingLanguage: 'default';
}

const initialState:IInitialState = {
    post: {
        title: '',
        description: '',
    },
    relatedPosts: [],
    totalCount: 0,
    statusesCount:{},
    posts: [],
    meta: {},
    metas: [],
    activeEditingLanguage: 'default',
};

export const getPostAction = createAsyncThunk(
    'adminPanelPosts/getPostAction',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestGetPost(_id)
            .then((res: AxiosResponse<any>) => {
                if (!!res.data?.post){
                    return res.data?.post;
                }else {
                    thunkAPI.dispatch(
                        setAlert({
                            message: error.response?.data?.message,
                            type: 'Error',
                        }),
                    );
                }

            })
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        message: error.response?.data?.message,
                        type: 'Error',
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const getPostScrapedDataAction = createAsyncThunk(
    'adminPanelPosts/getPostScrapedDataAction',
    async ({ url, fields }: { url: string; fields?: string[] }, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestPostDataScrappers(url)
            .then(async (res: AxiosResponse<any>) => {
                //@ts-ignore
                if (!fields?.length) {
                    return res.data?.urlData;
                } else {
                    let fieldToSet = {};
                    for await (const field of fields) {
                        //@ts-ignore
                        fieldToSet[field] = res.data?.urlData?.[field];
                    }
                    return fieldToSet;
                }
            })
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        message: error.response?.data?.message,
                        type: 'Error',
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const getSearchAndFindARelatedPostUrlAction = createAsyncThunk(
    'adminPanelPosts/searchAndFindARelatedPostUrlAction',
    async (
        {
            postId,
            relatedBy,
            page,
        }: { postId?: string; relatedBy?: string; page?: number },
        thunkAPI,
    ) => {
        console.log(`{postId, relatedBy,page}=> `, { postId, relatedBy, page });
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestFindAnotherSimilarSourceLink(
            postId,
            relatedBy,
            page,
        )
            .then(async (res: AxiosResponse<any>) => {
                return res.data?.relatedPosts;
            })
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        message: error.response?.data?.message,
                        type: 'Error',
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const getPostsAction = createAsyncThunk(
    'adminPanelPosts/getPostsAction',
    async (queriesData: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestGetPosts(queriesData)
            .then((res: AxiosResponse<any>) => {
                return {
                    posts: res.data?.posts,
                    totalCount: res.data?.totalCount,
                    statusesCount:res.data?.statusesCount
                };
            })
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        message: error.response?.data?.message,
                        type: 'Error',
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);
export const updatePostAction = createAsyncThunk(
    'adminPanelPosts/updatePostAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true));

        return await dashboardAPIRequestUpdatePost(data)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({
                        message: res.data?.message || 'Post Updated',
                        type: 'success',
                    }),
                );
            })
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        message: error.response.data?.message,
                        type: 'error',
                        error,
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const createNewPostAction = createAsyncThunk(
    'adminPanelPosts/createNewPostAction',
    async ({ data, navigate }: { data?: PostRaw; navigate: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true));

        return await dashboardAPIRequestCreateNewPost(data)
            .then((response: AxiosResponse<any>) => {
                console.log(response.data?.savedPostData?._id);
                if (response.data?.savedPostData?._id) {
                    navigate(
                        `/api/dashboard/post?id=${response.data.savedPostData._id}`,
                    );
                }
            })
            .catch(err => {
                console.log(err);
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const deleteMetaAction = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelDeleteMeta',
    async (_id: string | null, thunkAPI) => {
        thunkAPI.dispatch(loading(true));

        return await dashboardAPIRequestDeleteMeta(_id)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({
                        message: res.data?.message || 'deleted',
                        type: 'success',
                    }),
                );
            })
            .catch(error => {
                thunkAPI.dispatch(
                    setAlert({
                        message: error.response.data.message,
                        type: 'error',
                        error,
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const updateMetaAction = createAsyncThunk(
    'adminPanelPosts/updateMetaAction',
    async (data: IMeta, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        const body = {
            data,
            token: localStorage.wt,
        };
        await dashboardAPIRequestUpdateMeta(data)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({ message: res.data?.message, type: 'success' }),
                );
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const getMetasAction = createAsyncThunk(
    'adminPanelPosts/getMetasAction',
    async (queries: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestGetMetas(queries)
            .then((res: AxiosResponse<any>) => {
                return {
                    metas: res.data?.metas,
                    totalCount: res.data?.totalCount,
                    statusesCount:res.data?.statusesCount
                };
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);
export const getMetaAction = createAsyncThunk(
    'adminPanelPosts/getMetaAction',
    async (_id: string | null, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestGetMeta(_id)
            .then((res: AxiosResponse<any>) => {
                if (res?.data?.meta) {
                    return {
                        ...res.data.meta,
                        imageUrlLock: res.data?.meta?.imageUrlLock || false,
                    };
                }
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export const bulkActionPostsAction = createAsyncThunk(
    'adminPanelPosts/bulkActionPostsAction',
    async (
        { ids, status }: { ids: string | string[]; status: string },
        thunkAPI,
    ) => {
        thunkAPI.dispatch(loading(true));

        await dashboardAPIRequestBulkActionOnPosts(ids, status)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({ message: res.data?.message, type: 'success' }),
                );
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export const checkAndRemoveDeletedVideosAction = createAsyncThunk(
    'adminPanelPosts/checkAndRemoveDeletedVideosAction',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        return await dashboardAPIRequestCheckAndRemoveDeletedVideos()
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({
                        message:
                            res.data?.message ||
                            'Checking Removed Video Started',
                        type: 'success',
                    }),
                );
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => {
                thunkAPI.dispatch(loading(false));
            });
    },
);

export const setMetaThumbnailsAndCountAction = createAsyncThunk(
    'adminPanelPosts/setMetaThumbnailsAndCountAction',
    async (type: string | null, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        await dashboardAPIRequestSetMetaThumbnailsAndCount(type)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({
                        message:
                            res.data?.message ||
                            'Setting New Image and Fix Count For Meta Data Started',
                        type: 'success',
                    }),
                );
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export const generatePermaLinkForPostsAction = createAsyncThunk(
    'adminPanelPosts/generatePermaLinkForPostsAction',
    async (type: string | null, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        await dashboardAPIRequestGeneratePermaLinkForPosts(type)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(
                    setAlert({
                        message:
                            res.data?.message ||
                            'Generating PermaLinks for Posts Started',
                        type: 'success',
                    }),
                );
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err.response.data.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export const getExportingPosts = createAsyncThunk(
    'adminPanelPosts/getExportingPosts',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        await dashboardAPIRequestExportPosts(data)
            .then(res => {
                const posts = res.data.exportedData.map((post: any) => {
                    post.mainThumbnail = post.mainThumbnail
                        ? post.mainThumbnail.includes('http')
                            ? post.mainThumbnail
                            : process.env.NEXT_PUBLIC_PRODUCTION_URL +
                              post.mainThumbnail
                        : '';
                    //@ts-ignore
                    !data.ID ? delete post._id : null;
                    delete post.__v;
                    delete post.author;
                    return post;
                });
                let filename = `${Date.now().toLocaleString()}-posts.json`;
                let contentType = 'application/json;charset=utf-8;';
                //@ts-ignore
                if (window.navigator && window.navigator?.msSaveOrOpenBlob) {
                    let blob = new Blob(
                        [decodeURIComponent(encodeURI(JSON.stringify(posts)))],
                        { type: contentType },
                    );
                    // @ts-ignore
                    navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    let a = document.createElement('a');
                    a.download = filename;
                    a.href =
                        'data:' +
                        contentType +
                        ',' +
                        encodeURIComponent(JSON.stringify(posts));
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            })
            .catch(err => {
                thunkAPI.dispatch(
                    setAlert({
                        message: err?.response?.data?.message,
                        type: 'error',
                        err,
                    }),
                );
            })
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export const bulkActionMetaAction = createAsyncThunk(
    'adminPanelPosts/bulkActionMetaAction',
    async (
        { type, status, ids }: { type: string; status: string; ids: string[] },
        thunkAPI,
    ) => {
        thunkAPI.dispatch(loading(true));

        await dashboardAPIRequestBulkActionOnMetas(type, status, ids)
            .then(res => {})
            .catch(err => {})
            .finally(() => thunkAPI.dispatch(loading(false)));
    },
);

export const getYoutubeDataScrapperAction = createAsyncThunk(
    'adminPanelPosts/getYoutubeDataScrapperAction',
    async (url: string, thunkAPI) => {
        const durationToString = (duration: any) => {
            const hours =
                duration.hours === 0
                    ? ''
                    : duration.hours < 10
                      ? '0' + duration.hours.toString() + ':'
                      : duration.hours.toString() + ':';
            const min =
                duration.minutes === 0
                    ? ''
                    : duration.minutes < 10
                      ? '0' + duration.minutes.toString() + ':'
                      : duration.minutes.toString() + ':';
            const sec =
                duration.seconds < 10
                    ? '0' + duration.seconds.toString()
                    : duration.seconds.toString();
            return hours + min + sec;
        };

        await dashboardAPIRequestScrapYoutubeInfo(url).then(async res => {
            for await (let video of res.data.videos) {
                if (video.id) {
                    const videoData = {
                        title: video.title ? video.title : '',
                        quality: video.raw.contentDetails
                            ? video.raw.contentDetails.definition === 'hd'
                                ? '1080p'
                                : '480p'
                            : '1080',
                        //quality:'1080',
                        mainThumbnail: video.thumbnails.medium
                            ? video.thumbnails.medium.url
                            : '',
                        duration: video.duration
                            ? durationToString(video.duration)
                            : '00:00',
                        videoEmbedCode: `https://www.youtube.com/embed/${video.id}`,
                        description: video.description ? video.description : '',
                        postType: 'video',
                        downloadLink: url,
                        status: 'draft',
                        likes: 0,
                        disLikes: 0,
                        views: 0,
                    };
                    // @ts-ignore
                    await AxiosInstance.post(`/api/dashboard/post`, {
                        postData: videoData
                    });
                }
            }
        });
    },
);

// @ts-ignore
export const postsSlice = createSlice({
    name: 'adminPanelPosts',
    initialState,
    reducers: {
        // @ts-ignore
        defineNewPost: (state, action: PayloadAction<any>) => {
            const postType =
                typeof window !== 'undefined' &&
                localStorage?.preferAdminPostType
                    ? localStorage?.preferAdminPostType
                    : 'standard';

            return {
                ...state,
                activeEditingLanguage: 'default',
                post: {
                    postType,
                },
            };
        },
        changeActiveEditingLanguage: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeEditingLanguage: action.payload,
            };
        },
        editPostAction: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload,
                },
            };
        },
        editPostSourceAction: (state, action: PayloadAction<any>) => {
            state.post.source = action.payload;
        },
        editMetaAction: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                meta: {
                    ...state.meta,
                    ...action.payload,
                },
            };
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                getPostAction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    return {
                        ...state,
                        post: action.payload,
                    };
                },
            )
            .addCase(
                getPostsAction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    return {
                        ...state,
                        ...action.payload,
                    };
                },
            )
            .addCase(
                getMetasAction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    return {
                        ...state,
                        ...action.payload,
                    };
                },
            )
            .addCase(
                getMetaAction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    return {
                        ...state,
                        meta: action.payload,
                    };
                },
            )
            .addCase(
                getPostScrapedDataAction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    return {
                        ...state,
                        post: {
                            ...state.post,
                            ...action.payload,
                        },
                    };
                },
            )
            .addCase(
                getSearchAndFindARelatedPostUrlAction.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.relatedPosts = action.payload;
                },
            );
    },
});

export const {
    editPostAction,
    editMetaAction,
    defineNewPost,
    changeActiveEditingLanguage,
    editPostSourceAction,
} = postsSlice.actions;

export const postsReducer = (state: RootState) => state?.posts || null;
//@ts-ignore
export default postsSlice.reducer;
