import axios, {AxiosResponse, AxiosError} from "axios";
import Axios from "@_variables/util/Axios";
import {AxiosErrorTypes, Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import {
    ADMIN_EDIT_META,
    ADMIN_EDIT_POST,
    ADMIN_GET_META,
    ADMIN_GET_METAS,
    ADMIN_GET_POST,
    ADMIN_GET_POSTS,
    ADMIN_SET_TOTAL_COUNT
} from "../adminTypes";
import {CHANGE_ACTIVE_EDITING_LANGUAGE, GET_POST, LOADING, NEW_POST, SET_ALERT} from "@store/types";
import {setLoading} from "@store/clientActions/globalStateActions";
import {AnyAction} from "redux";

//@ts-ignore
export const adminGetPost = (_id?: string | string[]):AnyAction => async dispatch => {
    dispatch({type: LOADING, payload: true})
    if (_id) {
        await Axios.get( `/api/admin/posts/getPost?_id=${_id}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                if (res.data?.post){
                    dispatch({
                        type: GET_POST,
                        payload: {post:res.data?.post || {},relatedPosts:[]}
                    })
                }


                dispatch({
                    type: ADMIN_GET_POST,
                    payload: res.data?.post
                })

            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                dispatch({
                    type: SET_ALERT,
                    payload: {message: err.response?.data?.message, type: 'Error'}
                })
            }).finally(() => {
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })

    } else {
        dispatch({
            type: ADMIN_GET_POST,
            payload: {}
        })
    }
}

//@ts-ignore
export const adminGetPosts = (queriesData?: string):AnyAction => async dispatch => {
    dispatch({type: LOADING, payload: true})
    await Axios.get(
        `/api/admin/posts/getPosts${queriesData}&token=${localStorage.wt}`)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: ADMIN_GET_POSTS,
                payload: res.data?.posts
            })
            dispatch({
                type: ADMIN_SET_TOTAL_COUNT,
                payload: res.data?.totalCount
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response?.data?.message, type: 'Error'}
            })
        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


//@ts-ignore
export const adminUpdatePost = (data?: PostTypes):AnyAction => async dispatch => {
    dispatch({type: LOADING, payload: true})
    const body = {
        postData: data,
        token: localStorage.wt
    }
    await Axios.post( `/api/admin/posts/updatePost`, body)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: res.data.message || 'Post Updated', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


//@ts-ignore
export const adminSaveNewPost = (data?: PostTypes, router?: any):AnyAction => async dispatch => {
    dispatch({type: LOADING, payload: true})
    const body = {
        postData: data,
        token: localStorage.wt
    };

    await Axios.post(`/api/admin/posts/createNewPost`, body)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: res.data.message || 'Post Saved', type: 'success'}
            })
            setTimeout(() => {

                res.data?.savedPostData?._id && router ? router.push('/admin/post?id=' + res.data.savedPostData._id) : null
            }, 1500)
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })

        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


//@ts-ignore
export const adminEditPost = (data?: any):AnyAction => dispatch => {
    dispatch({
        type: ADMIN_EDIT_POST,
        payload: {...data}
    })
}

//@ts-ignore
export const adminChangeActiveEditingLanguage = (language: string):AnyAction => dispatch => {

    dispatch({
        type: CHANGE_ACTIVE_EDITING_LANGUAGE,
        payload: language
    })
}

//@ts-ignore
export const adminNewPost = ():AnyAction => dispatch => {

    const postType = typeof window !== 'undefined' && localStorage?.preferAdminPostType ? localStorage?.preferAdminPostType : 'standard';

    dispatch({
        type: NEW_POST,
        payload: {
            postType
        }
    })
}

//@ts-ignore
export const adminGetMeta = (_id: string | string[] | undefined):AnyAction => async dispatch => {
    if (_id && localStorage.wt) {
        dispatch({
            type: LOADING,
            payload: true
        })
        await Axios.get(`/api/admin/posts/getMeta?_id=${_id}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                if (res?.data?.meta) {

                    dispatch({
                        type: ADMIN_GET_META,
                        payload: {
                            ...res.data.meta,
                            imageUrlLock: res.data?.meta?.imageUrlLock || false
                        }
                    })

                }

                dispatch({
                    type: LOADING,
                    payload: false
                })
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                dispatch({
                    type: SET_ALERT,
                    payload: {message: err.response.data.message, type: 'error', err}
                })
            }).finally(() => {
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }
}


//@ts-ignore
export const adminGetMetas = (queries: string | string[] | undefined):AnyAction => async dispatch => {
    if (localStorage.wt) {
        dispatch({
            type: LOADING,
            payload: true
        })
        await Axios.get(`/api/admin/posts/getMetas${queries}&token=${localStorage.wt}`)
            .then((res: AxiosResponse<any>) => {
                dispatch({
                    type: ADMIN_GET_METAS,
                    payload: res.data?.metas
                })
                dispatch({
                    type: ADMIN_SET_TOTAL_COUNT,
                    payload: res.data?.totalCount
                })
            }).catch((err: AxiosError<AxiosErrorTypes>) => {
                dispatch({
                    type: SET_ALERT,
                    payload: {message: err.response.data.message, type: 'error', err}
                })
            }).finally(() => {
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }
}

//@ts-ignore
export const adminEditMeta = (change: object):AnyAction => (dispatch) => {
    dispatch({
        type: ADMIN_EDIT_META,
        payload: change
    })
}

//@ts-ignore
export const adminDeleteMeta = (_id: string | string[]):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})

    const body = {
        _id,
        token: localStorage.wt
    };
    await Axios.post( `/api/admin/posts/deleteMeta`, body)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: SET_ALERT,

                payload: {message: res.data?.message || 'deleted', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: false
            })
        })

}

//@ts-ignore
export const adminUpdateMeta = (data: Meta):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})
    const body = {
        data,
        token: localStorage.wt
    };
    await Axios.post(`/api/admin/posts/updateMeta`, body)
        .then((res: AxiosResponse<any>) => {

            dispatch({
                type: SET_ALERT,
                // @ts-ignore
                payload: {message: res.data?.message, type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: false
            })
        })

}

//@ts-ignore
export const adminBulkActionPost = (ids: string[], status: string):AnyAction => (dispatch) => {
    dispatch({type: LOADING, payload: true})
    const body = {
        ids,
        status,
        token: localStorage.wt
    };
    Axios.post('/api/admin/posts/postsBulkAction', body).then((res: AxiosResponse<any>) => {
        dispatch({
            type: SET_ALERT,
            payload: {message: res.data?.message, type: 'success'}
        })
    }).catch((err: AxiosError<AxiosErrorTypes>) => {
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response.data.message, type: 'error', err}
        })
    }).finally(()=>dispatch({type: LOADING, payload: false}))

}

//@ts-ignore
export const adminCheckAndRemoveDeletedVideos = ():AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})
    await Axios.get(`/api/admin/posts/checkAndRemoveDeletedVideos?token=${localStorage.wt}`)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: res.data?.message || 'Checking Removed Video Started', type: 'success'}
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//@ts-ignore
export const setMetaThumbnailsAndCount = (type?: string):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})
    await Axios.get(`/api/admin/posts/setMetaThumbnailsAndCount?token=${localStorage.wt}${type ? `&type=${type}` : ''}`)
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: SET_ALERT,
                payload: {
                    message: res.data?.message || 'Setting New Image and Fix Count For Meta Data Started',
                    type: 'success'
                }
            })
        }).catch((err: AxiosError<AxiosErrorTypes>) => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error', err}
            })
        }).finally(() =>  dispatch({type: LOADING, payload: false}))
}

//@ts-ignore
export const postThumbnailsUpload = (image?: any):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})
    await Axios.post( '/api/admin/fileManager/postThumbnailsUpload', image).then(res=>{

    }).catch(err=>{

    }).finally(() =>  dispatch({type: LOADING, payload: false}))
}


//@ts-ignore
export const importPosts = (posts: PostTypes[]):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})
    await Axios.post(`/api/admin/posts/adminImportPosts`, {
        posts,
        token: localStorage.wt
    }).then((res: AxiosResponse<any>) => {
        dispatch({
            type: SET_ALERT,
            payload: {message: res?.data?.message || 'posts are imported', type: 'success'}
        })
    }).catch((err: AxiosError<AxiosErrorTypes>) => {
        dispatch({
            type: SET_ALERT,
            payload: {message: err?.response?.data?.message, type: 'error', err}
        })
    }).finally(() => {
        dispatch({type: LOADING, payload: false})
    })
}

//@ts-ignore
export const adminExportPosts = (data: {}):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})

    const body = {
        token: localStorage.wt,
        data
    };
   await Axios.post( '/api/admin/posts/exportPosts', body).then(res=>{

       const posts = res.data.exportedData.map(post => {
           post.mainThumbnail = post.mainThumbnail ? post.mainThumbnail.includes('http') ? post.mainThumbnail : process.env.NEXT_PUBLIC_PRODUCTION_URL + post.mainThumbnail : '';
           //@ts-ignore
           !data.ID ?  delete post._id : null
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
           dispatch(setLoading(false))
       } else {
           let a = document.createElement('a');
           a.download = filename;
           a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(posts));
           a.target = '_blank';
           document.body.appendChild(a);
           a.click();
           document.body.removeChild(a);
           dispatch(setLoading(false))
       }

   }).catch(err=>{

       dispatch({
           type: SET_ALERT,
           payload: {message: err?.response?.data?.message, type: 'error', err}
       })

   }).finally(()=>dispatch({type: LOADING, payload: false}))
}


//@ts-ignore
export const adminBulkActionMeta = (type,status,ids):AnyAction => async (dispatch) => {
    dispatch({type: LOADING, payload: true})
    const body = {
        type,
        status,
        ids,
        token: localStorage.wt
    };
    await Axios.post( `/api/admin/posts/bulkAction`, body).then(res=>{

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

//@ts-ignore
export const checkRemovedContent = (data: {}):AnyAction => async (dispatch) => {

    const body = {
        ...data,
        token: localStorage.wt
    };

    await Axios.post( `/api/v1/posts/checkRemovedContent` , body)

}

//@ts-ignore
export const updateComment = (data):AnyAction => async (dispatch) => {
    const body = {
        ...data,
    };
    await Axios.post( `/api/admin/posts/updateComment`, body)
}

//@ts-ignore
export const adminYoutubeDataScrapper = (url):AnyAction => async (dispatch) => {


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

    await Axios.post('/api/admin/scrapper/scrapYoutubeInfo', body).then(async res=>{
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
}




















