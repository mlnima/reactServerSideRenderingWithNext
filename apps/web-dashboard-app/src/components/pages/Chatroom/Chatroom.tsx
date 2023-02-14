import React, {FC, useEffect, useMemo} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {useSearchParams} from "react-router-dom";
import {useAppDispatch} from "@store/hooks";
import {editChatroomFieldAction, getChatroomAction} from "@store/reducers/chatroomsReducer";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import updateChatroom from "api-requests/src/dashboard/chatrooms/updateChatroom";
import createChatroom from "api-requests/src/dashboard/chatrooms/createChatroom";
import deleteChatroom from "api-requests/src/dashboard/chatrooms/deleteChatroom";

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

interface PropTypes {
}

const Chatroom: FC<PropTypes> = ({}) => {
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    const chatroomId = useMemo(() => search.get('id'), [search])
    const isNewChatroom = useMemo(() => search.get('new'), [search])
    const dispatch = useAppDispatch()
    const chatroomData = useSelector(({chatrooms}: DashboardStore) => chatrooms.chatroom)

    useEffect(() => {
        if (chatroomId) {
            dispatch(getChatroomAction(chatroomId as string))
        }
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editChatroomFieldAction({[e.target.name]: e.target.value}))
    }

    const onSaveHandler = () => {
        if (chatroomId) {
            updateChatroom(chatroomData)
        } else if (!!isNewChatroom) {
            createChatroom(chatroomData).then(response => {
                console.log(response)
                if (response?.data?.chatroom?._id) {
                    navigate(`/dashboard/chatroom?id=${response?.data?.chatroom?._id}`);
                }
            })
        }
    }

    const onDeleteHandler = () => {
        deleteChatroom(chatroomId as string).then(() => {
            navigate(`/dashboard/assets?assetsType=chatrooms&size=20`);
        })
    }

    return (
        <Style>
            <p>Name:</p>
            <input type={'text'}
                   name={'name'}
                   value={chatroomData?.name}
                   onChange={e => onChangeHandler(e)}
                   className={'form-control-input'}/>
            <p>Title:</p>
            <input type={'text'}
                   name={'title'}
                   value={chatroomData?.title}
                   onChange={e => onChangeHandler(e)}
                   className={'form-control-input'}/>
            <p>Description:</p>
            <input type={'text'}
                   name={'description'}
                   value={chatroomData?.description}
                   onChange={e => onChangeHandler(e)}
                   className={'form-control-input'}/>
            <p>Tags:</p>
            <input type={'text'}
                   name={'tags'}
                   value={chatroomData?.tags}
                   onChange={e => onChangeHandler(e)}
                   className={'form-control-input'}/>
            <div className={'action-buttons'}>
                <button className={'btn btn-primary'} onClick={() => onSaveHandler()}>Save</button>
                <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>Delete</button>
            </div>

        </Style>
    )
};

export default Chatroom;
