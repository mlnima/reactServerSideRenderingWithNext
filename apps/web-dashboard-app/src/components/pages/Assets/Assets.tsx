import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { getMetasAction, getPostsAction } from '@store/reducers/postsReducer';
import { getUsersAction } from '@store/reducers/usersReducer';
import { getCommentsAction } from '@store/reducers/commentsReducer';
import { getFormsAction } from '@store/reducers/formsReducer';
import { getPagesAction } from '@store/reducers/pagesReducer';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import TableControls from '@components/pages/Assets/TableControls/TableControls';
import TableHeader from '@components/pages/Assets/TableHeader/TableHeader';
import TableBody from '@components/pages/Assets/TableBody/TableBody';
import { getChatroomsAction } from '@store/reducers/chatroomsReducer';
import { searchParamsToUrlQuery, searchParamsToObject } from '@repo/shared-util';
import tableItemProperties from './tableBodyItemProperties';

const Style = styled.div``;

interface PropTypes {}

const Assets: FC<PropTypes> = ({}) => {
    const [currentQuery, setCurrentQuery] = useState<{ [key: string]: string }>({});
    const [tableItemsType, setTableItemsType] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [search, setSearch] = useSearchParams();
    const dispatch = useAppDispatch();

    const assetPageData = useSelector(({ posts, users, comments, forms, pages, chatrooms }: DashboardStore) => {
        return {
            totalCount: posts.totalCount || comments.totalCount || users.totalCount,
            posts: posts.posts,
            chatrooms: chatrooms.chatrooms,
            metas: posts.metas,
            users: users.users,
            comments: comments.comments,
            forms: forms.forms,
            pages: pages.pages,
        };
    });

    const getData = () => {
        const paramsQueries = searchParamsToUrlQuery(currentQuery);
        const assetsType = currentQuery?.assetsType;
        if (assetsType === 'posts') {
            dispatch(getPostsAction(paramsQueries));
        } else if (assetsType === 'users') {
            dispatch(getUsersAction(paramsQueries));
        } else if (assetsType === 'metas') {
            dispatch(getMetasAction(paramsQueries));
        } else if (assetsType === 'comments') {
            dispatch(getCommentsAction(paramsQueries));
        } else if (assetsType === 'forms') {
            dispatch(getFormsAction(paramsQueries));
        } else if (assetsType === 'pages') {
            dispatch(getPagesAction(paramsQueries));
        } else if (assetsType === 'chatrooms') {
            dispatch(getChatroomsAction());
        }
    };

    useEffect(() => {
        getData();
        const hasStatus = !!currentQuery?.status && currentQuery?.status !== 'all';
        const headerItems = currentQuery?.assetsType ? tableItemProperties?.[currentQuery?.assetsType as string] : [];
        const listOfFields  = hasStatus ? headerItems.filter((item: string) => item !== 'status') : headerItems
        setTableItemsType(listOfFields)
    }, [currentQuery]);

    useEffect(() => {
        setCurrentQuery(searchParamsToObject(search));
    }, [search]);

    return (
        <Style>
            <TableControls
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                assetPageData={assetPageData}
                currentQuery={currentQuery}
            />
            <TableHeader
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                assetPageData={assetPageData}
                currentQuery={currentQuery}
                tableItemsType={tableItemsType}
            />
            <TableBody
                assetPageData={assetPageData}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                currentQuery={currentQuery}
                tableItemsType={tableItemsType}
            />
        </Style>
    );
};
export default Assets;
