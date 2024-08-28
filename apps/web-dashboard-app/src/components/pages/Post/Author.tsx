// @ts-nocheck
import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@store/hooks';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import { getUserSuggestionList } from '@repo/api-requests';
import AsyncSelect from 'react-select/async';
import { editPostAction } from '@store/reducers/postsReducer';
import { reactSelectPrimaryTheme } from '@repo/data-structures';

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
    const author = useSelector(({ posts }: DashboardStore) => posts.post?.author);

    const onLoadOptionsHandler = async (input: string) => {
        if (!input) return;
        const suggestionList = await getUserSuggestionList(typeof input == 'string' ? input : '');
        if (suggestionList.data?.users?.length) {
            const reducedResult = suggestionList.data.users.reduce((final: [], current: {}) => {
                final = [...final, { value: current._id, label: current.username }];
                return final;
            }, []);
            return reducedResult;
        } else {
            return [];
        }
    };

    const onSelectHandler = (selected: SelectOption[] | null) => {
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
                onChange={val => onSelectHandler(val as SelectOption[])}
                loadOptions={onLoadOptionsHandler}
                value={
                    author
                        ? {
                              value: author._id,
                              label: author.username,
                          }
                        : null
                }
                styles={reactSelectPrimaryTheme}
            />
        </Style>
    );
};
export default Author;
