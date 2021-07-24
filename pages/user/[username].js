import React, {useContext, useState} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getUserPreviewData} from "../../_variables/_userSocialAjaxVariables";
import UserPageCoverImage from "../../components/includes/userPageComponents/UserPageCoverImage/UserPageCoverImage";
import UserPageActionButtons from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";

import SendMessagePopUp from "../../components/includes/userPageComponents/SendMessagePopUp/SendMessagePopUp";
import {AppContext} from "../../context/AppContext";

const user = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        messagePop:false

    });

    const onCloseMessagePop = () =>{
        setState({
            ...state,
            messagePop: false
        })
    }

    return (
        <div className='user-page main'>
            <style jsx>{`
                .user-page{
                 color:var(--main-text-color);
                }
              .main{
                max-width: 940px;
                margin: auto;
              }
            `}</style>
            <UserPageCoverImage
                coverImage={props?.userData?.coverImage}
                profileImage={props?.userData?.profileImage}
            />
            {
                contextData?.userData?.username !== props?.userData?.username ?
                    <UserPageActionButtons
                        setParentState={setState}
                        username = {props?.userData?.username}
                        parentState={state}
                        _id={props?.userData?._id}
                    />:null
            }

            <h3>{props?.userData?.username}</h3>
            {
                state.messagePop?
                    <SendMessagePopUp
                        receiverId={props?.userData?._id}
                        receiverProfileImage={props?.userData?.profileImage}
                        username={props?.userData?.username}
                        render={state.messagePop}
                        onCloseMessagePop={onCloseMessagePop}
                    />:null
            }

        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['userPageRightSidebar,userPageLeftSidebar', 'userPage'], 'userPage')
    const userPreviewData = await getUserPreviewData(firstLoadData.domainName, context.query.username)
    const userData = userPreviewData.data.userData
    const widgets = firstLoadData.widgets
    return {
        props: {
            widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query,
            userData: userData || null
        }
    }
}


export default user;
