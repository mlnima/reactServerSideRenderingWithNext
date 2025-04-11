'use client';
import { convertVariableNameToName } from '@repo/utils';
import { ChangeEvent } from 'react';
import { IPost } from '@repo/typescript-types';

interface PropTypes {
  onChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  name: 'videoScriptCode';
  post: IPost;
}

const TextAreaComponent = ({ name, onChangeHandler, post }: PropTypes) => {

  return (
    <div className="post-information-section">
      <div className="title">
        <p>{convertVariableNameToName(name)}</p>
      </div>
      <div className="editor">
          <textarea
            className="primaryInput"
            name={name}
            value={post[name] || ''}
            onChange={e => onChangeHandler(e)}
          />
      </div>
    </div>
  );
};

export default TextAreaComponent;