import axios from "axios";

export const getUserPreviewData = async (domainName,username) => {
    const body = {
        username
    }
    return await axios.post(domainName + '/api/v1/users/getUserPreviewData', body)
}

export const followUser = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/followUser', body)
}

export const unFollowUser = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/unFollowUser', body)
}


export const sendFriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/sendFriendRequest', body)
}
export const acceptFriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/acceptFriendRequest', body)
}
export const unfriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/unfriendRequest', body)
}
export const cancelFriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/cancelFriendRequest', body)
}

export const getMultipleUserDataById = async (usersList) => {
    const body = {
        usersList
    }
    return await axios.post(window.location.origin + '/api/v1/users/getMultipleUserDataById', body)
}