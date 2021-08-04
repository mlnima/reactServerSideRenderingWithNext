import axios from 'axios'

export const registerUser = async data => {

    return await axios.post(window.location.origin + '/api/v1/users/register', data)
}


export const getUsersList = async () => {
    let body = {
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/getUsersList', body)
}

export const getSignedInUserData = async (fields) =>{
    if (localStorage.wt) {
             return await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt,fields})
    }
}

export const login = async data => {
    let body = {
        ...data
    }
    return await axios.post(window.location.origin + '/api/v1/users/login', body)
}

export const resetPassword = async (oldPass, newPass, newPass2) => {
    let body = {
        oldPass,
        newPass,
        newPass2,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/resetPassword', body)
}

export const getUsersListAsAdmin = async (id, token) => {

    const body = {
        id,
        token: localStorage.wt

    };
    return await axios.post(window.location.origin + '/api/admin/users/getUsersList', body)

}

export const getUserData = async (_id, domainName,username) => {
    const body = {
        username,
        _id,
        token: localStorage.wt
    }
    return await axios.post(domainName + '/api/v1/users/getUserData', body)
}

export const updateUserData = async (data, domainName) => {
    const body = {
        data,
        token: localStorage.wt
    }

    return await axios.post(domainName + '/api/v1/users/updateUserData', body)
}

export const newAPIKey = async (domainName) => {
    const body = {
        token: localStorage.wt
    }
    return await axios.post(domainName + '/api/admin/users/newAPIKey', body)
}
