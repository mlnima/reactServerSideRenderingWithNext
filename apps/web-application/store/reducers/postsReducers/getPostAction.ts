// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {clientAPIRequestGetPost} from "@repo/api-requests";

interface GetPostAction {
    identifier: string,
    options: {
        page: string
        setHeadData?: boolean
    },
    context: any
}




// export default getPostAction