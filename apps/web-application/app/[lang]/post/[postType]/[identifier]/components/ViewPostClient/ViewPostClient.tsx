'use client';
import { FC, useEffect } from 'react';
import viewPost from '@lib/actions/database/operations/posts/viewPost';

interface IProps {
    _id: string;
}

const ViewPostClient: FC<IProps> = ({ _id }) => {
    useEffect(() => {
        if (_id) {
             viewPost(_id)
        }
    }, [_id]);

    return null;
};
export default ViewPostClient;
