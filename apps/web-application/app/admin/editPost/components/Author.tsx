
'use client';

import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@storeDashboard/hooks';
import { getUserSuggestionList } from '@repo/api-requests';
import AsyncSelect from 'react-select/async';
import { editPostAction } from '@storeDashboard/reducers/postsReducer';
import { reactSelectPrimaryTheme } from '@repo/data-structures';
import { useAppSelector } from '@storeDashboard/hooks';

const Style = styled.div`
  width: 100%;
`;

interface PropTypes {}

interface SelectOption {
  value: string;
  label: string;
}

const Author: FC<PropTypes> = ({}) => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(({ posts }) => posts.post?.author);

  const onLoadOptionsHandler = async (input: string) => {
    if (!input) return;

    const suggestionList = await getUserSuggestionList(input);
    if (suggestionList.data?.users && suggestionList.data?.users?.length > 0) {
      return suggestionList.data.users.reduce((final: SelectOption[], current: { _id: string, username: string }) => {
        final = [...final, { value: current._id, label: current.username }];
        return final;
      }, []);
    } else {
      return [];
    }
  };

  const onSelectHandler = (selected: SelectOption | null) => {
    if (!selected) return;
    dispatch(
      editPostAction({
        author: {
          _id: selected.value,
          username: selected.label,
        },
      }),
    );
  };

  return (
    <Style>
      <AsyncSelect
        name={'author'}
        onChange={val => onSelectHandler(val as SelectOption)}
        loadOptions={onLoadOptionsHandler}
        value={author ? { value: author._id, label: author.username } : null}
        styles={reactSelectPrimaryTheme}
      />
    </Style>
  );
};

export default Author;
