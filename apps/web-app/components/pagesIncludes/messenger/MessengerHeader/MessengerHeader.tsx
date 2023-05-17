import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {FC, useEffect, useState} from "react";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {Styles} from "./MessengerHeader.styles";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store, User} from "typescript-types";
import {useAppDispatch} from "@store_toolkit/hooks";
import {initialOutGoingCallAction} from "@store_toolkit/clientReducers/mediaConnectionReducer";
import {setMessengerState} from "@store_toolkit/clientReducers/messengerReducer";

interface IProps {
    conversationsMenuTriggerHandler: (value: boolean) => void,
}


interface IButton {
    active?: boolean,

}


const StyledButton = styled.button<IButton>`
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({active}) => active ? 'var(--main-active-color, #f90)' : 'var(--secondary-text-color, #ccc)'};

  svg {
    width: 25px;
    height: 25px;
  }
`


const MessengerHeader: FC<IProps> = ({ conversationsMenuTriggerHandler}) => {
    const dispatch = useAppDispatch();
    const { activeConversation,isConversationsMenuOpen, autoScroll} = useSelector(({messenger}: Store) => messenger);
    const {userData} = useSelector(({user}: Store) => user)
    const [partnerData, setPartnerData] = useState<User | null>(null)


    useEffect(() => {
        if (!!activeConversation?.users?.length) {
            setPartnerData(activeConversation?.users?.filter((user: any) => user._id !== userData?._id)[0])
        }
    }, [activeConversation]);

    const router = useRouter()

    const onBackClickHandler = () => {
        conversationsMenuTriggerHandler(true)
    }

    return (
        <Styles className='messenger-header outerContent'>
            {!!activeConversation?._id &&

                <div className='messenger-header-content innerContent'>


                    <div className="button-group left">

                        <button onClick={onBackClickHandler}
                                className={'btn btn-transparent mobile-only'}>
                            <FontAwesomeIcon icon={faArrowLeft} style={{width: 25, height: 25}}/>
                        </button>

                        <StyledButton onClick={() =>  dispatch(setMessengerState({autoScroll:!autoScroll})) }
                                      active={autoScroll}
                                      className={'chatroomTopBarActionButton'}>
                            <FontAwesomeIcon icon={faArrowDownWideShort}/>
                        </StyledButton>


                        {/*<img onClick={() => router.push(`/user/${username}`)}*/}
                        {/*     src={profileImage?.filePath ? profileImage?.filePath : '/asset/images/user/noGenderAvatar150.jpg'}*/}
                        {/*     alt="messenger-conversation-header-profile-image"*/}
                        {/*     className="messenger-conversation-header-profile-image"/>*/}
                        <p onClick={() => router.push(`/user/${partnerData?.username || ''}`)}
                           className='messenger-conversation-header-username'>{partnerData?.username || ''}</p>
                    </div>

                    <div className="button-group right">
                        <button className={'btn btn-transparent'}
                                onClick={() => dispatch(initialOutGoingCallAction('video'))}>
                            <FontAwesomeIcon icon={faVideo} style={{width: 25, height: 25}}/>
                        </button>
                    </div>

                </div>

            }

       </Styles>
    )
        ;
};
export default MessengerHeader;
