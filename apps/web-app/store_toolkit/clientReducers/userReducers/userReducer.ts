// @ts-nocheck
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {UserState} from "typescript-types";
import {loginAction} from "@store_toolkit/clientReducers/userReducers/loginAction";
import {autoLoginAction} from "@store_toolkit/clientReducers/userReducers/autoLoginAction";
// import {getConversationsAction} from "@store_toolkit/clientReducers/userReducers/getConversationsAction";
// import {getConversationAction} from "@store_toolkit/clientReducers/userReducers/getConversationAction";
// import {deleteConversationAction} from "@store_toolkit/clientReducers/userReducers/deleteConversationAction";
import {getUserPageDataAction} from "@store_toolkit/clientReducers/userReducers/getUserPageDataAction";

import {getMultipleUserDataByIdAction} from "@store_toolkit/clientReducers/userReducers/getMultipleUserDataByIdAction";
import {getSpecificUserDataAction} from "@store_toolkit/clientReducers/userReducers/getSpecificUserDataAction";


import {unfollowUserAction} from "@store_toolkit/clientReducers/userReducers/unfollowUserAction";
import {followUserAction} from "@store_toolkit/clientReducers/userReducers/followUserAction";


import {
    setCallAcceptedAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setCallAcceptedAction";
import {setMyVideoAction} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setMyVideoAction";
import {
    setPartnerVideoAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setPartnerVideoAction";

const initialState: UserState = {
    userData: {},
    userRatingData: {},
    loggedIn: false,
    userPageData: {},
    // conversations: [],
    privateMessages:[],
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
        //@ts-ignore
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
            .addCase(loginAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    ...action.payload
                }
            })
            .addCase(autoLoginAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: action.payload,
                    loggedIn: true
                }
            })
            .addCase(getSpecificUserDataAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: {
                        ...state.userData,
                        ...action.payload
                    },
                    loggedIn: true
                }
            })

            // .addCase(getConversationAction.fulfilled, (state, action: PayloadAction<any>) => {
            //     state.activeConversation = action.payload
            // })

            // .addCase(deleteConversationAction.fulfilled, (state, action: PayloadAction<any>) => {
            //
            //     if (action.payload) {
            //         // const newConversationList = [...state.conversations?.filter(conversation=> conversation._id !== action.payload)]
            //         // return {
            //         //     ...state,
            //         //     conversations:newConversationList,
            //         // }
            //     }
            //
            // })

            .addCase(getUserPageDataAction.fulfilled, (state, action: PayloadAction<any>) => {
                if (action.payload) {
                    return {
                        ...state,
                        userPageData: action.payload
                    }
                }
            })
            .addCase(getMultipleUserDataByIdAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    userData: {
                        ...state.userData,
                        ...action.payload
                    }
                }
            })
            .addCase(setPartnerVideoAction.fulfilled, (state, action: PayloadAction<any>) => {
                state.callData.partnerVideo = action.payload
            })
            .addCase(setCallAcceptedAction.fulfilled, (state, action: PayloadAction<any>) => {
                state.callData.callAccepted = action.payload
            })
            .addCase(unfollowUserAction.fulfilled, (state, action: PayloadAction<any>) => {
                state.userPageData.isFollowed = false
            })
            .addCase(followUserAction.fulfilled, (state, action: PayloadAction<any>) => {
                state.userPageData.isFollowed = true
            })
            .addCase(setMyVideoAction.fulfilled, (state, action: PayloadAction<any>) => {
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