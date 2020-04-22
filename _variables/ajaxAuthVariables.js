import axios from 'axios'

export const getUsersList = async () => {
    let body = {
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/getUsersList', body)
}

export const getUsersListAsAdmin = async (id, domainName) => {
    console.log(domainName)

    try {
        const body = {
            id,
            token: localStorage.wt
        };
        return await axios.post(domainName + '/api/v1/users/getUsersListAsAdmin', body)
    } catch ( e ) {
        console.log(e)
    }

}


export const getUserData = async (_id, domainName) => {
    const body = {
        _id,
        // token: localStorage ? localStorage.wt : ''
    }

    return await axios.post(domainName + '/api/v1/users/getUserData', body)
}


export const updateUserData = async (data, domainName) => {
    const body = {
        data,
        // token: localStorage ? localStorage.wt : ''
    }

    return await axios.post(domainName + '/api/v1/users/updateUserData', body)
}
export const newAPIKey = async ( domainName) => {
    const body = {
        token: localStorage ? localStorage.wt : ''
    }

    return await axios.post(domainName + '/api/v1/users/newAPIKey', body)
}
