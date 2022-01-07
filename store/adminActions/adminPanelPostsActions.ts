import * as types from "../types";
import * as adminTypes from "../adminTypes";
import axios, {AxiosResponse, AxiosError} from "axios";
import {AxiosErrorTypes, Meta} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "../../_variables/TypeScriptTypes/PostTypes";

export const adminGetPost = (_id?: string | string[]) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    if (_id) {
        await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                dispatch({
                    type: types.ADMIN_GET_POST,
                    payload: res.data?.post
                })
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                dispatch({
                    type: types.SET_ALERT,
                    payload: {message: err.response?.data?.message, type: 'Error'}
                })
            }).finally(() => {
                dispatch({
                    type: types.LOADING,
                    payload: false
                })
            })
    } else {
        dispatch({
            type: types.ADMIN_GET_POST,
            payload: {}
        })
    }
}

export const adminGetPosts = (queriesData?: object) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    await axios.get(
          `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`)
        .then((res: AxiosResponse<any>) => {
            console.log(res.data?.posts)
            dispatch({
                type: adminTypes.ADMIN_GET_POSTS,
                payload: res.data?.posts
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response?.data?.message, type: 'Error'}
            })
        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })
}

export const adminUpdatePost = (data?: PostTypes) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    const body = {
        postData: data,
        token: localStorage.wt
    }
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/updatePost`, body)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: res.data.message || 'Post Updated', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })
}

export const adminSaveNewPost = (data?: PostTypes, router?: any) => async (dispatch: any) => {
    const body = {
        postData: data,
        token: localStorage.wt
    };
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/createNewPost`, body)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: res.data.message || 'Post Saved', type: 'success'}
            })
            setTimeout(() => {

                res.data?.savedPostData?._id && router ? router.push('/admin/post?id=' + res.data.savedPostData._id) : null
            }, 1500)
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })

        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })
}

export const adminEditPost = (data?: any) => (dispatch: any) => {
    dispatch({
        type: types.ADMIN_EDIT_POST,
        payload: {...data}
    })
}

export const adminChangeActiveEditingLanguage = (language: string) => (dispatch: any) => {

    dispatch({
        type: types.CHANGE_ACTIVE_EDITING_LANGUAGE,
        payload: language
    })
}

export const adminNewPost = () => (dispatch: any) => {

    const postType = typeof window !== 'undefined' && localStorage?.preferAdminPostType ? localStorage?.preferAdminPostType : 'standard';

    dispatch({
        type: types.NEW_POST,
        payload: {
            postType
        }
    })
}


export const adminGetMeta = (_id: string | string[] | undefined) => async (dispatch: any) => {
    if (_id && localStorage.wt) {
        dispatch({
            type: types.LOADING,
            payload: true
        })
        await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/getMeta?_id=${_id}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                if (res?.data?.meta) {
                    dispatch({
                        type: types.ADMIN_GET_META,
                        payload: {
                            ...res.data.meta,
                            imageUrlLock: res.data?.meta?.imageUrlLock || false
                        }
                    })
                }

                dispatch({
                    type: types.LOADING,
                    payload: false
                })
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                dispatch({
                    type: types.SET_ALERT,
                    payload: {message: err.response.data.message, type: 'error', err}
                })
            }).finally(() => {
                dispatch({
                    type: types.LOADING,
                    payload: false
                })
            })
    }
}


export const adminEditMeta = (change: object) => (dispatch: any) => {
    dispatch({
        type: types.ADMIN_EDIT_META,
        payload: change
    })
}
export const adminDeleteMeta = (_id: string | string[]) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })

    const body = {
        _id,
        token: localStorage.wt
    };
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/deleteMeta`, body)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: types.SET_ALERT,

                payload: {message: res.data?.message || 'deleted', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })

}

export const adminUpdateMeta = (data: Meta) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    const body = {
        data,
        token: localStorage.wt
    };
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/posts/updateMeta`, body)
        .then((res: AxiosResponse<any>) => {

            dispatch({
                type: types.SET_ALERT,
                // @ts-ignore
                payload: {message: res.data?.message, type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })

}


export const adminBulkActionPost = (ids: string[], status: string) => (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    const body = {
        ids,
        status,
        token: localStorage.wt
    };
    axios.post('/api/admin/posts/postsBulkAction', body).then((res: AxiosResponse<any>) => {
        dispatch({
            type: types.SET_ALERT,
            payload: {message: res.data?.message, type: 'success'}
        })
    }).catch((err: AxiosError<AxiosErrorTypes>) => {
        dispatch({
            type: types.SET_ALERT,
            payload: {message: err.response.data.message, type: 'error', err}
        })
    }).finally(() => {
        dispatch({
            type: types.LOADING,
            payload: false
        })
    })

}

export const adminCheckAndRemoveDeletedVideos = () => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    await axios.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: res.data?.message || 'Checking Removed Video Started', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })
}

export const setMetaThumbnailsAndCount = (type?: string) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    await axios.get(`/api/admin/posts/setMetaThumbnailsAndCount?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: res.data?.message || 'Setting New Image and Fix Count For Meta Data Started', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: types.LOADING,
                payload: false
            })
        })
}
export const importPosts = (posts: PostTypes[]) => async (dispatch: any) => {
    dispatch({
        type: types.LOADING,
        payload: true
    })
    await axios.post(`/api/admin/posts/adminImportPosts`, {
        posts,
        token: localStorage.wt
    }).then((res: AxiosResponse<any>) => {
        dispatch({
            type: types.SET_ALERT,
            payload: {message: res?.data?.message || 'posts are imported', type: 'success'}
        })
    }).catch((err: AxiosError<AxiosErrorTypes>) => {
        dispatch({
            type: types.SET_ALERT,
            payload: {message: err?.response?.data?.message, type: 'error', err}
        })
    }).finally(() => {
        dispatch({
            type: types.LOADING,
            payload: false
        })
    })
}