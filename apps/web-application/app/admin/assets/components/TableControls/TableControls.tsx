'use client';
import AssetStatusNavigation from './AssetStatusNavigation';
import AssetSearch from './AssetSearch';
import AssetPagination from './AssetPagination';
import AssetSize from './AssetSize';
import AssetBulkAction from './AssetBulkAction';
import PostsTypes from './PostsTypes';
import PostsByMeta from './PostsByMeta';
import styled from 'styled-components';
import React, { FC, useMemo } from 'react';
import MetasType from './MetasTypes';
import SortItemsBy from './SortItemsBy';
import UsersRole from './UsersRole';
import { useSearchParams } from 'next/navigation';

const TableControlsStyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;

    .assetControlItem {
        background-color: var(--tertiary-background-color);
        padding: 0.35rem 1rem;
        border-radius: 0.375rem;

        p {
            white-space: nowrap;
            padding: 0;
            margin: 0;
        }
    }
`;

interface TableControlsPropTypes {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
  totalCount: number
}

const TableControls: FC<TableControlsPropTypes> = ({ selectedItems, setSelectedItems, totalCount = 0 }) => {

  const searchParams = useSearchParams();
  const assetsType = useMemo(() => searchParams.get('assetsType'), [searchParams]);

  return (
    <TableControlsStyledDiv className="asset-page-table-head">
      {(assetsType === 'posts' || assetsType === 'metas') && (
        <AssetStatusNavigation />
      )}

      <AssetSize />
      {(assetsType === 'posts' || assetsType === 'metas') && (
        <AssetBulkAction selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      )}
      {assetsType === 'posts' && <PostsTypes />}
      {assetsType === 'metas' && <MetasType />}
      {assetsType === 'users' && <UsersRole />}
      <AssetPagination totalCount={totalCount} />
      <AssetSearch />
      {assetsType === 'posts' && <PostsByMeta />}
      <SortItemsBy />
    </TableControlsStyledDiv>
  );
};

export default TableControls;
