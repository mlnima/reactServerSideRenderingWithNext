import React, { FC } from 'react';
import { capitalizeFirstLetter } from '@repo/shared-util';
import './PostsPageInfo.styles.scss';

interface PostsPageInfoPropTypes {
    title?: string;
    description?: string;
}

const PostsPageInfo: FC<PostsPageInfoPropTypes> = ({ title, description }) => {
    if (!title) return null;

    return (
        <div className={'postsPageInfo'}>
            <h1> {capitalizeFirstLetter(title)?.trim()}</h1>
            {description && <p>{description}</p>}
        </div>
    );
};
export default PostsPageInfo;
