"use client";
import React, { FC, useMemo, useState } from 'react';
import styled from "styled-components";
import { setAlert } from "@storeDashboard/reducers/globalStateReducer";
import { bulkActionMetaAction, bulkActionPostsAction } from "@storeDashboard/reducers/postsReducer";
import { useAppDispatch } from "@storeDashboard/hooks";
import { usePathname, useRouter } from 'next/navigation';
import paramsObjectGenerator from "../paramsObjectGenerator";
import { useSearchParams } from 'next/navigation';

const Styles = styled.div`
  select {
    width: 150px;
    .btn-navigation {
      margin: 0 2px;
    }
  }
`;

interface AssetBulkActionPropTypes {
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void; // Type the setSelectedItems function
}

const AssetBulkAction: FC<AssetBulkActionPropTypes> = ({ selectedItems, setSelectedItems }) => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Create a memoized query object using paramsObjectGenerator
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('');

  const reGetData = () => {
    router.replace(pathname); // Use replace to refresh the data without adding a new entry to history
  };

  const onApplyHandler = () => {
    if (selectedItems?.length && status) {
      switch (query.assetsType) {
        case 'posts':
          dispatch(bulkActionPostsAction({ ids: selectedItems, status }));
          setSelectedItems([]);
          reGetData();
          break;
        case 'metas':
          dispatch(bulkActionMetaAction({ type: 'metas', status, ids: selectedItems }));
          reGetData();
          break;
        default:
          break;
      }
    } else {
      dispatch(setAlert({ message: 'No Item Or Status is Selected', type: 'warning', active: true }));
    }
  };

  return (
    <Styles className={'assetControlItem'}>
      <select
        className={'primarySelect'}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value=''>Bulk Actions</option>
        {query.status !== 'published' && <option value='published'>Published</option>}
        {query.status !== 'draft' && <option value='draft'>Draft</option>}
        {query.status !== 'trash' && <option value='trash'>Trash</option>}
        {query.status !== 'pending' && <option value='pending'>Pending</option>}
        {query.status === 'trash' && <option value='delete'>Delete</option>}
      </select>
      <button className={'btn btn-primary'} onClick={onApplyHandler}>Apply</button>
    </Styles>
  );
};

export default AssetBulkAction;

// import React, {FC, useMemo, useState} from 'react';
// import styled from "styled-components";
// import {setAlert} from "@store/reducers/globalStateReducer";
// import {bulkActionMetaAction, bulkActionPostsAction} from "@store/reducers/postsReducer";
// import {useAppDispatch} from "@store/hooks";
// import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
// import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";
//
// const Styles = styled.div`
//   select {
//     width: 150px;
//
//     .btn-navigation {
//       margin: 0 2px;
//     }
//   }
// `
//
// interface AssetBulkActionPropTypes {
//     selectedItems: any[]
//     setSelectedItems: any,
// }
//
// const AssetBulkAction: FC<AssetBulkActionPropTypes> = ({selectedItems, setSelectedItems}) => {
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(()=>paramsObjectGenerator(search),[search]);
//     const dispatch = useAppDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [status, setStatus] = useState('');
//
//     const reGetData = () => {
//         navigate(location.pathname);
//     }
//
//     const onApplyHandler = () => {
//         if (selectedItems?.length && status) {
//             switch (query.assetsType) {
//                 case 'posts':
//                     dispatch(bulkActionPostsAction({ids:selectedItems,status}))
//                     setSelectedItems([])
//                     reGetData()
//                     break
//                 case 'metas':
//                     dispatch(bulkActionMetaAction({type:'metas', status, ids:selectedItems}))
//                     reGetData()
//                     break
//                 default:
//                     break
//             }
//         } else {
//             dispatch(setAlert({message: 'No Item Or Status is Selected', type: 'warning', active: true}))
//         }
//     }
//
//
//     return (
//         <Styles className={'assetControlItem'}>
//             <select className={'primarySelect'}
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}>
//                 <option value=''>Bulk Actions</option>
//                 {query.status !== 'published' ? <option value='published'>Published</option> : null}
//                 {query.status !== 'draft' ? <option value='draft'>Draft</option> : null}
//                 {query.status !== 'trash' ? <option value='trash'>Trash</option> : null}
//                 {query.status !== 'pending' ? <option value='pending'>Pending</option> : null}
//                 {query.status === 'trash' ? <option value='delete'>Delete</option> : null}
//             </select>
//             <button className={'btn btn-primary'} onClick={onApplyHandler}>Apply</button>
//         </Styles>
//
//     )
//
//
// };
// export default AssetBulkAction;
//
