'use client';

import React, { FC } from 'react';
import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import { reactSelectPrimaryTheme } from '@repo/data-structures';
import { IPost, User } from '@repo/typescript-types';
import getUsersSuggestionList from '@lib/actions/database/users/getUsersSuggestionList';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch } from '@store/hooks';

const Style = styled.div`
    width: 100%;
`;

interface PropTypes {
  author?: User,
  setPost:React.Dispatch<React.SetStateAction<IPost | null>>
}

interface SelectOption {
  value: string;
  label: string;
}

const Author: FC<PropTypes> = ({ author, setPost }) => {
  const dispatch = useAppDispatch();
  const onLoadOptionsHandler = async (input: string) => {
    if (!input) return;

    const {success, error, data, message} = await getUsersSuggestionList({keyword:input})

    if (!success) {
      dispatch(setAlert({ message, type: 'error', active: true,error }));
      return;
    }

    if (data?.users && data?.users?.length > 0) {
      return data.users.reduce((final: SelectOption[], current: { _id: string, username: string }) => {
        final = [...final, { value: current._id, label: current.username }];
        return final;
      }, []);
    } else {
      return [];
    }
  };

  const onSelectHandler = (selected: SelectOption | null) => {
    if (!selected) return;

    setPost((prevState) => ({
      ...prevState,
      author: {
        _id: selected.value,
        username: selected.label,
      },
    }));
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
