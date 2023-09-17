'use client';
import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import {useAppSelector} from "@store/hooks";

interface PropTypes {
    messageId: string,
    onDeleteMessageHandler: (messageId: string) => void,
    authorId: string
}

const AdminAuthorMessageActionMenu: FC<PropTypes> = ({ messageId,onDeleteMessageHandler,authorId}) => {

    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode)
    const {userData} = useAppSelector(({user}) => user)

    if (adminMode || authorId === userData?._id) {
        return (
            <div>
                <button className={'btn btn-danger'} onClick={()=>onDeleteMessageHandler(messageId)}>
                    <FontAwesomeIcon icon={faTrashCan} style={{width: 15, height: 15}}/>
                </button>
            </div>
        )
    } else return null

};

export default AdminAuthorMessageActionMenu;