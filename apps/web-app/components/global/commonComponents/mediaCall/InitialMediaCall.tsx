import React, {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {useAppDispatch} from "@store_toolkit/hooks";
import {resetMediaConnectionAction} from "@store_toolkit/clientReducers/mediaConnectionReducer";
import {capitalizeFirstLetter} from "custom-util";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
  
  .media-call-header{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .target-users{
    .target-user{
      width: 100%;
      height: 70px;
      display: grid;
      grid-template-columns: 70px 1fr;
      grid-gap: 10px;
      .profile-image {
        
        width: 100%;
        height: 100%;
        color: var(--main-text-color, #fff);
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }

  }

`;

interface PropTypes {
    callType: 'video' | 'audio' | 'stream' | null,
    outGoingCall: boolean,
    callAccepted: boolean,
}

const InitialMediaCall: FC<PropTypes> = ({callType,outGoingCall,callAccepted}) => {
    const dispatch = useAppDispatch()

    const {activeConversation} = useSelector(({messenger}: Store) => messenger);
    const {userData} = useSelector(({user}: Store) => user)

    return (
        <Style>

            <div className={'media-call-header'}>
                <button className={'close-initialed-call btn btn-dark'} onClick={()=>dispatch(resetMediaConnectionAction(null))}>
                    <FontAwesomeIcon icon={faXmark} style={{width: 20, height: 20}}/>
                </button>
            </div>
            <h2>{capitalizeFirstLetter(callType)} Call To :</h2>
            <div className={'target-users'}>
                {activeConversation?.users?.filter(user => user?._id !== userData?._id).map(user => {
                    return (
                        <div key={user._id} className={'target-user'}>
                            {!!user?.profileImage?.filePath ?
                                <img className={'profile-image'} src={user.profileImage.filePath} alt={user.username}/>:
                                <FontAwesomeIcon icon={faCircleUser} style={{width: 20, height: 20}}/>
                            }
                            <p>{user.username}</p>
                        </div>
                    )
                })}
            </div>
            {/*{outGoingCall && <Beeping outGoingCall={outGoingCall} callAccepted={callAccepted}/>}*/}

        </Style>
    )
};
export default InitialMediaCall;