import axios from 'axios'

export const getUsersList = async () => {
    let body = {
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getUsersList', body)
}

export const getUserData = async (_id,username) => {
    const body = {
        username,
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getUserData', body)
}

// export const resetPassword = async (oldPass, newPass, newPass2) => {
//     let body = {
//         oldPass,
//         newPass,
//         newPass2,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/resetPassword', body)
// }

//


// export const updateUserData = async (data) => {
//     const body = {
//         data,
//         token: localStorage.wt
//     }
//
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/updateUserData', body)
// }

// export const newAPIKey = async () => {
//     const body = {
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/users/newAPIKey', body)
// }


// export const registerUser = async data => {
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/register', data)
// }

// export const getSignedInUserData = async (fields) =>{
//     if (localStorage.wt) {
//              return await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt,fields})
//     }
// }

// export const login = async data => {
//     let body = {
//         ...data
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/login', body)
// }

// export const getUsersListAsAdmin = async (id, token) => {
//
//     const body = {
//         id,
//         token: localStorage.wt
//     };
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/users/getUsersList', body)
//
// }