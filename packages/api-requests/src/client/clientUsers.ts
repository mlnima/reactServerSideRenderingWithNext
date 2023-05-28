import AxiosInstance from "../lib/AxiosInstance";

export const clientAPIRequestDeleteChatroomMessage = async (chatroomId:string,messageId:string)=>{
    return await AxiosInstance.delete(`/api/admin/chatrooms/deleteChatroomMessage?chatroomId=${chatroomId}&messageId=${messageId}&token=${localStorage.wt}`)
}

export const clientAPIRequestDeleteConversation = async (_id:string)=>{
    return await AxiosInstance.post(`/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`)
}

export const clientAPIRequestFollowUser = async (_id:string)=>{
    return await AxiosInstance.patch(`/api/v1/users/followUser`,{_id, token: localStorage.wt})
}

export const clientAPIRequestGetConversations = async (_id:string)=>{
    return await AxiosInstance.post(`/api/v1/users/getConversations`, {_id,token: localStorage.wt})
}


//** did not find usage possibly socket server handle it
// export const getPrivateMessages = async ({senderId, receiverId, amount,skip}: {
//     senderId: string,
//     receiverId: string,
//     amount?: number,
//     skip?: number
// }): Promise<void> => {
//
//     const token = localStorage.getItem("wt");
//
//     return await AxiosInstance.get(`/api/v1/users/getPrivateMessages`, {
//         params: {
//             senderId,
//             receiverId,
//             amount,
//             skip
//         },
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

//** did not find usage possibly socket server handle it
// export const getStartConversation = async (_id)=>{
//     return await AxiosInstance.post(`/api/v1/users/getStartConversation`, {_id,token: localStorage.wt})
// }
//
// export const getUser = async ({ _id, username, fields }: {
//     _id?: string;
//     username?: string;
//     fields?: string[];
// }) => {
//     const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';
//
//     return await AxiosInstance.get(
//         `/api/v1/users/getUser?${_id ? `&_id=${_id}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`,
//     );
// };


export const clientAPIRequestGetUserPageData = async ({ userWhoRequestIt, username, fields }: {
    userWhoRequestIt?: string;
    username?: string;
    fields?: string[];
}) => {
    const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';

    return await AxiosInstance.get(
        `/api/v1/users/getUserPageData?${userWhoRequestIt ? `userWhoRequestIt=${userWhoRequestIt}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`,
    );
};


export const clientAPIRequestGetUsers = async (usersList: { _id:string }[])=>{
    const userListQuery = usersList.map((user)=>`_id=${user._id}`).join('&');
    return await AxiosInstance.get(`/api/v1/users/getUsers?${userListQuery}&token=${localStorage.wt}`)
}

export const clientAPIRequestRegisterUser = async (data:{})=>{
    return await AxiosInstance.post(`/api/v1/users/register`,data)
}

export const clientAPIRequestResetPassword = async (data:{})=>{
    return await AxiosInstance.post(`/api/v1/users/resetPassword`,{data, token: localStorage.wt})
}


//** it is unused and should be removed
export const clientAPIRequestSendPrivateMessage = async (senderId:string, receiverId:string, content:{}): Promise<void> => {
    return await AxiosInstance.post(`/api/v1/users/sendPrivateMessage`, {
        senderId,
        receiverId,
        content,
        token: localStorage.wt
    })
}

export const clientAPIRequestUnFollowUser = async (_id:string)=>{
    return await AxiosInstance.patch(`/api/v1/users/unFollowUser`,{_id, token: localStorage.wt})
}