import axios from "axios";

export const getUserPreviewData = async (domainName,username,_id) => {
    const body = {
        username,
        _id
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
export const sendMessage = async (_id,message) => {
    const body = {
        _id,
        message,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/sendMessage', body)
}

export const conversation = async (_id,message) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/conversation', body)
}

export const getConversations = async (_id,message) => {
    const body = {
        _id,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/getConversations', body)
}

export const getConversation = async (_id,loadAmount) => {
    const body = {
        _id,
        loadAmount,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/getConversation', body)
}

export const messageToConversation = async (conversationId,messageBody) => {
    const body = {
        conversationId,
        messageBody,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/users/messageToConversation', body)
}

export const getMultipleUserDataById = async (usersList) => {
    const body = {
        usersList
    }
    return await axios.post(window.location.origin + '/api/v1/users/getMultipleUserDataById', body)
}


