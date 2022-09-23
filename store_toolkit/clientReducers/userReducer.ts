import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import Axios from "@_variables/util/Axios";
import {loading, setAlert, loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {NextRouter} from "next/router";
import Peer from 'simple-peer'
import {socket} from '@_variables/socket';

interface UserState {
    userData: any;
    userRatingData: {},
    loggedIn: boolean,
    userPageData: {},
    conversations: [],
    activeConversation: {
        messages: [],
        users: []
    },
    callData: {
        myVideo: any,
        partnerVideo: any,
        callerSignal: any,
        calling: boolean,
        receivingCall: boolean,
        callAccepted: boolean,
        callerName: string,
        callerId: string,
        userStreamData: any
    }
}

const initialState: UserState = {
    userData: {},
    userRatingData: {},
    loggedIn: false,
    userPageData: {},
    conversations: [],
    activeConversation: {
        messages: [],
        users: []
    },
    callData: {
        myVideo: null,
        partnerVideo: null,
        callerSignal: null,
        calling: false,
        receivingCall: false,
        callAccepted: false,
        callerName: '',
        callerId: '',
        userStreamData: null
    }
}

interface Login {
    username: string,
    password: string
}

export const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async ({username, password}: Login, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.post('/api/v1/users/login', {username, password}).then(res => {
            res?.data?.token ? localStorage.setItem('wt', res.data.token) : null
            return {
                userData: res.data,
                loggedIn: true
            }

        }).catch((err) => {
            console.log('err')
            thunkAPI.dispatch(setAlert({message: err?.response?.data?.message, type: 'error'}))
            return {
                userData: {},
                loggedIn: false
            }
        }).finally(() => {
            thunkAPI.dispatch(loading(false))
        })
    }
)

interface FetchOutgoingCall {
    conversation: string,
    mySocketId: string,
    callerName: string,
    router: NextRouter
}


export const fetchOutgoingCall = createAsyncThunk(
    'user/fetchOutgoingCall',
    async ({conversation, mySocketId, callerName, router}: FetchOutgoingCall, thunkAPI) => {
        try {
            await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myVideo => {

                thunkAPI.dispatch(setMyVideoData(myVideo))

                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: myVideo
                })

                peer.on('signal', (data) => {
                    socket.emit("callToConversation", {
                        conversation,
                        callerSignal: data,
                        callerId: mySocketId,
                        callerName
                    })
                })

                peer.on('stream', (stream) => {
                    thunkAPI.dispatch(setPartnerVideoData(stream))
                    // console.log(stream)
                    // dispatch({
                    //     type: SET_PARTNER_VIDEO,
                    //     payload: stream
                    // })
                })

                socket.on('callAccepted', (signal) => {
                    thunkAPI.dispatch(setCallAccepted(true))
                    // dispatch({
                    //     type: SET_CALL_ACCEPTED,
                    //     payload: {
                    //         callAccepted: true,
                    //     }
                    // })
                    peer.signal(signal)
                })

                socket.on('endCall', () => {
                    thunkAPI.dispatch(setCallAccepted(false))
                    peer.destroy()
                    router.reload()
                })

                peer.on("error", (error) => {
                    console.log(error)
                })

            })

        } catch (err) {
            thunkAPI.dispatch(setAlert({message: 'Can Not Access The Camera', type: 'error', err}))
        }
    }
)

export const setMyVideoData = createAsyncThunk(
    'user/setMyVideoData',
    async (myVideo: any, thunkAPI) => {
        return myVideo
    }
)
export const setPartnerVideoData = createAsyncThunk(
    'user/setPartnerVideoData',
    async (stream: any, thunkAPI) => {
        return stream
    }
)
export const setCallAccepted = createAsyncThunk(
    'user/setCallAccepted',
    async (isAccepted: boolean, thunkAPI) => {
        return isAccepted
    }
)

interface FetchAnswerTheCall {
    myVideo: any,
    conversation: string,
    callerSignal: any,
    router: NextRouter
}


export const fetchAnswerTheCall = createAsyncThunk(
    'user/fetchAnswerTheCall',
    async ({myVideo, conversation, callerSignal, router}: FetchAnswerTheCall, thunkAPI) => {
        thunkAPI.dispatch(setCallAccepted(true))
        // dispatch({
        //     type: SET_CALL_ACCEPTED,
        //     payload: {
        //         callAccepted: true,
        //     }
        // })
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: myVideo
        })

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, conversation})
        })

        peer.on('stream', (partnerVideo) => {
            thunkAPI.dispatch(setPartnerVideoData(partnerVideo))
            // dispatch({
            //     type: SET_PARTNER_VIDEO,
            //     payload: partnerVideo
            // })
        })

        peer.signal(callerSignal)

        socket.on('endCall', () => {
            // dispatch({
            //     type: END_CALL,
            //     payload: true
            // })
            peer.destroy()
            router.reload()
        })


        peer.on("error", (error) => {
            console.log(error)
        })
    }
)


export const fetchSpecificUserData = createAsyncThunk(
    'user/fetchSpecificUserData',
    async ({fields}: { fields: string[] }, thunkAPI) => {
        if (localStorage.wt) {
            return await Axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt, fields}).then(res => {
                thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))
                return res.data?.userData
            }).catch((err) => {
                localStorage.removeItem('wt')
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
            })
        } else {
            thunkAPI.dispatch(setAlert({message: 'You Need To Login', type: 'error'}))
        }
    }
)


export const fetchUserResetPassword = createAsyncThunk(
    'user/fetchUserResetPassword',
    async (data, thunkAPI) => {
        return await Axios.post('/api/v1/users/resetPassword', {token: localStorage.wt, data}).then(res => {
            return res.data?.userData
        }).catch(() => {
            localStorage.removeItem('wt')
        })

    }
)


export const fetchUserRegister = createAsyncThunk(
    'user/fetchUserRegister',
    async ({data}: { data: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.post('/api/v1/users/register', data).then(res => {
            thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))

            setTimeout(() => {
                thunkAPI.dispatch(loginRegisterForm('login'))
            }, 2000)

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchConversations = createAsyncThunk(
    'user/fetchConversations',
    async (_id: string, thunkAPI) => {
        return Axios.post('/api/v1/users/getConversations',
            {_id, token: localStorage.wt})
            .then(res => {
                return res.data?.conversations
            })
    }
)

export const fetchConversation = createAsyncThunk(
    'user/fetchConversation',
    async ({_id, loadAmount}: { _id: string, loadAmount: number }, thunkAPI) => {
        return Axios.post('/api/v1/users/getConversation',
            {
                _id,
                loadAmount,
                token: localStorage.wt
            })
            .then(res => {
                return res.data.conversation
            })
    }
)
export const fetchDeleteConversation = createAsyncThunk(
    'user/fetchDeleteConversation',
    async (_id: string, thunkAPI) => {
        return await Axios.get(`/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`)
            .then(res => {


                thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))

                return _id

            }).catch(err => {
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
            })
    }
)
export const fetchUserPageData = createAsyncThunk(
    'user/fetchUserPageData',
    async ({username, _id, fields}: { username?: string, _id?: string, fields: string[] }, thunkAPI) => {
        const body = {
            username,
            fields,
            _id
        }

        return await Axios.post('/api/v1/users/getUserPreviewData', body).then(res => {
            return res.data.userData
        }).catch(error => {
            console.log(error)
        })

    }
)
export const fetchUserProfileImageUpload = createAsyncThunk(
    'user/fetchUserProfileImageUpload',
    async (image: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.post('/api/v1/fileManager/userImageUpload', image).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchFollowUser = createAsyncThunk(
    'user/fetchFollowUser',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            token: localStorage.wt
        }
        return await Axios.post('/api/v1/users/followUser', body).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchUnFollowUser = createAsyncThunk(
    'user/fetchUnFollowUser',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            token: localStorage.wt
        }
        return await Axios.post('/api/v1/users/unFollowUser', body).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchSendMessage = createAsyncThunk(
    'user/fetchSendMessage',
    async ({_id, message}: { _id: string, message: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            message,
            token: localStorage.wt
        }
        return await Axios.post('/api/v1/users/sendMessage', body).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const fetchStartConversation = createAsyncThunk(
    'user/fetchStartConversation',
    async ({_id, push}: { _id: string, push: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            token: localStorage.wt
        }
        await Axios.post('/api/v1/users/conversation', body).then(res => {
            if (res.data?.conversation?._id) {
                push(`/messenger/${res.data?.conversation?._id}`)
            }
        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchSendAMessageToPrivateConversation = createAsyncThunk(
    'user/fetchSendAMessageToPrivateConversation',
    async ({conversationId, messageBody}: { conversationId: string, messageBody: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            conversationId,
            messageBody,
            token: localStorage.wt
        }
        await Axios.post('/api/v1/users/messageToConversation', body).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchMultipleUserDataById = createAsyncThunk(
    'user/fetchMultipleUserDataById',
    async ({usersList, type}: { usersList: {}[], type: string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            usersList
        }
        return await Axios.post('/api/v1/users/getMultipleUserDataById', body).then(res => {
            if (type === 'followers') {
                //UPDATE_USER_DATA_FIELD

                return {followers: res?.data?.users || []}

            } else if (type === 'following') {
                return {following: res?.data?.users || []}

            }

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchUserAutoLogin = createAsyncThunk(
    'user/fetchUserAutoLogin',
    async ({fields}: { fields: string[] }, thunkAPI) => {
        if (localStorage.wt) {
            return await Axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt, fields}).then(res => {
                // thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))
                return res.data?.userData
            }).catch((err) => {
                localStorage.removeItem('wt')
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
            })
        } else {
            thunkAPI.dispatch(setAlert({message: 'You Need To Login', type: 'error'}))
        }
    }
)


// export const fetchUserPostImageUpload = createAsyncThunk(
//     'adminPanelFileManager/fetchUserPostImageUpload',
//     async ({images, postId}: { images: [any], postId?: string }, thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//
//         try {
//             const filesData = new FormData()
//             filesData.append('token', localStorage.wt)
//             filesData.append('postId', postId)
//
//             for (const image in images) {
//                 if (images[image]?.name && images[image]?.size && images[image]?.type) {
//                     const fileNameSplit = images[image].name.split('.')
//                     const fileExtension = fileNameSplit[fileNameSplit.length - 1]
//                     filesData.append(`${image}.${fileExtension}`, images[image])
//                 }
//             }
//
//             await Axios.post('/api/v1/fileManager/userPostImageUpload', filesData).then(res => {
//                 console.log(res.data)
//             }).catch(err => {
//                 thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))
//
//             }).finally(() => thunkAPI.dispatch(loading(false)))
//
//         } catch (error) {
//             console.log(error)
//         }
//
//
//         // return await Axios.post('/api/v1/fileManager/userPostImageUpload', images).then(res => {
//         //
//         //     console.log(res.data)
//         //     // if (useType === 'fileManagerFileUpload') {
//         //     //     return {
//         //     //         clickedItem: res.data?.path?.replace('./', ''),
//         //     //         clickedItemName: res.data?.path?.split('/')[res?.data?.path?.split('/')?.length - 1]
//         //     //     }
//         //     // } else if (useType === 'postMainThumbnail') {
//         //     //     return {'mainThumbnail': res.data?.path?.replace('./', '/')}
//         //     // } else if (useType === 'postImageGallery') {
//         //     //     //@ts-ignore
//         //     //     return {'images': [...(postData?.images || []), res.data.path.replace('./', '/')]}
//         //     // } else if (useType === 'postVideoUrl') {
//         //     //     return {'videoUrl': res.data?.path?.replace('./', '/')}
//         //     // } else if (useType === 'postVideoTrailerUrl') {
//         //     //     return {'VideoTrailerUrl': res.data?.path?.replace('./', '/')}
//         //     // }
//         //
//         // }).catch(err => {
//         //     thunkAPI.dispatch(setAlert({message: err.response?.data?.message, type: 'error'}))
//         //
//         // }).finally(() => thunkAPI.dispatch(loading(false)))
//     }
// )

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserPageData: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                userPageData: action.payload
            }
        },
        updateUserDataField: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload
                }
            }
        },
        // getUserPageData: (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         userPageData: action.payload
        //     }
        // },
        getSpecificUserData: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload.userData
                },
            }
        },
        userLogout: (state, action: PayloadAction<any>) => {
            localStorage.removeItem('wt')
            return {
                ...state,
                userData: {},
                loggedIn: false
            }
        },
        dispatchSocketId: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                socketId: action.payload,
            }
        },
        // getConversations: (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         conversations: action.payload
        //     }
        // },
        // getConversation: (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         activeConversation: action.payload,
        //     }
        // },
        // deleteConversation: (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         activeConversation: action.payload,
        //     }
        // },
        //@ts-ignore
        newMessageInConversation: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeConversation: {
                    ...state.activeConversation,
                    messages: [...(state.activeConversation?.messages || []), action.payload]
                }
            }
        },
        setMyVideo: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    ...state.callData,
                    myVideo: action.payload,
                }
            }
        },
        setPartnerVideo: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    ...state.callData,
                    partnerVideo: action.payload,
                }
            }
        },
        setCallingStatus: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    ...state.callData,
                    calling: action.payload,
                }
            }
        },
        //need to rebuild
        incomingCall: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload,
                }
            }
        },
        // outGoingCall: (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         callData: {
        //             ...state.callData,
        //             ...action.payload,
        //         }
        //     }
        // },
        // setCallAccepted: (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         callData: {
        //             ...state.callData,
        //             ...action.payload
        //         }
        //     }
        // },
        endCall: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    myVideo: null,
                    partnerVideo: null,
                    callerSignal: null,
                    calling: false,
                    receivingCall: false,
                    callAccepted: false,
                    callerName: null,
                    callerId: null,
                    userStreamData: null
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(fetchUserAutoLogin.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: action.payload,
                    loggedIn: true
                }
            })
            .addCase(fetchSpecificUserData.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: action.payload,
                    loggedIn: true
                }
            })
            .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    conversations: action.payload,
                }
            })
            .addCase(fetchConversation.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    activeConversation: action.payload,
                }
            })
            .addCase(fetchDeleteConversation.fulfilled, (state, action: PayloadAction<any>) => {

                if (action.payload) {
                    // const newConversationList = [...state.conversations?.filter(conversation=> conversation._id !== action.payload)]
                    // return {
                    //     ...state,
                    //     conversations:newConversationList,
                    // }
                }

            })
            .addCase(fetchUserPageData.fulfilled, (state, action: PayloadAction<any>) => {
                if (action.payload) {
                    return {
                        ...state,
                        userPageData: action.payload
                    }
                }
            })
            .addCase(fetchMultipleUserDataById.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: {
                        ...state.userData,
                        ...action.payload
                    }
                }
            })
            .addCase(setPartnerVideoData.fulfilled, (state, action: PayloadAction<any>) => {
                state.callData.partnerVideo = action.payload
            })
            .addCase(setCallAccepted.fulfilled, (state, action: PayloadAction<any>) => {
                state.callData.callAccepted = action.payload
            })
            .addCase(setMyVideoData.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    myVideoCallData: {
                        calling: true,
                        myVideo: action.payload,
                    },
                }
            })
    }
});

export const {
    setUserPageData,
    updateUserDataField,
    getSpecificUserData,
    userLogout,
    dispatchSocketId,
    newMessageInConversation,
    setMyVideo,
    setPartnerVideo,
    setCallingStatus,
    incomingCall,
    outGoingCall,
    // setCallAccepted,
    endCall,
} = userSlice.actions;

export const userReducer = (state: RootState) => state?.user || null;

// @ts-ignore
export default userSlice.reducer;