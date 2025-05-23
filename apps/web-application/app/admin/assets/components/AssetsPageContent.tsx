'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import TableControls from './TableControls/TableControls';
import TableHeader from './TableHeader/TableHeader';
import TableBody from './TableBody/TableBody';
import tableItemProperties from './tableBodyItemProperties';
import { useSearchParams } from 'next/navigation';
import { IChatroom, IComment, IInitialSettings, IMeta, IPage, IPost, User } from '@repo/typescript-types';
import dashboardGetPosts from '@lib/actions/database/posts/dashboardGetPosts';
import dashboardGetMetas from '@lib/actions/database/metas/dashboardGetMetas';
import dashboardGetUsers from '@lib/actions/database/users/dashboardGetUsers';
import dashboardGetComments from '@lib/actions/database/comments/dashboardGetComments';
import dashboardGetForms from '@lib/actions/database/forms/dashboardGetForms';
import dashboardGetPages from '@lib/actions/database/pages/dashboardGetPages';
import dashboardGetChatrooms from '@lib/actions/database/chatrooms/dashboardGetChatrooms';
import { loading, setAlert } from '@store/reducers/globalStateReducer';


interface IAssets {
  totalCount: number,
  posts: IPost[] | null,
  chatrooms: IChatroom[] | null,
  metas: IMeta[] | null,
  users: User[] | null,
  comments: IComment [] | null,
  forms: {}[] | null,
  pages: IPage[] | null,
  statusesCount: {
    [key: string]: number
  }
}

interface IProps{
  initialSettings?:IInitialSettings
}

const AssetsPageContent : FC<IProps> = ({initialSettings}) => {

  const searchParams = useSearchParams();
  const [tableItemsType, setTableItemsType] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const assetsType = searchParams.get('assetsType');
  const status = searchParams.get('status');
  const [assetPageData, setAssetPageData] = useState<IAssets>({
    totalCount: 0,
    statusesCount: {},
    posts: null,
    chatrooms: null,
    metas: null,
    users: null,
    comments: null,
    forms: null,
    pages: null,

  });


  const getAndInitialData = async () => {
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
    dispatch(loading(true));
    let currentAssetTypeRequest = null;
    if (assetsType === 'posts') {
      currentAssetTypeRequest = await dashboardGetPosts(queries);
    } else if (assetsType === 'metas') {
      currentAssetTypeRequest = await dashboardGetMetas(queries);
    } else if (assetsType === 'users') {
      currentAssetTypeRequest = await dashboardGetUsers(queries);
    } else if (assetsType === 'comments') {
      currentAssetTypeRequest = await dashboardGetComments(queries);
    } else if (assetsType === 'forms') {
      currentAssetTypeRequest = await dashboardGetForms(queries);
    } else if (assetsType === 'pages') {
      currentAssetTypeRequest = await dashboardGetPages(queries);
    } else if (assetsType === 'chatrooms') {
      currentAssetTypeRequest = await dashboardGetChatrooms(queries);
    }
    dispatch(loading(false));
    if (!currentAssetTypeRequest) {
      return;
    }
    const { data, success, message, error } = currentAssetTypeRequest;

    if (!success || !data) {
      dispatch(
        setAlert({
          message,
          type: 'Error',
          err: error,
        }),
      );
      return;
    }

    // @ts-expect-error: it's fine
    setAssetPageData(data);

  };


  useEffect(() => {
    // getData();
    getAndInitialData();
    const hasStatus = status && status !== 'all';
    // @ts-expect-error:its fine
    const headerItems = assetsType ? tableItemProperties?.[assetsType] : [];
    const listOfFields = hasStatus ? headerItems.filter((item: string) => item !== 'status') : headerItems;
    setTableItemsType(listOfFields);
  }, [searchParams]);




  const selectAllAssetsHandler = (e: React.ChangeEvent<any>) => {
    if (e.target.checked && assetsType && assetPageData.hasOwnProperty(assetsType)) {
      // @ts-expect-error:its fine
      setSelectedItems(assetPageData[assetsType].map((i: { _id: string }) => i._id));
      return;
    }
    setSelectedItems([]);
  };


  return (

    <div id={'assetsPage'} className="asset-page">
      <TableControls
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        totalCount={assetPageData.totalCount}
        statusesCount={assetPageData.statusesCount}
        contentPerPage={initialSettings?.contentSettings?.contentPerPage}
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

  );
};

export default AssetsPageContent;