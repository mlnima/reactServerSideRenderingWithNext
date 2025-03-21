'use client';
import { convertVariableNameToName } from '@repo/utils';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import { ChangeEvent } from 'react';

interface PropTypes {
  onChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rendering: boolean;
  name: 'videoScriptCode';
}

const TextAreaComponent = ({ rendering, name, onChangeHandler }: PropTypes) => {
  const post = useSelector(({ posts }: DashboardStore) => posts.post);


  if (!rendering || !post) return null;

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