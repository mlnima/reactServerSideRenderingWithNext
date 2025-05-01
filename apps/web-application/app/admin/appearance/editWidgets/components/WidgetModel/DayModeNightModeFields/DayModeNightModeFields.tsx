'use client';

import React, { ChangeEventHandler } from 'react';
import MonacoEditor from '@components/textEditors/MonacoEditor';

interface IProps {
  dayNightModeData: string;
  dayNightModeDefault: string;
  onChangeHandler: any;
}

const DayModeNightModeFields = (
  {
    dayNightModeData,
    dayNightModeDefault,
    onChangeHandler,
  }: IProps) => {
  return (
    <>
      <div className={'widgetSection'}>
        <p>Default Mode:</p>
        <select
          name={'dayNightModeDefault'}
          onChange={onChangeHandler as ChangeEventHandler<HTMLSelectElement>}
          className={'primarySelect'}
          value={dayNightModeDefault}
        >
          <option value="">Select</option>
          <option value={'night'}>Night</option>
          <option value={'day'}>Day</option>
        </select>
      </div>
      <div className={'monaco-editor-section'}>
        <p>DayModeNightMode Data:</p>
        <MonacoEditor
          language={'scss'}
          name={'dayNightModeData'}
          defaultValue={dayNightModeData || ''}
          value={dayNightModeData}
          className={'customStylesTextarea'}
          onParentChangeHandler={onChangeHandler}
        />
      </div>
    </>
  );
};

export default DayModeNightModeFields;