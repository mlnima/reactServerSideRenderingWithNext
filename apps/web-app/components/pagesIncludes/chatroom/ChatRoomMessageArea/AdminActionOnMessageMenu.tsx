import React, {FC} from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import {clientAPIRequestDeleteChatroomMessage} from 'api-requests'
import {useAppSelector} from "@store_toolkit/hooks";

const Style = styled.div``;

interface PropTypes {
    messageId: string,
    chatroomId: string,
}

const AdminActionOnMessageMenu: FC<PropTypes> = ({chatroomId, messageId}) => {
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode)

    const onDeleteMessageHandler = () => {
        if (chatroomId && messageId) {
            clientAPIRequestDeleteChatroomMessage(chatroomId, messageId)
        }
    }

    if (adminMode) {
        return (
            <Style>
                <button className={'btn btn-danger'} onClick={onDeleteMessageHandler}>
                    <FontAwesomeIcon icon={faTrashCan} style={{width: 15, height: 15}}/>
                </button>
            </Style>
        )
    } else return null

};

export default AdminActionOnMessageMenu;