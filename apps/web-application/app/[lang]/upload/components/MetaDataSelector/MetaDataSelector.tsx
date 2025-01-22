'use client';
import React, { FC, Suspense } from 'react';
import AsyncSelect from 'react-select/async';
import { uniqArrayBy } from '@repo/utils';
import { MetasType, Post } from '@repo/typescript-types';
import './MetaDataSelector.scss';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch } from '@store/hooks';
import { reactSelectPrimaryTheme } from '@repo/data-structures';
import { getMetaSuggestion } from '@lib/database/operations/metas';

interface ComponentPropTypes {
  metaType: MetasType;
  maxLimit: number;
  setEditingPost: React.Dispatch<React.SetStateAction<Post>>;
  postData: Post;
}

interface SelectOption {
  value: string;
  label: string;
}

const MetaDataSelector: FC<ComponentPropTypes> = ({ metaType, setEditingPost, maxLimit, postData }) => {
  const dispatch = useAppDispatch();

  const onSelectHandler = (selected: SelectOption[] | null) => {
    if (!selected) return;

    if (selected?.length > maxLimit) {
      dispatch(
        setAlert({
          message: `Maximum ${metaType} reached`,
          type: 'error',
        }),
      );
      return;
    }

    const convertSelectedMetas = selected.map(selectedMeta => ({
      name: selectedMeta.label,
      _id: selectedMeta.value,
    }));

    setEditingPost(prevState => ({
      ...prevState,
      [metaType]: uniqArrayBy(convertSelectedMetas, '_id'),
    }));
  };

  const onLoadOptionsHandler = async (input: string) => {
    try {
      const suggestionList = await getMetaSuggestion({
        metaType,
        startWith: input,
      });
      if (!suggestionList) {
        return [];
      }
      return suggestionList;
    } catch {
      return [];
    }
  };

  return (
    <div className="metaDataSelector">
      <Suspense fallback={<div>loading..</div>}>
        <AsyncSelect
          name={metaType}
          className={'reactSelectComponent'}
          onChange={val => onSelectHandler(val as SelectOption[])}
          loadOptions={onLoadOptionsHandler}
          isMulti
          value={(postData[metaType] || []).map(
            (meta): SelectOption => ({ value: meta._id, label: meta.name }),
          )}
          styles={reactSelectPrimaryTheme}
        />
      </Suspense>
    </div>
  );
};

export default MetaDataSelector;