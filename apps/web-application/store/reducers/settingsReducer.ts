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

const initialState: SettingsStateRaw = {
    initialSettings: {
        postCardsSettings: {},
        membershipSettings: {
            membership:false,
            usersCanMessageEachOther:false
        },
        layoutSettings: {},
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

