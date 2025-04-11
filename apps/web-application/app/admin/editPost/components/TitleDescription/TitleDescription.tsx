'use client';

import React from 'react';
import { useAppSelector } from '@storeDashboard/hooks';
import TextEditors from '@components/textEditors/TextEditors';
import { IPost } from '@repo/typescript-types';
import './TitleDescription.scss'

interface TitleDescriptionProps {
  onTranslatedInputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChangeHandler: (data: string) => void;
  post:IPost | null
}

const TitleDescription = ({ onTranslatedInputChangeHandler, onDescriptionChangeHandler,post }: TitleDescriptionProps) => {

  const activeEditingLanguage = useAppSelector(({ posts }) => posts.activeEditingLanguage);

  const allowsEditorToUse = post?.postType === 'learn'
    ? ['ReactPage', 'Monaco', 'SunEditor']
    : post?.postType === 'video'
      ? ['Monaco', 'SunEditor', 'ReactQuillEditor']
      : ['Monaco', 'SunEditor', 'ReactQuillEditor', 'ReactPage'];

  const openEditorOnLoad = post?.postType === 'learn'
    ? 'Monaco'
    : post?.postType === 'video'
      ? 'Monaco'
      : 'SunEditor';

  return (
    <div className='TitleDescription'>
      <input
        type="text"
        name='title'
        value={(activeEditingLanguage === 'default' ? post?.title : post?.translations?.[activeEditingLanguage]?.title) || ''}
        className='primaryInput'
        placeholder='Enter The TextInput Here'
        onChange={onTranslatedInputChangeHandler}
      />
      <TextEditors
        value={activeEditingLanguage === 'default' ? post?.description : post?.translations?.[activeEditingLanguage]?.description || {}}
        use={allowsEditorToUse}
        openWith={openEditorOnLoad}
        language={'html'}
        onChangeHandler={onDescriptionChangeHandler}
        width={'100%'}
        height={'50vh'}
      />
    </div>
  );
};

export default TitleDescription;
