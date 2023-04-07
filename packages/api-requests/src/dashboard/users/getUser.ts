import AxiosInstance from '../../lib/AxiosInstance';

interface GetUserParams {
    _id?: string;
    username?: string;
    fields?: string[];
}

const getUser = async ({ _id, username, fields }: GetUserParams) => {
    const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';

    return await AxiosInstance.get(
        `/api/admin/users/getUser?${_id ? `&_id=${_id}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`,
    );
};

export default getUser;