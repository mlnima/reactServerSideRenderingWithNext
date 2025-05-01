'use client';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@store/hooks';
import { dashboardAPIRequestDeleteForm } from '@repo/api-requests';
import { useSearchParams } from 'next/navigation';
import dashboardDeleteComments from '@lib/actions/database/operations/comments/dashboardDeleteComments';
import dashboardUpdatePostsStatus from '@lib/actions/database/operations/posts/dashboardUpdatePostsStatus';

interface TableBodyItemDirectActionPropTypes {
  _id: string;
  postType: string | undefined;
  title: string | undefined;
}

const TableBodyItemDirectAction: FC<TableBodyItemDirectActionPropTypes> = ({ _id, postType }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusQuery = searchParams.get('status');
  const [assetsType, setAssetsType] = useState('posts');

  useEffect(() => {
    const assetsTypeQuery = searchParams.get('assetsType');
    if (assetsTypeQuery) {
      setAssetsType(assetsTypeQuery);
    }
  }, [searchParams]);

  const onActionHandler = async (ids: string[], status: string) => {
    return await dashboardUpdatePostsStatus({ ids, status });
  };

  if (assetsType === 'posts') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <Link href={`/admin/editPost?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
        <Link href={`/post/${postType}/${_id}`} target={'_blank'} className={'btn btn-info'}>
          View
        </Link>
        {statusQuery !== 'trash' ? (
          // @ts-ignore
          <span className={'btn btn-danger'} onClick={() => onActionHandler([_id], 'trash')}>
            Trash
          </span>
        ) : null}
        {statusQuery !== 'draft' ? (
          // @ts-ignore
          <span className={'btn btn-info'} onClick={() => onActionHandler([_id], 'draft')}>
            Draft
          </span>
        ) : null}
        {statusQuery !== 'pending' ? (
          // @ts-ignore
          <span className={'btn btn-info'} onClick={() => onActionHandler([_id], 'pending')}>
            Pending
          </span>
        ) : null}
        {statusQuery === 'trash' ? (
          // @ts-ignore
          <span className={'btn btn-info'} onClick={() => onActionHandler([_id], 'delete')}>
            Delete
          </span>
        ) : null}
        {statusQuery !== 'published' || !statusQuery ? (
          // @ts-ignore
          <span className={'btn btn-primary'} onClick={() => onActionHandler([_id], 'published')}>
            Publish
          </span>
        ) : null}
      </div>
    );
  } else if (assetsType === 'users') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <Link href={`/admin/editUser?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
      </div>
    );
  } else if (assetsType === 'chatrooms') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <Link href={`/admin/editChatroom?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
        {/*<button className={'btn btn-danger'} onClick={()=>{deleteChatroom(_id as string)}}>*/}
        {/* Delete*/}
        {/*</button>*/}
      </div>
    );
  } else if (assetsType === 'comments') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <button className={'btn btn-danger'}
                onClick={async () => dashboardDeleteComments({ ids: [_id] }).then(() => router.refresh())}>
          Delete
        </button>
      </div>
    );
  } else if (assetsType === 'metas') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <Link href={`/admin/editMeta?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
      </div>
    );
  } else if (assetsType === 'forms') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <Link href={`/admin/form/${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
        <span
          className={'btn btn-danger'}
          onClick={async () => {
            await dashboardAPIRequestDeleteForm(_id).then(() => {
              router.push(`/admin/assets?assetsType=forms&size=20&lastUpdate=${performance.now()}`);
            });
          }}
        >
          Delete
        </span>
      </div>
    );
  } else if (assetsType === 'pages') {
    return (
      <div className="asset-page-table-body-item-hover-item">
        <Link href={`/admin/editPage?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
        {/*<span className={'btn btn-danger'}*/}
        {/* onClick={onDeletePageHandler}*/}
        {/*>*/}
        {/* Delete*/}
        {/*</span>*/}
      </div>
    );
  } else {
    return (
      <div className="asset-page-table-body-item-hover-item">
      </div>
    );
  }
};

export default TableBodyItemDirectAction;


