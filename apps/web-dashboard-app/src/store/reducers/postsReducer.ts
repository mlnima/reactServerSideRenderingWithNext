import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AxiosInstance} from "api-requests";
import {AxiosError, AxiosResponse} from "axios";
import {Meta,Post} from "typescript-types";
import {loading, setAlert} from "./globalStateReducer";
import {PostRaw} from "typescript-types/src/Post";
import getPosts from "api-requests/src/dashboard/posts/getPosts";
import getMetas from "api-requests/src/dashboard/metas/getMetas";
import getPost from "api-requests/src/dashboard/posts/getPost";
import updatePost from "api-requests/src/dashboard/posts/updatePost";
import createNewPost from "api-requests/src/dashboard/posts/createNewPost";
import deleteMeta from "api-requests/src/dashboard/metas/deleteMeta";
import updateMeta from "api-requests/src/dashboard/metas/updateMeta";
import getMeta from "api-requests/src/dashboard/metas/getMeta";
import bulkActionOnPosts from "api-requests/src/dashboard/posts/bulkActionOnPosts";
import checkAndRemoveDeletedVideos from "api-requests/src/dashboard/posts/checkAndRemoveDeletedVideos";
import setMetaThumbnailsAndCount from "api-requests/src/dashboard/metas/setMetaThumbnailsAndCount";
import generatePermaLinkForPosts from "api-requests/src/dashboard/posts/generatePermaLinkForPosts";
import exportPosts from "api-requests/src/dashboard/posts/exportPosts";
import bulkActionOnMetas from "api-requests/src/dashboard/metas/bulkActionOnMetas";
import scrapYoutubeInfo from "api-requests/src/dashboard/posts/scrapYoutubeInfo";


interface AdminPanelPosts {
    post: {
        title: string,
        description: string
    },
    totalCount: number,
    posts: [],
    meta: Meta,
    metas: [Meta],
    activeEditingLanguage: 'default'
}

const initialState = {
    post: {
        title: '',
        description: ''
    },
    totalCount: 0,
    posts: [],
    meta: {},
    metas: [],
    activeEditingLanguage: 'default'
}

export const fetchAdminPanelPost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelPost',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getPost(_id)
            .then((res: AxiosResponse<any>) => {
                return res.data?.post
            }).catch((error) => {
                thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'Error'}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const fetchAdminPanelPosts = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelPosts',
    async (queriesData: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getPosts(queriesData)
            .then((res: AxiosResponse<any>) => {
                return {
                    posts: res.data?.posts,
                    totalCount: res.data?.totalCount
                }
            }).catch((error) => {
                thunkAPI.dispatch(setAlert({message: error.response?.data?.message, type: 'Error'}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const fetchAdminPanelUpdatePost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelUpdatePost',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await updatePost(data)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data?.message || 'Post Updated', type: 'success'}))
            }).catch((error) => {
                thunkAPI.dispatch(setAlert({message: error.response.data?.message, type: 'error', error}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)

export const fetchAdminPanelSaveNewPost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelSaveNewPost',
    async ({data, router}: { data?: PostRaw, router?: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await createNewPost(data)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data.message || 'Post Saved', type: 'success'}))
                setTimeout(() => {
                    res.data?.savedPostData?._id && router ? router.push('/admin/post?id=' + res.data.savedPostData._id) : null
                }, 1500)
            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)

export const fetchAdminPanelDeleteMeta = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelDeleteMeta',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await deleteMeta(_id)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data?.message || 'deleted', type: 'success'}))

            }).catch((error) => {
                thunkAPI.dispatch(setAlert({message: error.response.data.message, type: 'error', error}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)

export const fetchAdminPanelUpdateMeta = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelUpdateMeta',
    async (data: Meta, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            data,
            token: localStorage.wt
        };
        await updateMeta(data)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data?.message, type: 'success'}))

            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)


export const fetchAdminPanelMetas = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelMetas',
    async (queries: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getMetas(queries)
            .then((res: AxiosResponse<any>) => {
                return {
                    metas: res.data?.metas,
                    totalCount: res.data?.totalCount
                }
            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const fetchAdminPanelMeta = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelMeta',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getMeta(_id)
            .then((res: AxiosResponse<any>) => {
                if (res?.data?.meta) {
                    return {
                        ...res.data.meta,
                        imageUrlLock: res.data?.meta?.imageUrlLock || false
                    }
                }
            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchAdminPanelBulkActionPost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelBulkActionPost',
    async ({ids, status}: { ids: string[], status: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

       await bulkActionOnPosts(ids, status).then((res: AxiosResponse<any>) => {
            thunkAPI.dispatch(setAlert({message: res.data?.message, type: 'success'}))

        }).catch((err) => {
            thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchAdminCheckAndRemoveDeletedVideos = createAsyncThunk(
    'adminPanelPosts/fetchAdminCheckAndRemoveDeletedVideos',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await checkAndRemoveDeletedVideos()
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({
                    message: res.data?.message || 'Checking Removed Video Started',
                    type: 'success'
                }))

            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)

export const fetchSetMetaThumbnailsAndCount = createAsyncThunk(
    'adminPanelPosts/fetchSetMetaThumbnailsAndCount',
    async (type: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await setMetaThumbnailsAndCount(type)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({
                    message: res.data?.message || 'Setting New Image and Fix Count For Meta Data Started',
                    type: 'success'
                }))

            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchGeneratePermaLinkForPosts = createAsyncThunk(
    'adminPanelPosts/fetchGeneratePermaLinkForPosts',
    async (type: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await generatePermaLinkForPosts(type)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({
                    message: res.data?.message || 'Generating PermaLinks for Posts Started',
                    type: 'success'
                }))

            }).catch((err) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


//notused
// export const fetchPostThumbnailsUpload = createAsyncThunk(
//     'adminPanelPosts/fetchPostThumbnailsUpload',
//     async (image, thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//         await AxiosInstance.post('/api/admin/fileManager/postThumbnailsUpload', image).then(res => {
//
//         }).catch(err => {
//
//         }).finally(() => thunkAPI.dispatch(loading(false)))
//     }
// )


//notused
// export const fetchAdminImportPosts = createAsyncThunk(
//     'adminPanelPosts/fetchAdminImportPosts',
//     async (posts: Post[], thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//         await AxiosInstance.post(`/api/admin/posts/adminImportPosts`, {
//             posts,
//             token: localStorage.wt
//         }).then((res: AxiosResponse<any>) => {
//             thunkAPI.dispatch(setAlert({message: res?.data?.message || 'posts are imported', type: 'success'}))
//
//         }).catch((err) => {
//             thunkAPI.dispatch(setAlert({message: err?.response?.data?.message, type: 'error', err}))
//
//         }).finally(() => {
//             thunkAPI.dispatch(loading(false))
//         })
//     })


export const fetchAdminExportPosts = createAsyncThunk(
    'adminPanelPosts/fetchAdminExportPosts',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await exportPosts(data).then(res => {
            const posts = res.data.exportedData.map((post:any) => {
                post.mainThumbnail = post.mainThumbnail ? post.mainThumbnail.includes('http') ? post.mainThumbnail : process.env.NEXT_PUBLIC_PRODUCTION_URL + post.mainThumbnail : '';
                //@ts-ignore
                !data.ID ? delete post._id : null
                delete post.__v;
                delete post.author;
                return post
            })
            let filename = `${Date.now().toLocaleString()}-posts.json`;
            let contentType = "application/json;charset=utf-8;";
            //@ts-ignore
            if (window.navigator && window.navigator?.msSaveOrOpenBlob) {
                let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(posts)))], {type: contentType});
                // @ts-ignore
                navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                let a = document.createElement('a');
                a.download = filename;
                a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(posts));
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err?.response?.data?.message, type: 'error', err}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

// export const fetchAdminCheckAndRemoveDeletedVideos = createAsyncThunk(
//     'adminPanelPosts/fetchAdminCheckAndRemoveDeletedVideos',
//     async (data, thunkAPI) => {
//
//     })


export const fetchAdminBulkActionMeta = createAsyncThunk(
    'adminPanelPosts/fetchAdminBulkActionMeta',
    async ({type, status, ids}: { type: string, status: string, ids: string[] }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        await bulkActionOnMetas(type, status, ids)
            .then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    })


// export const fetchCheckRemovedContent = createAsyncThunk(
//     'adminPanelPosts/fetchCheckRemovedContent',
//     async (data: {}, thunkAPI) => {
//         const body = {
//             ...data,
//             token: localStorage.wt
//         };
//
//         await AxiosInstance.post(`/api/v1/posts/checkRemovedContent`, body)
//     })

// export const fetchUpdateComment = createAsyncThunk(
//     'adminPanelPosts/fetchUpdateComment',
//     async (data: {}, thunkAPI) => {
//         const body = {
//             ...data,
//             token: localStorage.wt
//         };
//         await AxiosInstance.post(`/api/admin/posts/updateComment`, body)
//     })

export const fetchAdminYoutubeDataScrapper = createAsyncThunk(
    'adminPanelPosts/fetchAdminYoutubeDataScrapper',
    async (url: string, thunkAPI) => {
        const durationToString = (duration :any) => {
            const hours = duration.hours === 0 ? '' :
                duration.hours < 10 ? '0' + duration.hours.toString() + ':' :
                    duration.hours.toString() + ':'
            const min = duration.minutes === 0 ? '' :
                duration.minutes < 10 ? '0' + duration.minutes.toString() + ':' :
                    duration.minutes.toString() + ':'
            const sec = duration.seconds < 10 ?
                '0' + duration.seconds.toString() :
                duration.seconds.toString()
            return hours + min + sec
        }

        await scrapYoutubeInfo(url).then(async res => {
            for await (let video of res.data.videos) {
                if (video.id) {
                    const videoData = {
                        title: video.title ? video.title : '',
                        quality: video.raw.contentDetails ? video.raw.contentDetails.definition === 'hd' ? '1080p' : '480p' : '1080',
                        //quality:'1080',
                        mainThumbnail: video.thumbnails.medium ? video.thumbnails.medium.url : '',
                        duration: video.duration ? durationToString(video.duration) : '00:00',
                        videoEmbedCode: `https://www.youtube.com/embed/${video.id}`,
                        description: video.description ? video.description : '',
                        postType: 'video',
                        downloadLink: url,
                        status: 'draft',
                        likes: 0,
                        disLikes: 0,
                        views: 0
                    }
                    // @ts-ignore
                    await AxiosInstance.post(`/api/admin/posts/createNewPost`, {
                        postData: videoData,
                        token: localStorage.wt
                    })
                }
            }
        })
    })


// @ts-ignore
export const postsSlice = createSlice({
    name: 'adminPanelPosts',
    initialState,
    reducers: {
        // @ts-ignore
        adminDefineNewPost: (state, action: PayloadAction<any>) => {
            const postType = typeof window !== 'undefined' && localStorage?.preferAdminPostType ? localStorage?.preferAdminPostType : 'standard';

            return {
                ...state,
                activeEditingLanguage: 'default',
                post: {
                    postType
                }
            };
        },
        adminChangeActiveEditingLanguage: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeEditingLanguage: action.payload
            };
        },
        adminEditPost: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload
                }
            }
        },
        adminEditMeta: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                meta: {
                    ...state.meta,
                    ...action.payload
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdminPanelPost.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                post: action.payload
            };
        }).addCase(fetchAdminPanelPosts.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        }).addCase(fetchAdminPanelMetas.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        }).addCase(fetchAdminPanelMeta.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                meta: action.payload
            };
        })
    }
})


export const {
    adminEditPost,
    adminEditMeta,
    adminDefineNewPost,
    adminChangeActiveEditingLanguage
} = postsSlice.actions

export const postsReducer = (state: RootState) => state?.posts || null
//@ts-ignore
export default postsSlice.reducer