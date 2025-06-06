import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  loginRegisterFormPopup: false,
  userConfigMenu: false,
  sidebar: false,
  loading: false,
  adminMode: false,
  backgroundFilter: false,
  useSecondaryModeColors: false,
  alert: {
    active: false,
    type: null,
    message: '',
    actionFunctions: null,
  },
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setSidebarStatus: (state, action: PayloadAction<any>) => {
      state.sidebar = action.payload;
    },
    loginRegisterForm: (state, action: PayloadAction<any>) => {
      state.loginRegisterFormPopup = action.payload;
      state.backgroundFilter = !!action.payload;
    },
    setUseSecondaryModeColors: (state, action: PayloadAction<any>) => {
      state.useSecondaryModeColors = action.payload;
    },
    setUserConfigMenu: (state, action: PayloadAction<any>) => {
      state.userConfigMenu = action.payload;
      state.backgroundFilter = action.payload;
    },
    setAdminMode: (state, action: PayloadAction<any>) => {
      state.adminMode = action.payload;
    },
    setBackgroundFilter: (state, action: PayloadAction<any>) => {

      state.backgroundFilter = action.payload;
    },
    loading: (state, action: PayloadAction<any>) => {

      if (state.loading !== action.payload) {
        return {
          ...state,
          loading: action.payload,
        };
      }
    },
    setLoading: (state, action: PayloadAction<any>) => {

      if (state.loading !== action.payload) {
        return {
          ...state,
          loading: action.payload,
        };
      }
    },
    setLoadingTimeOut: (state, action: PayloadAction<any>) => {
      if (state.loading !== action.payload) {
        state.loading = true;
        setTimeout(() => {
          state.loading = false;
        }, action.payload || 3000);
      }
    },
    setAlert: (state, action: PayloadAction<any>) => {
      state.alert = {
        ...action.payload,
        active: true,
      };
    },

    closeAlert: (state, action: PayloadAction<null>) => {
      // @ts-expect-error:its fine
      state.alert = {
        active: false,
        type: null,
        message: '',
      };
    },
  },
});

export const {
  loginRegisterForm,
  setUserConfigMenu,
  loading,
  setLoading,
  setUseSecondaryModeColors,
  setLoadingTimeOut,
  setSidebarStatus,
  setBackgroundFilter,
  setAdminMode,
  setAlert,
  closeAlert,
} = globalStateSlice.actions;

export const globalStateReducer = (state: RootState) => state?.globalState || null;

export default globalStateSlice.reducer;

