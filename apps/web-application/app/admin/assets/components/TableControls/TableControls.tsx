"use client";

import AssetStatusNavigation from './AssetStatusNavigation';
import AssetSearch from './AssetSearch';
import AssetPagination from './AssetPagination';
import AssetSize from './AssetSize';
import AssetBulkAction from './AssetBulkAction';
import PostsTypes from './PostsTypes';
import PostsByMeta from './PostsByMeta';
import styled from 'styled-components';
import { FC, useMemo } from 'react';
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
  selectedItems: any[];
  setSelectedItems: (items: any[]) => void;
  assetPageData: {};
  currentQuery: { [key: string]: string };
}

const TableControls: FC<TableControlsPropTypes> = ({ selectedItems, setSelectedItems, assetPageData, currentQuery }) => {

  const searchParams = useSearchParams()
  const assetsType = useMemo(() => searchParams.get('assetsType'), [searchParams]);

  return (
    <TableControlsStyledDiv className="asset-page-table-head">
      <AssetStatusNavigation currentQuery={currentQuery} />
      <AssetSize />
      { (assetsType === 'posts' || assetsType === 'metas') && (
        <AssetBulkAction selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      )}
      {assetsType === 'posts' && <PostsTypes />}
      {assetsType === 'metas' && <MetasType />}
      {assetsType === 'users' && <UsersRole />}
      <AssetPagination assetPageData={assetPageData} />
      <AssetSearch />
      {assetsType === 'posts' && <PostsByMeta />}
      <SortItemsBy />
    </TableControlsStyledDiv>
  );
};

export default TableControls;


// import AssetStatusNavigation from './AssetStatusNavigation';
// import AssetSearch from './AssetSearch';
// import AssetPagination from './AssetPagination';
// import AssetSize from './AssetSize';
// import AssetBulkAction from './AssetBulkAction';
// import PostsTypes from './PostsTypes';
// import PostsByMeta from './PostsByMeta';
// import styled from 'styled-components';
// import { FC, useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import MetasType from '@components/pages/Assets/TableControls/MetasTypes';
// import SortItemsBy from '@components/pages/Assets/TableControls/SortItemsBy';
// import UsersRole from "./UsersRole";
//
// const TableControlsStyledDiv = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   align-items: center;
//   gap: 0.5rem;
//
//   .assetControlItem {
//     background-color: var(--tertiary-background-color);
//     padding: 0.35rem 1rem;
//     border-radius: 0.375rem;
//
//     p {
//       white-space: nowrap;
//       padding: 0;
//       margin: 0;
//     }
//   }
// `;
//
// interface TableControlsPropTypes {
//     selectedItems: any[];
//     setSelectedItems: any;
//     assetPageData: {};
//     currentQuery: {[key: string]: string };
// }
//
// const TableControls: FC<TableControlsPropTypes> = ({ selectedItems, setSelectedItems, assetPageData,currentQuery }) => {
//     const [search, setSearch] = useSearchParams();
//     const assetsType = useMemo(() => search.get('assetsType'), [search]);
//
//
//     return (
//         <TableControlsStyledDiv className="asset-page-table-head">
//             <AssetStatusNavigation currentQuery={currentQuery} />
//             <AssetSize />
//             {
//                 (assetsType === 'posts' || assetsType === 'metas') && <AssetBulkAction selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
//             {assetsType === 'posts' && <PostsTypes />}
//             {assetsType === 'metas' && <MetasType />}
//             {assetsType === 'users' && <UsersRole />}
//             <AssetPagination assetPageData={assetPageData} />
//             <AssetSearch />
//             {assetsType === 'posts' && <PostsByMeta />}
//             <SortItemsBy />
//         </TableControlsStyledDiv>
//     );
// };
// export default TableControls;
