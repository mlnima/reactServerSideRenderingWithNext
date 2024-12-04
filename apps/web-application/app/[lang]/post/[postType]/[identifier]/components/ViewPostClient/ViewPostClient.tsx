'use client';
import { FC, useEffect } from 'react';
import { clientAPIRequestViewPost } from '@repo/api-requests';

interface IProps {
    _id: string;
}

const ViewPostClient: FC<IProps> = ({ _id }) => {
    useEffect(() => {
        if (_id) {
            clientAPIRequestViewPost(_id);
        }
    }, [_id]);

    return null;
};
export default ViewPostClient;
