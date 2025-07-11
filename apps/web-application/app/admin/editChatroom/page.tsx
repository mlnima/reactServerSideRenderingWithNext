'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import dashboardGetChatroom from '@lib/actions/database/chatrooms/dashboardGetChatroom';
import { setAlert } from '@store/reducers/globalStateReducer';
import { IChatroom } from '@repo/typescript-types';
import dashboardUpdateChatroom from '@lib/actions/database/chatrooms/dashboardUpdateChatroom';
import dashboardDeleteChatroom from '@lib/actions/database/chatrooms/dashboardDeleteChatroom';

const EditChatroom = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [chatroomData, setChatroomData] = useState<IChatroom | null >(null);


  const getChatroomData = async (_id: string) => {
    const { success, message, data, error } = await dashboardGetChatroom({ _id });
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

    setChatroomData(data.chatroom);
  };


  useEffect(() => {
    const _id = searchParams.get('id');
    if (_id) {
      getChatroomData(_id);
    }
  }, [searchParams]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error: it's fine
    setChatroomData((prevState) => ({
      ...(prevState || {}),
      [e.target.name]: e.target.value,
    }));
  };

  const onSaveHandler = async () => {
    if (chatroomData) {
      const { success, message, data, error } = await dashboardUpdateChatroom({ chatroomData });
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

      if (searchParams.get('id')) {

        dispatch(
          setAlert({
            message:'Updated',
            type: 'Success',
          }),
        );
        setChatroomData(data.chatroom);
      } else {
        router.push(`/adminchatroom?id=${data.chatroom._id}`);
      }
    }


  };

  const onDeleteHandler = async () => {

    const _id = searchParams.get('id');
    if (_id) {
      const { success, message, error } = await dashboardDeleteChatroom({ _id });
      if (!success) {
        dispatch(
          setAlert({
            message,
            type: 'Error',
            err: error,
          }),
        );
        return;
      }

      router.push('/dashboard/assets?assetsType=chatrooms&size=20');
    }


  };

  return (
    <div className={'editChatroomPage'}>
      <p>Name:</p>
      <input type={'text'} name={'name'} value={chatroomData?.name} onChange={e => onChangeHandler(e)}
             className={'primaryInput'} />
      <p>Title:</p>
      <input type={'text'} name={'title'} value={chatroomData?.title} onChange={e => onChangeHandler(e)}
             className={'primaryInput'} />
      <p>Description:</p>
      <input type={'text'} name={'description'} value={chatroomData?.description} onChange={e => onChangeHandler(e)}
             className={'primaryInput'} />
      <p>Tags:</p>
      <input type={'text'} name={'tags'} value={chatroomData?.tags} onChange={e => onChangeHandler(e)}
             className={'primaryInput'} />
      <div className={'action-buttons'}>
        <button className={'btn btn-primary'} onClick={() => onSaveHandler()}>Save</button>
        <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>Delete</button>
      </div>
    </div>
  );
};

export default EditChatroom;