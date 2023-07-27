import {createAsyncThunk} from "@reduxjs/toolkit";
import {commonAPIRequestGetSignedInUserData} from "api-requests";

export const getSpecificUserDataAction = createAsyncThunk(
    'user/getSpecificUserDataAction',
    async ({fields}: { fields: string[] }, thunkAPI) => {
        if (localStorage.wt) {
            return await commonAPIRequestGetSignedInUserData(fields).then(res => {
                return res.data?.userData
            }).catch((err) => {
                // localStorage.removeItem('wt')
            })
        } else {
            // thunkAPI.dispatch(setAlert({message: 'You Need To Login', type: 'error'}))
        }
    }
)