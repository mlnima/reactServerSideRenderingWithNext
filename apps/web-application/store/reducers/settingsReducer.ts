import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface SettingsStateRaw {
    initialSettings: {
        postCardsSettings: {},
        membershipSettings: {
            membership:boolean,
            usersCanMessageEachOther:boolean
        },
        layoutSettings: {},
        headDataSettings: {}
    }
}

const initialState = {
    initialSettings: {
        postCardsSettings: {},
        membershipSettings: {
            membership:false,
            usersCanMessageEachOther:false,
            allowUserToPost: false,
            anyoneCanRegister: false,
            usersCanFollowEachOther: false,
            usersCanCommentOnThePosts: false,
            allowedPostTypeUserCanCreate:[],
            usersPersonalEmailAddress: false,
        },
        layoutSettings: {
            languagesSwitcherInUserConfigMenu:false,
            themeColorsSwitcherInUserConfigMenu:false,
            defaultTheme: 'dark',
            primaryModeColors:'',
            secondaryModeColors:'',
            logoUrl:'',
            logoWidth:150,
            logoHeight:50
        },
        headDataSettings: {}
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setInitialSettings: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                initialSettings: action.payload
            }
        },
    }
})

export const {setInitialSettings} = settingsSlice.actions

export const settingsReducer = (state: RootState) => state?.settings || null

export default settingsSlice.reducer

