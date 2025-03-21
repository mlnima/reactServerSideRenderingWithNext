'use client';
import { convertVariableNameToName } from '@repo/utils';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import { ChangeEvent } from 'react';

let StyledTextarea = styled.textarea`
    outline: none;
    padding: 3px 5px;
    height: 30px;
    width: 90%;
`;

interface PropTypes {
  onChangeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rendering: boolean;
  name: 'source' | 'mainThumbnail' | 'videoUrl' | 'videoEmbedCode' | 'redirectLink' | 'downloadLink' | 'videoTrailerUrl';
}

const TextInput = ({ onChangeHandler, rendering, name }: PropTypes) => {
  const post = useSelector(({ posts }: DashboardStore) => posts.post);

  if (!rendering || !post) return null;

  return (
    <div className="post-information-section">
      <div className="title">
        <p>{convertVariableNameToName(name)}</p>
      </div>
      <div className="editor">
        <StyledTextarea
          className={'primaryInput'}
          name={name}
          value={post?.[name] || ''}
          onChange={e => onChangeHandler(e)}
        />
      </div>
    </div>
  );
};

export default TextInput;