'use client';
import React, { FC, useState } from 'react';
import { setAlert } from '@storeDashboard/reducers/globalStateReducer';
import { bulkActionMetaAction, bulkActionPostsAction } from '@storeDashboard/reducers/postsReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import './AssetBulkAction.scss';

interface AssetBulkActionPropTypes {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
}

const AssetBulkAction: FC<AssetBulkActionPropTypes> = ({ selectedItems, setSelectedItems }) => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('');

  const reGetData = () => {
    router.refresh();
  };

  const onApplyHandler = () => {
    if (selectedItems?.length && status) {
      switch (searchParams.get('assetsType')) {
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
    <div className={'assetControlItem AssetBulkAction'}>
      <select
        className={'primarySelect'}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Bulk Actions</option>
        {searchParams.get('status') !== 'published' && <option value="published">Published</option>}
        {searchParams.get('status') && <option value="draft">Draft</option>}
        {searchParams.get('status') && <option value="trash">Trash</option>}
        {searchParams.get('status') && <option value="pending">Pending</option>}
        {searchParams.get('status') && <option value="delete">Delete</option>}
      </select>
      <button className={'btn btn-primary'} onClick={onApplyHandler}>Apply</button>
    </div>
  );
};

export default AssetBulkAction;
