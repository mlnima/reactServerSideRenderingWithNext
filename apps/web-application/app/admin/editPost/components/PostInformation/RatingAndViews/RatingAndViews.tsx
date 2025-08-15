import React from 'react';
import { convertVariableNameToName } from '@repo/utils/dist/src';
import { FC } from 'react';
import { IPost } from '@repo/typescript-types';

interface PropTypes {
  name: 'likes' | 'disLikes' | 'views';
  onChangeHandler: (e: React.ChangeEvent<HTMLElement>) => void;
  post: IPost;
}

const RatingAndViews: FC<PropTypes> = ({ name, onChangeHandler, post }) => {
  return (
    <div className="post-information-section">
      <div className="title">
        <p>{convertVariableNameToName(name)}</p>
      </div>
      <div className="editor">
        <input type={'number'} className="primaryInput" name={name} value={post?.[name] || 0} onChange={onChangeHandler} />
      </div>
    </div>
  );
};

export default RatingAndViews;
