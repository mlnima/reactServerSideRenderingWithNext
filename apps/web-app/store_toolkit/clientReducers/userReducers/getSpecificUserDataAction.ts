//getSpecificUserDataAction


import {createAsyncThunk} from "@reduxjs/toolkit";
import getSignedInUserData from "api-requests/src/common/users/getSignedInUserData";

export const getSpecificUserDataAction = createAsyncThunk(
    'user/getSpecificUserDataAction',
    async ({fields}: { fields: string[] }, thunkAPI) => {
        if (localStorage.wt) {
            return await getSignedInUserData(fields).then(res => {
                return res.data?.userData
            }).catch((err) => {
                localStorage.removeItem('wt')
            })
        } else {
            // thunkAPI.dispatch(setAlert({message: 'You Need To Login', type: 'error'}))
        }
    }
)