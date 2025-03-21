'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { convertVariableNameToName } from '@repo/utils';
import { DashboardStore } from '@repo/typescript-types';
import { FC } from 'react';

interface PropTypes {
  name: 'likes' | 'disLikes' | 'views';
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rendering: boolean;
}

const RatingAndViews: FC<PropTypes> = ({ name, onChangeHandler, rendering }) => {
  const post = useSelector((state: DashboardStore) => state.posts.post);

  if (!rendering || !post?.[name]) return null;

  return (
    <div className="post-information-section">
      <div className="title">
        <p>{convertVariableNameToName(name)}</p>
      </div>
      <div className="editor">
        <input
          type={'number'}
          className="primaryInput"
          name={name}
          value={post?.[name] || 0}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default RatingAndViews;
