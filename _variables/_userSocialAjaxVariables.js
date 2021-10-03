import axios from "axios";

export const getUserPreviewData = async (username,_id,fields) => {
    const body = {
        username,
        fields,
        _id
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getUserPreviewData', body)
}

export const followUser = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/followUser', body)
}

export const unFollowUser = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/unFollowUser', body)
}


export const sendFriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/sendFriendRequest', body)
}
export const acceptFriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/acceptFriendRequest', body)
}
export const unfriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/unfriendRequest', body)
}
export const cancelFriendRequest = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/cancelFriendRequest', body)
}
export const sendMessage = async (_id,message) => {
    const body = {
        _id,
        message,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/sendMessage', body)
}

export const conversation = async (_id,message) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/conversation', body)
}


export const messageToConversation = async (conversationId,messageBody) => {
    const body = {
        conversationId,
        messageBody,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/messageToConversation', body)
}

export const getMultipleUserDataById = async (usersList) => {
    const body = {
        usersList
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getMultipleUserDataById', body)
}


