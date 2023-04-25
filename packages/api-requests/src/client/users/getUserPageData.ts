//getUserPageData

import AxiosInstance from '../../lib/AxiosInstance';

interface GetUserParams {
    userWhoRequestIt?: string;
    username?: string;
    fields?: string[];
}

const getUserPageData = async ({ userWhoRequestIt, username, fields }: GetUserParams) => {
    const fieldsQuery = fields ? `&fields=${fields.join(',')}` : '';

    return await AxiosInstance.get(
        `/api/v1/users/getUserPageData?${userWhoRequestIt ? `userWhoRequestIt=${userWhoRequestIt}` : ''}${username ? `&username=${username}` : ''}${fieldsQuery}&token=${localStorage.wt}`,
    );
};

export default getUserPageData;