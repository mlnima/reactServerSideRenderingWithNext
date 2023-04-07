import AxiosInstance from "../../lib/AxiosInstance";

const getUsers = async (usersList)=>{
    const userListQuery = usersList.map((user)=>`_id=${user._id}`).join('&');
    return await AxiosInstance.get(`/api/v1/users/getUsers?${userListQuery}&token=${localStorage.wt}`)
}

export default getUsers;