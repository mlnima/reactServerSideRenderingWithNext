import axios from "axios";

const _fixMetaImage = async (_id) => {
    const body = {
        _id,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/posts/fixMetaImage`, body)
};

export default _fixMetaImage