import axios from "axios";

// axios.defaults.headers = {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//     'Expires': '0',
// };


const _getMultipleWidgets = async (token) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/widgets/getMultipleWidgets?token=${token}`)
}

export default _getMultipleWidgets