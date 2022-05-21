import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import Axios from "@_variables/util/Axios";
import {loading, setAlert, loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";

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
    'user/login',
    async ({username, password}: Login, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.post('/api/v1/users/login', {username, password}).then(res => {
            console.log(res.data)
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


export const fetchUserAutoLogin = createAsyncThunk(
    'user/autoLogin',
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
    'user/resetPassword',
    async (data, thunkAPI) => {
        return await Axios.post('/api/v1/users/resetPassword', {token: localStorage.wt, data}).then(res => {
            return res.data?.userData
        }).catch(() => {
            localStorage.removeItem('wt')
        })

    }
)


export const fetchUserRegister = createAsyncThunk(
    'user/register',
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
    'user/conversations',
    async (_id: string, thunkAPI) => {
        return Axios.post('/api/v1/users/getConversations',
            {_id, token: localStorage.wt})
            .then(res => {
                return res.data?.conversations
            })
    }
)

export const fetchConversation = createAsyncThunk(
    'user/conversation',
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
    'user/deleteConversation',
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
    'user/userPageData',
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
    'user/profileImageUpload',
    async (image: any, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await Axios.post('/api/v1/fileManager/userImageUpload', image).then(res => {

        }).catch(err => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchFollowUser = createAsyncThunk(
    'user/followUser',
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
    'user/unFollowUser',
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
    'user/sendPrivateMessage',
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
    'user/fetchStartConversation',
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

export const fetchMultipleUserDataById  = createAsyncThunk(
    'user/fetchStartConversation',
    async ({usersList, type}: {usersList: {}[], type:string }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            usersList
        }
       return  await Axios.post('/api/v1/users/getMultipleUserDataById', body).then(res => {
            if (type === 'followers') {
                //UPDATE_USER_DATA_FIELD

                return {followers: res?.data?.users || []}

            } else if (type === 'following') {
                return {following: res?.data?.users || []}

            }

        }).catch(err => {

        }).finally(() =>     thunkAPI.dispatch(loading(false)))
    }
)


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
        outGoingCall: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload,
                }
            }
        },
        setCallAccepted: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload
                }
            }
        },
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
    setCallAccepted,
    endCall,
} = userSlice.actions;

export const userReducer = (state: RootState) => state?.user || null;

// @ts-ignore
export default userSlice.reducer;