import axios from 'axios'

export default async (id) =>{
    const body = {
        id,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/users/deleteUser', body)
}