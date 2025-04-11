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
  users: [],
  totalCount: 0,
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
    userLogout: (state) => {
      deleteCookie('session').then(()=>console.log('logged out'))
      return {
        ...state,
        userData: initialUserData,
        loggedIn: false,
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


  },
});

export const {
  userLogout,
  setUserData,
  replaceUserProfileImage,
} = userSlice.actions;

export const userReducer = (state: RootState) => state?.user || null;

export default userSlice.reducer;
