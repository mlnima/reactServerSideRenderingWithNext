'use client';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@storeDashboard/hooks';
import { getMetasAction, getPostsAction } from '@storeDashboard/reducers/postsReducer';
import { getUsersAction } from '@storeDashboard/reducers/usersReducer';
import { getCommentsAction } from '@storeDashboard/reducers/commentsReducer';
import { getFormsAction } from '@storeDashboard/reducers/formsReducer';
import { getPagesAction } from '@storeDashboard/reducers/pagesReducer';
import { useSelector } from 'react-redux';
import TableControls from './components/TableControls/TableControls';
import TableHeader from './components/TableHeader/TableHeader';
import TableBody from './components/TableBody/TableBody';
import { getChatroomsAction } from '@storeDashboard/reducers/chatroomsReducer';
import tableItemProperties from './components/tableBodyItemProperties';
import { useSearchParams } from 'next/navigation';
import {DashboardStore} from '@repo/typescript-types';

import { createSelector } from '@reduxjs/toolkit';

const Style = styled.div`
    .asset-page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

interface PropTypes {
}

const Assets: FC<PropTypes> = () => {

  const searchParams = useSearchParams();
  const [tableItemsType, setTableItemsType] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const assetsType = searchParams.get('assetsType');
  const status = searchParams.get('status');

  const selectAssetPageData = createSelector(
    (state :DashboardStore) => state.posts,
    (state:DashboardStore) => state.users,
    (state:DashboardStore) => state.comments,
    (state:DashboardStore) => state.forms,
    (state:DashboardStore) => state.pages,
    (state:DashboardStore) => state.chatrooms,
    (posts, users, comments, forms, pages, chatrooms) => ({
      totalCount: posts.totalCount || comments.totalCount || users.totalCount || forms.totalCount,
      posts: posts.posts,
      chatrooms: chatrooms.chatrooms,
      metas: posts.metas,
      users: users.users,
      comments: comments.comments,
      forms: forms.forms,
      pages: pages.pages,
    }),
  );

  const assetPageData = useSelector(selectAssetPageData);

  const getData = () => {
    const queries = {
      metaId: searchParams.get('metaId'),
      keyword: searchParams.get('keyword'),
      status: searchParams.get('status'),
      postType: searchParams.get('postType'),
      metaType: searchParams.get('metaType'),
      page: searchParams.get('page'),
      size: searchParams.get('size'),
      sort: searchParams.get('sort'),
      role: searchParams.get('role'),
    };

    if (assetsType === 'posts') {
      dispatch(getPostsAction(queries));
    } else if (assetsType === 'users') {
      dispatch(getUsersAction(queries));
    } else if (assetsType === 'metas') {
      dispatch(getMetasAction(queries));
    } else if (assetsType === 'comments') {
      dispatch(getCommentsAction(queries));
    } else if (assetsType === 'forms') {
      dispatch(getFormsAction(queries));
    } else if (assetsType === 'pages') {
      dispatch(getPagesAction(queries));
    } else if (assetsType === 'chatrooms') {
      dispatch(getChatroomsAction(queries));
    }
  };

  useEffect(() => {
    getData();
    const hasStatus = status && status !== 'all';
    const headerItems = assetsType ? tableItemProperties?.[assetsType] : [];
    const listOfFields = hasStatus ? headerItems.filter((item: string) => item !== 'status') : headerItems;
    setTableItemsType(listOfFields);
  }, [searchParams]);


  const selectAllAssetsHandler = (e: React.ChangeEvent<any>)=>{
    if (e.target.checked && assetsType && assetPageData.hasOwnProperty(assetsType)) {

      setSelectedItems(assetPageData[assetsType].map((i: { _id: string }) => i._id));
      return;
    }
    setSelectedItems([]);
  }


  return (
    <Style>
      <div className="asset-page">
        <TableControls
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          totalCount={assetPageData.totalCount}
        />
        <TableHeader
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          assetPageData={assetPageData}
          tableItemsType={tableItemsType}
          selectAllAssetsHandler={selectAllAssetsHandler}
        />
        <TableBody
          assetPageData={assetPageData}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          tableItemsType={tableItemsType}
        />
      </div>
    </Style>
  );
};

export default Assets;