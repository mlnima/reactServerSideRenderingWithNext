import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { loginAction } from '@store/reducers/userReducers/loginAction';
import { autoLoginAction } from '@store/reducers/userReducers/autoLoginAction';
import { deleteCookie } from '@lib/actions/cookieTools';

const initialUserData = {
  _id: '',
  username: '',
  profileImage: {
    filePath: '',
  },
  draftPost: {},
  role: 'subscriber',
};

const initialState = {
  userData: initialUserData,
  userRatingData: {},
  loggedIn: false,
  userPageData: {},
  privateMessages: [],
  activeConversation: {
    messages: [],
    users: [],
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
    userStreamData: null,
  },
  socketId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        userData: action.payload,
        loggedIn: true,
      };
    },
    replaceUserProfileImage: (state, action: PayloadAction<any>) => {
      state.userData.profileImage.filePath = action.payload;
    },
    removeUserDraftPost: (state, action: PayloadAction<any>) => {
      state.userData.draftPost = '';
    },
    setUserPageData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        userPageData: action.payload,
      };
    },
    updateUserDataField: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    },
    getSpecificUserData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload.userData,
        },
      };
    },
    userLogout: (state) => {
      deleteCookie('session').then(()=>console.log('logged out'))
      return {
        ...state,
        userData: initialUserData,
        loggedIn: false,
      };
    },
    dispatchSocketId: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        socketId: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          userData: action.payload,
          loggedIn: true,
        };
      })
      .addCase(autoLoginAction.fulfilled, (state, action: PayloadAction<any>) => {
        return {
          ...state,
          userData: action.payload,
          loggedIn: true,
        };
      });
    // .addCase(getSpecificUserDataAction.fulfilled, (state, action: PayloadAction<any>) => {
    //     return {
    //         ...state,
    //         userData: {
    //             ...state.userData,
    //             ...action.payload
    //         },
    //         loggedIn: true
    //     }
    // })
    // .addCase(getUserPageDataAction.fulfilled, (state, action: PayloadAction<any>) => {
    //     if (action.payload) {
    //         return {
    //             ...state,
    //             userPageData: action.payload
    //         }
    //     }
    // })
    // .addCase(getMultipleUserDataByIdAction.fulfilled, (state, action: PayloadAction<any>) => {
    //     return {
    //         ...state,
    //         userData: {
    //             ...state.userData,
    //             ...action.payload
    //         }
    //     }
    // })

  },
});

export const {
  userLogout,
  setUserData,
  removeUserDraftPost,
  replaceUserProfileImage,
  dispatchSocketId,
} = userSlice.actions;

export const userReducer = (state: RootState) => state?.user || null;

export default userSlice.reducer;
