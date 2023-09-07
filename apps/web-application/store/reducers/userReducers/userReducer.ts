import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {loginAction} from "@store/reducers/userReducers/loginAction";
import {autoLoginAction} from "@store/reducers/userReducers/autoLoginAction";
import {getUserPageDataAction} from "@store/reducers/userReducers/getUserPageDataAction";
import {getMultipleUserDataByIdAction} from "@store/reducers/userReducers/getMultipleUserDataByIdAction";
import {getSpecificUserDataAction} from "@store/reducers/userReducers/getSpecificUserDataAction";
import {unfollowUserAction} from "@store/reducers/userReducers/unfollowUserAction";
import {followUserAction} from "@store/reducers/userReducers/followUserAction";

const initialUserData = {
    _id:'',
    username: '',
    profileImage: {
        filePath:''
    },
    draftPost:{},
    socketId:''
}

const initialState = {
    userData: initialUserData,
    userRatingData: {},
    loggedIn: false,
    userPageData: {},
    privateMessages: [],
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
        userLogout: (state) => {
            localStorage.removeItem('wt')
            return {
                ...state,
                userData: initialUserData,
                loggedIn: false
            }
        },
        dispatchSocketId: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                socketId: action.payload,
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
            .addCase(unfollowUserAction.fulfilled, (state) => {
                return{
                    ...state,
                    userPageData:{
                        ...state.userPageData,
                        isFollowed:false
                    }
                }
            })
            .addCase(followUserAction.fulfilled, (state) => {
                return{
                    ...state,
                    userPageData:{
                        ...state.userPageData,
                        isFollowed:true
                    }
                }
            })
    }
});

export const {
    userLogout,
    dispatchSocketId,
} = userSlice.actions;

export const userReducer = (state: RootState) => state?.user || null;

export default userSlice.reducer;
