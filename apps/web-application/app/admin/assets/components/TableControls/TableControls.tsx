'use client';
import AssetStatusNavigation from './AssetStatusNavigation/AssetStatusNavigation';
import AssetSearch from './AssetSearch/AssetSearch';
import AssetPagination from './AssetPagination/AssetPagination';
import AssetSize from './AssetSize/AssetSize';
import AssetBulkAction from './AssetBulkAction/AssetBulkAction';
import PostsTypes from './PostsByTypes/PostsByTypes';
import PostsByMeta from './PostsByMeta/PostsByMeta';
import React, { FC, useMemo } from 'react';
import MetasType from './MetasType/MetasType';
import SortAssetsBy from './SortAssetsBy/SortAssetsBy';
import ContentUsersRoleFilter from './UsersRole/ContentUsersRoleFilter';
import { useSearchParams } from 'next/navigation';
import './TableControls.scss'

interface TableControlsPropTypes {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  totalCount: number
  statusesCount: any,
  contentPerPage?:number
}

const TableControls: FC<TableControlsPropTypes> = ({ selectedItems, setSelectedItems, totalCount = 0, statusesCount,contentPerPage }) => {

  const searchParams = useSearchParams();
  const assetsType = useMemo(() => searchParams.get('assetsType'), [searchParams]);

  return (
    <div id={'ContentTableControls'} className="asset-page-table-head">
      {(assetsType === 'posts' || assetsType === 'metas') && (
        <AssetStatusNavigation statusesCount={statusesCount} />
      )}

      <AssetSize contentPerPage={contentPerPage}/>
      {(assetsType === 'posts' || assetsType === 'metas') && (
        <AssetBulkAction selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      )}
      {assetsType === 'posts' && <PostsTypes />}
      {assetsType === 'metas' && <MetasType />}
      {assetsType === 'users' && <ContentUsersRoleFilter />}
      <AssetPagination totalCount={totalCount} />
      <AssetSearch />
      {assetsType === 'posts' && <PostsByMeta />}
      <SortAssetsBy />
    </div>
  );
};

export default TableControls;
