import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  initialSettings: {
    postCardsSettings: {},
    membershipSettings: {
      membership: false,
      usersCanMessageEachOther: false,
      allowUserToPost: false,
      anyoneCanRegister: false,
      usersCanFollowEachOther: false,
      usersCanCommentOnThePosts: false,
      allowedPostTypeUserCanCreate: [],
      usersPersonalEmailAddress: false,
      postByUserSettings: {},
    },
    layoutSettings: {
      languagesSwitcherInUserConfigMenu: false,
      themeColorsSwitcherInUserConfigMenu: false,
      defaultTheme: 'dark',
      primaryModeColors: '',
      secondaryModeColors: '',
      logoUrl: '',
      logoWidth: 150,
      logoHeight: 50,
    },
    headDataSettings: {
      customHeadTags: '',
      customScripts: '',
    },
    contentSettings: {
      contentPerPage: 0,
    },
  },
  ugcSettings: {},
  pageSettings: {},
  design: {},
  identity: {},
  membershipSettings: {
    allowedPostTypesByUser: [],
  },
  eCommerce: {},
  ip: '',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setInitialSettings: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        initialSettings: action.payload,
      };
    },
  },
});

export const { setInitialSettings } = settingsSlice.actions;

export const settingsReducer = (state: RootState) => state?.settings || null;

export default settingsSlice.reducer;

