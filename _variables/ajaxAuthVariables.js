import axios from 'axios'

export const getUsersList = async ()=>{
    let body = {
        token:localStorage.wt
    }
    return await axios.post('http://localhost:3000/api/v1/users/getUsersList',body)
}
export const getUsersListAsAdmin = async (id)=>{
    const body = {
        id,
        token: localStorage.wt
    };
    return await axios.post('http://localhost:3000/api/v1/users/getUsersListAsAdmin',body)
}