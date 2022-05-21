import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {AxiosErrorTypes, Meta, PageTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {loading, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";


interface AdminPanelPosts {
    post: {
        title: string,
        description: string
    },
    totalCount: number,
    posts: [],
    meta: {},
    metas: [],
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
        return await Axios.get(`/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                return res.data?.post
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'Error'}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const fetchAdminPanelPosts = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelPosts',
    async (queriesData: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.get(`/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                return {
                    posts: res.data?.posts,
                    totalCount: res.data?.totalCount
                }
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'Error'}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)
export const fetchAdminPanelUpdatePost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelUpdatePost',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            postData: data,
            token: localStorage.wt
        }
        return await Axios.post(`/api/admin/posts/updatePost`, body)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data.message || 'Post Updated', type: 'success'}))
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))
            }).finally(() => {
                thunkAPI.dispatch(loading(false))
            })
    }
)

export const fetchAdminPanelSaveNewPost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelSaveNewPost',
    async ({data, router}: { data?: PostTypes, router?: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            postData: data,
            token: localStorage.wt
        }
        return await Axios.post(`/api/admin/posts/createNewPost`, body)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data.message || 'Post Saved', type: 'success'}))
                setTimeout(() => {
                    res.data?.savedPostData?._id && router ? router.push('/admin/post?id=' + res.data.savedPostData._id) : null
                }, 1500)
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
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
        const body = {
            _id,
            token: localStorage.wt
        };
        return await Axios.post(`/api/admin/posts/deleteMeta`, body)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data?.message || 'deleted', type: 'success'}))

            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))
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
        await Axios.post(`/api/admin/posts/updateMeta`, body)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({message: res.data?.message, type: 'success'}))

            }).catch((err: AxiosError<AxiosErrorTypes>) => {
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
        return await Axios.get(`/api/admin/posts/getMetas${queries}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                return {
                    metas: res.data?.metas,
                    totalCount: res.data?.totalCount
                }
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
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
        return await Axios.get(`/api/admin/posts/getMeta?_id=${_id}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                if (res?.data?.meta) {
                    return {
                        ...res.data.meta,
                        imageUrlLock: res.data?.meta?.imageUrlLock || false
                    }
                }
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchAdminPanelBulkActionPost = createAsyncThunk(
    'adminPanelPosts/fetchAdminPanelBulkActionPost',
    async ({ids, status}: { ids: string[], status: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ids,
            status,
            token: localStorage.wt
        };
        Axios.post('/api/admin/posts/postsBulkAction', body).then((res: AxiosResponse<any>) => {
            thunkAPI.dispatch(setAlert({message: res.data?.message, type: 'success'}))

        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchAdminCheckAndRemoveDeletedVideos = createAsyncThunk(
    'adminPanelPosts/fetchAdminCheckAndRemoveDeletedVideos',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({
                    message: res.data?.message || 'Checking Removed Video Started',
                    type: 'success'
                }))

            }).catch((err: AxiosError<AxiosErrorTypes>) => {
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
        await Axios.get(`/api/admin/posts/setMetaThumbnailsAndCount?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({
                    message: res.data?.message || 'Setting New Image and Fix Count For Meta Data Started',
                    type: 'success'
                }))

            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchGeneratePermaLinkForPosts = createAsyncThunk(
    'adminPanelPosts/fetchGeneratePermaLinkForPosts',
    async (type: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await Axios.get(`/api/admin/posts/generatePermaLinkForPosts?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
            .then((res: AxiosResponse<any>) => {
                thunkAPI.dispatch(setAlert({
                    message: res.data?.message || 'Generating PermaLinks for Posts Started',
                    type: 'success'
                }))

            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error', err}))

            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


//notused
export const fetchPostThumbnailsUpload = createAsyncThunk(
    'adminPanelPosts/fetchPostThumbnailsUpload',
    async (image, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await Axios.post('/api/admin/fileManager/postThumbnailsUpload', image).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


//notused
export const fetchAdminImportPosts = createAsyncThunk(
    'adminPanelPosts/fetchAdminImportPosts',
    async (posts: PostTypes[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        await Axios.post(`/api/admin/posts/adminImportPosts`, {
            posts,
            token: localStorage.wt
        }).then((res: AxiosResponse<any>) => {
            thunkAPI.dispatch(setAlert({message: res?.data?.message || 'posts are imported', type: 'success'}))

        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            thunkAPI.dispatch(setAlert({message: err?.response?.data?.message, type: 'error', err}))

        }).finally(() => {
            thunkAPI.dispatch(loading(false))
        })
    })


export const fetchAdminExportPosts = createAsyncThunk(
    'adminPanelPosts/fetchAdminExportPosts',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            token: localStorage.wt,
            data
        };
        await Axios.post('/api/admin/posts/exportPosts', body).then(res => {

            const posts = res.data.exportedData.map(post => {
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
        const body = {
            type,
            status,
            ids,
            token: localStorage.wt
        };
        await Axios.post(`/api/admin/posts/bulkAction`, body).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    })


export const fetchCheckRemovedContent = createAsyncThunk(
    'adminPanelPosts/fetchCheckRemovedContent',
    async (data: {}, thunkAPI) => {
        const body = {
            ...data,
            token: localStorage.wt
        };

        await Axios.post(`/api/v1/posts/checkRemovedContent`, body)
    })

export const fetchUpdateComment = createAsyncThunk(
    'adminPanelPosts/fetchUpdateComment',
    async (data: {}, thunkAPI) => {
        const body = {
            ...data,
            token: localStorage.wt
        };
        await Axios.post(`/api/admin/posts/updateComment`, body)
    })

export const fetchAdminYoutubeDataScrapper = createAsyncThunk(
    'adminPanelPosts/fetchAdminYoutubeDataScrapper',
    async (url: string, thunkAPI) => {
        const durationToString = duration => {
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

        const body = {
            url,
            token: localStorage.wt
        };

        await Axios.post('/api/admin/scrapper/scrapYoutubeInfo', body).then(async res => {
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
                    await Axios.post(`/api/admin/posts/createNewPost`, {
                        postData: videoData,
                        token: localStorage.wt
                    })
                }
            }
        })
    })



export const adminPanelPostsSlice = createSlice({
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
} = adminPanelPostsSlice.actions

export const adminPanelPostsReducer = (state: RootState) => state?.adminPanelPosts || null
//@ts-ignore
export default adminPanelPostsSlice.reducer