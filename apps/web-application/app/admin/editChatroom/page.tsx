'use client';

import React, { useEffect, useMemo } from 'react';
import styled from "styled-components";
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@storeDashboard/hooks";
import { editChatroomFieldAction, getChatroomAction } from "@storeDashboard//reducers/chatroomsReducer";
import { useSelector } from "react-redux";
import { DashboardStore } from "@repo/typescript-types";
import { dashboardAPIRequestUpdateChatroom, dashboardAPIRequestCreateChatroom, dashboardAPIRequestDeleteChatroom } from "@repo/api-requests";

const Style = styled.div`
  margin: 8px;
  padding: 8px;
  box-sizing: border-box;
  width: 95%;
  input {
    max-width: 600px;
  }
  .action-buttons {
    display: flex;
    justify-content: space-between;
    button {
      margin: 8px 0;
    }
  }
`;

interface PropTypes { }

const Chatroom: React.FC<PropTypes> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatroomId = useMemo(() => searchParams.get('id'), [searchParams]);
  const isNewChatroom = useMemo(() => searchParams.get('new'), [searchParams]);

  const dispatch = useAppDispatch();
  const chatroomData = useSelector(({ chatrooms }: DashboardStore) => chatrooms.chatroom);

  useEffect(() => {
    if (chatroomId) {
      dispatch(getChatroomAction(chatroomId as string));
    }
  }, [dispatch, chatroomId]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChatroomFieldAction({ [e.target.name]: e.target.value }));
  };

  const onSaveHandler = () => {
    if (chatroomId) {
      dashboardAPIRequestUpdateChatroom(chatroomData);
    } else if (!!isNewChatroom) {
      dashboardAPIRequestCreateChatroom(chatroomData).then((response: { data: any }) => {
        console.log(response);
        if (response?.data?.chatroom?._id) {
          router.push(`/dashboard/chatroom?id=${response?.data?.chatroom?._id}`);
        }
      });
    }
  };

  const onDeleteHandler = () => {
    dashboardAPIRequestDeleteChatroom(chatroomId as string).then(() => {
      router.push('/dashboard/assets?assetsType=chatrooms&size=20');
    });
  };

  return (
    <Style>
      <p>Name:</p>
      <input type={'text'} name={'name'} value={chatroomData?.name} onChange={e => onChangeHandler(e)} className={'primaryInput'}/>
      <p>Title:</p>
      <input type={'text'} name={'title'} value={chatroomData?.title} onChange={e => onChangeHandler(e)} className={'primaryInput'}/>
      <p>Description:</p>
      <input type={'text'} name={'description'} value={chatroomData?.description} onChange={e => onChangeHandler(e)} className={'primaryInput'}/>
      <p>Tags:</p>
      <input type={'text'} name={'tags'} value={chatroomData?.tags} onChange={e => onChangeHandler(e)} className={'primaryInput'}/>
      <div className={'action-buttons'}>
        <button className={'btn btn-primary'} onClick={() => onSaveHandler()}>Save</button>
        <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>Delete</button>
      </div>
    </Style>
  );
};

export default Chatroom;