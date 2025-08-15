'use client';
import { convertVariableNameToName } from '@repo/utils/dist/src';
import React, { ChangeEvent, FC } from 'react';
import { IPost } from '@repo/typescript-types';

interface IProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLElement>) => void;
  name: 'source' | 'mainThumbnail' | 'videoUrl' | 'videoEmbedCode' | 'redirectLink' | 'downloadLink' | 'videoTrailerUrl';
  post: IPost;
}

const TextInput: FC<IProps> = ({ onChangeHandler, name, post }) => {
  return (
    <div className="post-information-section">
      <div className="title">
        <p>{convertVariableNameToName(name)}</p>
      </div>
      <div className="editor">
        <textarea className={'primaryInput'} name={name} value={post?.[name] || ''} onChange={(e) => onChangeHandler(e)} />
      </div>
    </div>
  );
};

export default TextInput;
