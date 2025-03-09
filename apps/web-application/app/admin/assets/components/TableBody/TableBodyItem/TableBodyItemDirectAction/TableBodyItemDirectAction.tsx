"use client";
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { bulkActionPostsAction } from '@storeDashboard/reducers/postsReducer';
import { deleteCommentsAction } from '@storeDashboard/reducers/commentsReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { dashboardAPIRequestDeleteForm } from '@repo/api-requests';
import { useSearchParams } from 'next/navigation';

interface TableBodyItemDirectActionPropTypes {
  assetsType: string;
  _id: string;
  postType: string | undefined;
  title: string | undefined;
}

const TableBodyItemDirectAction: FC<TableBodyItemDirectActionPropTypes> = ({ assetsType, _id, postType, title }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams()
  const statusQuery = searchParams.get('status');

  const onActionHandler = (ids: string[], status: string) => {
    dispatch(bulkActionPostsAction({ ids, status }));
  };

  if (assetsType === 'posts') {
    return (
      <div className='asset-page-table-body-item-hover-item'>
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
      <div className='asset-page-table-body-item-hover-item'>
        <Link href={`/admin/editUser?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
      </div>
    );
  } else if (assetsType === 'chatrooms') {
    return (
      <div className='asset-page-table-body-item-hover-item'>
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
      <div className='asset-page-table-body-item-hover-item'>
        <button className={'btn btn-danger'} onClick={() => dispatch(deleteCommentsAction([_id]))}>
          Delete
        </button>
      </div>
    );
  } else if (assetsType === 'metas') {
    return (
      <div className='asset-page-table-body-item-hover-item'>
        <Link href={`/admin/editMeta?id=${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
      </div>
    );
  } else if (assetsType === 'forms') {
    return (
      <div className='asset-page-table-body-item-hover-item'>
        <Link href={`/admin/form/${_id}`} className={'btn btn-info'}>
          Edit
        </Link>
        <span
          className={'btn btn-danger'}
          onClick={async () => {
            await dashboardAPIRequestDeleteForm(_id).then(() => {
              router.push(`/admin/assets?assetsType=forms&size=20&lastUpdate=${Date.now()}`);
            });
          }}
        >
          Delete
        </span>
      </div>
    );
  } else if (assetsType === 'pages') {
    return (
      <div className='asset-page-table-body-item-hover-item'>
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
      <div className='asset-page-table-body-item-hover-item'>
      </div>
    );
  }
};

export default TableBodyItemDirectAction;


// import React, {FC} from 'react';
// import {Link, useNavigate,useSearchParams} from 'react-router-dom';
// import {bulkActionPostsAction} from "@storeDashboard//reducers/postsReducer";
// import {deleteCommentsAction} from "@storeDashboard/reducers/commentsReducer";
// import {useAppDispatch} from "@storeDashboard/hooks";
// import {dashboardAPIRequestDeleteForm} from "@repo/api-requests";
//
// interface TableBodyItemDirectActionPropTypes {
//     assetsType: string,
//     _id: string,
//     postType: string | undefined,
//     title: string | undefined,
// }
//
// const TableBodyItemDirectAction: FC<TableBodyItemDirectActionPropTypes> = ({assetsType, _id, postType, title}) => {
//     const dispatch = useAppDispatch()
//     const [search, setSearch] = useSearchParams();
//     const statusQuery = search.get('status')
//     const navigate = useNavigate();
//
//     const onActionHandler =(ids:string,status:string)=>{
//         dispatch(bulkActionPostsAction({ids,status}))
//     }
//
//     if (assetsType === 'posts') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <Link to={'/admin/post?id=' + _id} className={'btn btn-info'}>Edit</Link>
//                 <Link to={`/post/${postType}/${_id}`} target={'_blank'} className={'btn btn-info'}>View</Link>
//                 {statusQuery !== 'trash' ?
//               //@ts-ignore
//                     <span className={'btn btn-danger'} onClick={() => onActionHandler([_id] ,'trash') }>
//                             Trash
//                         </span>
//                     : null
//                 }
//                 {statusQuery !== 'draft' ?
//                     //@ts-ignore
//                     <span className={'btn btn-info'} onClick={() => onActionHandler([_id],'draft') }>
//                             Draft
//                         </span>
//                     : null
//                 }
//                 {statusQuery !== 'pending' ?
//                     //@ts-ignore
//                     <span className={'btn btn-info'} onClick={() =>onActionHandler([_id],'pending')  }>
//                             Pending
//                         </span>
//                     : null
//                 }
//                 {statusQuery === 'trash' ?
//                     //@ts-ignore
//                     <span className={'btn btn-info'} onClick={() => onActionHandler([_id],'delete') }>
//                             Delete
//                         </span>
//                     : null
//                 }
//                 {statusQuery !== 'published' || !statusQuery ?
//                     //@ts-ignore
//                     <span className={'btn btn-primary'} onClick={() => onActionHandler([_id],'published')}>
//                             Publish
//                         </span>
//                     : null
//                 }
//             </div>
//         )
//     } else if (assetsType === 'users') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <Link to={'/admin/user?id=' + _id}>Edit</Link>
//             </div>
//         );
//     }else if (assetsType === 'chatrooms') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <Link to={'/admin/chatroom?id=' + _id}>Edit</Link>
//                 {/*<button className={'btn btn-danger'} onClick={()=>{deleteChatroom(_id as string)}}>*/}
//                 {/*    Delete*/}
//                 {/*</button>*/}
//             </div>
//         );
//     } else if (assetsType === 'comments') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <button className={'btn btn-danger'} onClick={()=>{dispatch(deleteCommentsAction([_id]))}}>
//                     Delete
//                 </button>
//             </div>
//         );
//     } else if (assetsType === 'metas') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <Link to={'/admin/meta?id=' + _id} className={'btn btn-info'}>Edit</Link>
//             </div>
//         );
//     } else if (assetsType === 'forms') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <Link to={'/admin/form/' + _id}>Edit</Link>
//                 <span className={'btn btn-danger'} onClick={async () => {
//                     await dashboardAPIRequestDeleteForm(_id).then(()=>{
//                         navigate(`/admin/assets?assetsType=forms&size=20&lastUpdate=${Date.now()}`)
//                     })
//                 }}>Delete</span>
//             </div>
//         );
//     } else if (assetsType === 'pages') {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//                 <Link to={'/admin/page?id=' + _id}>Edit</Link>
//                 {/*<span className={'btn btn-danger'}*/}
//                 {/*      onClick={onDeletePageHandler}*/}
//                 {/*>*/}
//                 {/*    Delete*/}
//                 {/*</span>*/}
//             </div>
//         );
//     } else {
//         return (
//             <div className='asset-page-table-body-item-hover-item'>
//
//             </div>
//         )
//     }
// };
// export default TableBodyItemDirectAction;
