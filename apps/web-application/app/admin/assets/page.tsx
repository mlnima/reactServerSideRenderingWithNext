"use client";
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@storeDashboard/hooks';
import { getMetasAction, getPostsAction } from '@storeDashboard/reducers/postsReducer';
import { getUsersAction } from '@storeDashboard/reducers/usersReducer';
import { getCommentsAction } from '@storeDashboard/reducers/commentsReducer';
import { getFormsAction } from '@storeDashboard/reducers/formsReducer';
import { getPagesAction } from '@storeDashboard/reducers/pagesReducer';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import TableControls from './components/TableControls/TableControls';
import TableHeader from './components/TableHeader/TableHeader';
import TableBody from './components/TableBody/TableBody';
import { getChatroomsAction } from '@storeDashboard/reducers/chatroomsReducer';
import { searchParamsToUrlQuery, searchParamsToObject } from '@repo/utils';
import tableItemProperties from './components/tableBodyItemProperties';
import { useSearchParams } from 'next/navigation';

import { createSelector } from '@reduxjs/toolkit';

const Style = styled.div`
  .asset-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

interface PropTypes {}

const Assets: FC<PropTypes> = () => {
  const searchParams = useSearchParams()

  const [currentQuery, setCurrentQuery] = useState<{ [key: string]: string }>({});
  const [tableItemsType, setTableItemsType] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [content, setContent] = useState({
    totalCount: 0,
    content: [],
  })


  // const getContent  = async ()=>{
  //
  //   try {
  //     const contentType = searchParams.get('assetsType');
  //     if (!contentType){
  //       return
  //     }
  //
  //     const queries = {
  //       metaId:searchParams.get('metaId'),
  //       keyword:searchParams.get('keyword'),
  //       status:searchParams.get('status'),
  //       postType:searchParams.get('postType'),
  //       page:searchParams.get('page'),
  //       size:searchParams.get('size'),
  //       sort:searchParams.get('sort')
  //     }
  //
  //     if (contentType === 'posts') {
  //       setContent()
  //     }
  //     // else if (contentType === 'users') {
  //     //   dispatch(getUsersAction(queries));
  //     // } else if (contentType === 'metas') {
  //     //   dispatch(getMetasAction(queries));
  //     // } else if (contentType === 'comments') {
  //     //   dispatch(getCommentsAction(queries));
  //     // } else if (contentType === 'forms') {
  //     //   dispatch(getFormsAction(queries));
  //     // } else if (contentType === 'pages') {
  //     //   dispatch(getPagesAction(currentQuery));
  //     // } else if (contentType === 'chatrooms') {
  //     //   dispatch(getChatroomsAction());
  //     // }
  //
  //
  //
  //   }catch (error){
  //     console.log(`console=> `,error)
  //   }
  //
  // }


  const dispatch = useAppDispatch();

  const selectAssetPageData = createSelector(
    (state: DashboardStore) => state.posts,
    (state: DashboardStore) => state.users,
    (state: DashboardStore) => state.comments,
    (state: DashboardStore) => state.forms,
    (state: DashboardStore) => state.pages,
    (state: DashboardStore) => state.chatrooms,
    (posts, users, comments, forms, pages, chatrooms) => ({
      totalCount: posts.totalCount || comments.totalCount || users.totalCount,
      posts: posts.posts,
      chatrooms: chatrooms.chatrooms,
      metas: posts.metas,
      users: users.users,
      comments: comments.comments,
      forms: forms.forms,
      pages: pages.pages,
    })
  );

  const assetPageData = useSelector(selectAssetPageData);

  // const assetPageData = useSelector(({ posts, users, comments, forms, pages, chatrooms }: DashboardStore) => {
  //   return {
  //     totalCount: posts.totalCount || comments.totalCount || users.totalCount,
  //     posts: posts.posts,
  //     chatrooms: chatrooms.chatrooms,
  //     metas: posts.metas,
  //     users: users.users,
  //     comments: comments.comments,
  //     forms: forms.forms,
  //     pages: pages.pages,
  //   };
  // });

  const getData = () => {
    const paramsQueries = searchParamsToUrlQuery(currentQuery);
    const assetsType = currentQuery?.assetsType;

    const queries = {
      metaId:searchParams.get('metaId'),
      keyword:searchParams.get('keyword'),
      status:searchParams.get('status'),
      postType:searchParams.get('postType'),
      page:searchParams.get('page'),
      size:searchParams.get('size'),
      sort:searchParams.get('sort')
    }

    if (assetsType === 'posts') {
      dispatch(getPostsAction(queries));
    } else if (assetsType === 'users') {
      dispatch(getUsersAction(paramsQueries));
    } else if (assetsType === 'metas') {
      dispatch(getMetasAction(paramsQueries));
    } else if (assetsType === 'comments') {
      dispatch(getCommentsAction(paramsQueries));
    } else if (assetsType === 'forms') {
      dispatch(getFormsAction(paramsQueries));
    } else if (assetsType === 'pages') {
      dispatch(getPagesAction(currentQuery));
    } else if (assetsType === 'chatrooms') {
      dispatch(getChatroomsAction());
    }
  };

  useEffect(() => {
    getData();
    const hasStatus = !!currentQuery?.status && currentQuery?.status !== 'all';
    const headerItems = currentQuery?.assetsType ? tableItemProperties?.[currentQuery?.assetsType as string] : [];
    const listOfFields = hasStatus ? headerItems.filter((item: string) => item !== 'status') : headerItems;
    setTableItemsType(listOfFields);
  }, [currentQuery]);

  useEffect(() => {
    setCurrentQuery(searchParamsToObject(searchParams));
  }, [searchParams]);

  return (
    <Style>
      <div className="asset-page">
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
      </div>
    </Style>
  );
};

export default Assets;