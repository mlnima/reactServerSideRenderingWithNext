'use client';
import React, { FC, useState } from 'react';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch } from '@store/hooks';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import './AssetBulkAction.scss';
import dashboardUpdatePostsStatus from '@lib/actions/database/operations/posts/dashboardUpdatePostsStatus';
import dashboardUpdateMetasStatus from '@lib/actions/database/operations/metas/dashboardUpdateMetasStatus';

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
          dashboardUpdatePostsStatus({ ids: selectedItems, status })
          setSelectedItems([]);
          reGetData();
          break;
        case 'metas':
          dashboardUpdateMetasStatus({ type: 'metas', status, ids: selectedItems })
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
