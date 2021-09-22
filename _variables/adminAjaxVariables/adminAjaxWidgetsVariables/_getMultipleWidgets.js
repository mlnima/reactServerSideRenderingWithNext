import axios from "axios";

const _getMultipleWidgets = async (token) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/widgets/getMultipleWidgets?token=${token}`)
}

export default _getMultipleWidgets