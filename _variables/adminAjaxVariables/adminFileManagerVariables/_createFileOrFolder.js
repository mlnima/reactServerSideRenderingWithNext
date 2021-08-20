import axios from 'axios'

const _createFileOrFolder = async (data) =>{
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/fileManager/create', body)
}

export default _createFileOrFolder