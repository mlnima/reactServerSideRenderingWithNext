import AxiosInstance from "../../lib/AxiosInstance";

interface GetPrivateMessagesParams {
    senderId: string,
    receiverId: string,
    amount?: number,
    skip?: number
}

const getPrivateMessages = async ({senderId, receiverId, amount,skip}: GetPrivateMessagesParams): Promise<void> => {

    const token = localStorage.getItem("wt");

    return await AxiosInstance.get(`/api/v1/users/getPrivateMessages`, {
        params: {
            senderId,
            receiverId,
            amount,
            skip
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default getPrivateMessages;


// import AxiosInstance from "../../lib/AxiosInstance";
//
// interface SendPrivateMessageParams {
//     senderId: string;
//     receiverId: string;
// }
//
// const getPrivateMessages = async (senderId, receiverId): Promise<void> => {
//     return await AxiosInstance.post(`/api/v1/users/sendPrivateMessage`, {
//         senderId,
//         receiverId,
//         token: localStorage.wt
//     })
// }
//
// export default getPrivateMessages;