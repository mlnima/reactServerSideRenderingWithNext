// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import getUsers from "api-requests/src/dashboard/users/getUsers";
import getUser from "api-requests/src/dashboard/users/getUser";
import getSignedInUserData from "api-requests/src/common/users/getSignedInUserData";
import loginUser from "api-requests/src/common/users/loginUser";
import {socket} from "web-app/_variables/socket";
import Axios from "web-app/_variables/Axios";
import Peer from 'simple-peer';

interface UserStateRaw {
    userData: any;
    isUserLoggedIn: boolean,
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

interface OutgoingCallAction {
    conversation: string,
    mySocketId: string,
    callerName: string,
    router: any
}

const initialState: UserStateRaw = {
    userData: {},
    isUserLoggedIn: false,
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


export const outgoingCallAction = createAsyncThunk(
    'user/fetchOutgoingCall',
    async ({conversation, mySocketId, callerName, router}: OutgoingCallAction, thunkAPI) => {
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
                })

                socket.on('callAccepted', (signal) => {
                    thunkAPI.dispatch(setCallAccepted(true))
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

export const loginUserAction = createAsyncThunk(
    'users/loginUserAction',
    async ({username,password}:{username:string,password:string}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

       return await loginUser(username, password).then(response => {
            if (response?.data?.token) {
                localStorage.setItem('wt', response.data.token)

                return {
                    userData: response.data,
                    isUserLoggedIn: true
                }
            }
        }).catch(error => {
            return {
                isUserLoggedIn: false
            }
        }).then(() => {
            thunkAPI.dispatch(loading(false))
        })
    }
)

export const autologinUserAction = createAsyncThunk(
    'users/autologinUserAction',
    async ({fields}:{ fields: string[] }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        if (localStorage.wt) {
            return await getSignedInUserData(fields).then(response => {
                thunkAPI.dispatch(setAlert({message: response.data.message, type: 'success'}))
                return {
                    userData: response.data?.userData,
                    isUserLoggedIn: true
                }
            }).catch((err) => {
                localStorage.removeItem('wt')
                thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
            })
        }
    }
)

export const getUsersAction = createAsyncThunk(
    'adminPanelUsers/getUsersAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await getUsers(data).then((res: AxiosResponse<any>) => {
            return {
                users: res.data.users,
                totalCount: res.data.totalCount || 0
            }

        }).catch((error: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const getUserDataAction = createAsyncThunk(
    'adminPanelUsers/getUserDataAction',
    async (_id: string|null, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await getUser(_id)
            .then(res => {
                return res.data.user
            }).catch((error: AxiosError) => {


                thunkAPI.dispatch(setAlert({
                    active: true,
                    type: 'error',
                    message: 'Can Not Get User Data'
                }))
            }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminAutoLogin = createAsyncThunk(
    'user/fetchUserAutoLogin',
    async ({fields}: { fields: string[] }, thunkAPI) => {
        if (localStorage.wt) {
            return await getSignedInUserData(fields)
                .then((response: AxiosResponse) => {
                // console.log(res.data?.userData)
                thunkAPI.dispatch(setAlert({message: response.data.message, type: 'success'}))
                return response.data?.userData
            }).catch((error: AxiosError) => {
                localStorage.removeItem('wt')
                //@ts-ignore
                thunkAPI.dispatch(setAlert({message: error?.response?.data?.message, type: 'error'}))
            })
        } else {
            thunkAPI.dispatch(setAlert({message: 'You Need To Login', type: 'error'}))
        }
    }
)

export const usersSlice = createSlice({
    name: 'adminPanelUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(autologinUserAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(getUsersAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    users: action.payload.users,
                    totalCount: action.payload.totalCount
                };
            })
            .addCase(getUserDataAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    user: action.payload
                };
            })
            .addCase(fetchAdminAutoLogin.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: action.payload,
                    loggedIn: true
                }
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
            .addCase(setPartnerVideoData.fulfilled, (state, action: PayloadAction<any>) => {
                state.callData.partnerVideo = action.payload
            })
            .addCase(setCallAccepted.fulfilled, (state, action: PayloadAction<any>) => {
                state.callData.callAccepted = action.payload
            })
    }
})


export const {} = usersSlice.actions

export const usersReducer = (state: RootState) => state?.users || null

export default usersSlice.reducer